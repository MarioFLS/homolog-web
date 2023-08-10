import { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import styles from "../../../styles/RewardLearnAndEarn/LoginRewardLearnAndEarn/LoginRewardLearnAndEarn.module.css";
import InputLoginLearnAndEarn from "./InputLoginLearnAndEarn";
import IconMailExclamation from "../../../assets/Icons/IconMailExclamation.svg";
import IconMailShare from "../../../assets/Icons/IconMailShare.svg";
import CodeLoginLearnAndEarn from "./CodeLoginLearnAndEarn";
import axios from "../../../interceptors/axiosConfig";


function SectionLoginLearnAndEarn() {
  const [checkEmail, setCheckEmail] = useState(false);
  const [page, setPage] = useState(1);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

  const resendEmail = async () => {
    const infoUser = secureLocalStorage.getItem('user_information_session');
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    await axios.post(`${baseUrl}/user/check_email_nft`, { email: infoUser?.emailNft ? infoUser?.emailNft : infoUser.email }, { headers });
  };

  return (
    <section>
      <div className={styles.containerMainWarning}>
        { page === 1
          ? !checkEmail && (
          <div className={styles.containerWarning}>
            <img src={IconMailExclamation} alt="Icone de Email com uma exclamação." />
            <div>
              <p><span>Participou do Aprenda e Ganhe com um e-mail diferente do cadastrado na Soul?</span></p>
              <p>
                Se você usou um e-mail diferente no Aprenda e Ganhe, selecione a caixa abaixo para validar o e-mail utilizado no MB.
              </p>
            </div>
          </div>
          )

          : (
            <div className={styles.containerWarning}>
              <img src={IconMailShare} alt="Icone de Email com uma exclamação." />
              <div>
                <p>
                  <span>Verifique seu e-mail cadastrado do Mercado Bitcoin. </span>
                  Enviamos o código para validar seu cadastro. Se não recebeu, clique em
                  {' '}
                  <button onClick={resendEmail} type="button">reenviar</button>
                </p>
              </div>
            </div>
          )}
      </div>
      {page === 1 ? <InputLoginLearnAndEarn setPage={setPage} checkEmail={checkEmail} setCheckEmail={setCheckEmail} /> : <CodeLoginLearnAndEarn />}
    </section>
  );
}

export default SectionLoginLearnAndEarn;
