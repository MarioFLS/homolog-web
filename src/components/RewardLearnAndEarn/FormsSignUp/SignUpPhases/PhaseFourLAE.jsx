import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import axios from "axios";
import styles from "../../../../styles/RewardLearnAndEarn/SignUpPhases/PhaseFourLAE/PhaseFourLAE.module.css";
import IconMailShare from "../../../../assets/Icons/IconMailShare.svg";
import CodeOtp from "../../../Code/CodeOtp";
import AppContext from "../../../../Context/AppContext";
import loginMainUser from "../../../../helpers/loginMainUser";
import sendGregCode, { getGregAddress } from "../../../../helpers/apiGregCode";
import getSecureLocalStorage from "../../../../helpers/getSecureLocalStorage";

function PhaseFourLAE({ clickContinue }) {
  const { t } = useTranslation();
  const { userSignUp, setGlobalInfoUser } = useContext(AppContext);
  const [values, setValues] = useState(Array(6).fill(''));
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

  const loginUser = async () => {
    const dataLogin = await loginMainUser(userSignUp.email, userSignUp.password);
    const infoUser = await getSecureLocalStorage();
    await axios.put(`${baseUrl}/user/update`, { content_creator: userSignUp.content_creator }, {
      headers: { Authorization: `Bearer ${infoUser.accessToken}` },
    });
    setGlobalInfoUser(dataLogin);
  };

  useEffect(() => {
    (async () => loginUser())();
  }, []);

  const sendCode = async () => {
    try {
      const infoUser = await getSecureLocalStorage();
      await getGregAddress(values.join(""), userSignUp.email, infoUser, setGlobalInfoUser);
      clickContinue();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error || "Essa não! Um error interno aconteceu! Teve novamente mais tarde!"),
      });
    }
  };

  return (
    <section className={styles.sectionPhaseFour}>
      <article>
        <img src={IconMailShare} alt="Icone de brilhos" />
        <p>
          <span>Verifique sua caixa de e-mail.</span>
          {' '}
          Enviamos o código para validar seu cadastro.
          Se não recebeu, clique em
          {' '}
          <button onClick={async () => sendGregCode(userSignUp.email)} type="button">reenviar</button>
        </p>
      </article>

      <div id={styles.containerCode}>
        <h4>Insira o código enviado por e-mail</h4>
        <CodeOtp styles={styles} values={values} setValues={setValues} />
      </div>

      <div className={styles.containerButton}>
        <button id={styles.buttonContinue} onClick={sendCode} type="button">Continuar</button>
      </div>
    </section>
  );
}

export default PhaseFourLAE;
