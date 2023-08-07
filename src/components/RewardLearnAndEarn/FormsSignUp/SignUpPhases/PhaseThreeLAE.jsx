
import { useContext, useState } from "react";
import { Checkbox } from "@mui/material";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import styles from "../../../../styles/RewardLearnAndEarn/SignUpPhases/PhaseThreeLAE/PhaseThreeLAE.module.css";
import IconSparkle from "../../../../assets/Icons/IconSparkles.svg";
import EyeViewsWhite from "../../../../assets/EyeViewsWhite.svg";
import EyeViewsOff from "../../../../assets/EyeViewsOff.svg";
import AppContext from "../../../../Context/AppContext";
import axios from "../../../../interceptors/axiosConfig";
import { reverseDate } from "../../../../helpers/formatDate";
import sendGregCode from "../../../../helpers/apiGregCode";

function PhaseThreeLAE({ clickContinue, clickBack }) {
  const { t } = useTranslation();
  const { userSignUp, setUserSignUp } = useContext(AppContext);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisibleConfirmPassword, setIsPasswordVisibleConfirmPassword] = useState(false);
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorConfirmEmail, setErrorConfirmEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(null);
  const [checkBox, setCheckBox] = useState(false);
  const [disabledButon, setDisabledButon] = useState(false);

  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

  const setInfoUserInput = ({ target }) => {
    const { name, value } = target;
    if (name === "email") setErrorEmail(null);
    if (name === "password") setErrorPassword(null);
    setUserSignUp((preves) => ({ ...preves, [name]: value?.trim() }));
  };


  const nestPhase = async () => {
    const {
      email, password, age,
    } = userSignUp;
    const testValues = [email, password]
      .every((item) => item !== "" || item?.trim() !== "");
    if (!testValues) {
      if (email === "" || email?.trim() === "" || email.length < 3) setErrorEmail(true);
      if (password === "" || password?.trim() === "" || password.length <= 3) setErrorPassword(true);
      if (email !== confirmEmail || confirmEmail?.trim() === "") setErrorConfirmEmail(true);
      if (password !== confirmPassword || confirmPassword?.trim() === "") setErrorConfirmPassword(true);
      return;
    }

    if (checkBox) {
      try {
        setDisabledButon(true);
        await axios.post(`${baseUrl}/user/create`, { ...userSignUp, age: reverseDate(age) });
      } catch (error) {
        setDisabledButon(false);
        return Swal.fire({
          icon: 'error',
          title: t(error?.response?.data?.error || "Essa não! Um error interno aconteceu! Teve novamente mais tarde!"),
        });
      }
      await sendGregCode(userSignUp.email);
      setDisabledButon(true);
      return clickContinue();
    }
  };

  return (
    <section className={styles.sectionPhaseThree}>
      <article>
        <img src={IconSparkle} alt="Icone de brilhos" />
        <p>
          <span>Cliente Mercado Bitcoin</span>
          , use seu e-mail cadastrado no MB para criar sua conta na rede social da SoulPrime.
        </p>
      </article>
      <div className={styles.containerMainInputs}>
        <div className={styles.containerInputs}>
          <h4>Qual é o seu e-mail?</h4>
          <div className={styles.containerInputsEmail}>
            <input
              className={errorEmail ? styles.inputError : null}
              onChange={setInfoUserInput}
              value={userSignUp.email}
              type="email"
              name="email"
              required
              placeholder="E-mail"
            />
            <input
              className={errorConfirmEmail ? styles.inputError : null}
              onChange={({ target }) => { setConfirmEmail(target.value); setErrorConfirmEmail(null); }}
              value={confirmEmail}
              type="email"
              required
              placeholder="Repetir e-mail"
            />
          </div>
        </div>
        <div className={styles.containerInputs}>
          <h4>Crie sua senha</h4>
          <div className={styles.containerInputsPassword}>
            <div className={styles.containerInput} id={errorPassword ? styles.inputPaswordError : null}>
              <input
                onChange={setInfoUserInput}
                value={userSignUp.password}
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Insira sua senha"
              />
              <div className={styles.containerButtonPassword}>
                <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                  <img src={isPasswordVisible ? EyeViewsWhite : EyeViewsOff} alt="Imagem de um olho para visualizar a senha." />
                </button>
              </div>
            </div>
            <div className={styles.containerInput} id={errorConfirmPassword ? styles.inputConfirmPaswordError : null}>
              <input
                value={confirmPassword}
                onChange={({ target }) => { setErrorConfirmPassword(null); setConfirmPassword(target.value); }}
                type={isPasswordVisibleConfirmPassword ? "text" : "password"}
                placeholder="Insira sua senha"
              />
              <div className={styles.containerButtonPassword}>
                <button type="button" onClick={() => setIsPasswordVisibleConfirmPassword(!isPasswordVisibleConfirmPassword)}>
                  <img src={isPasswordVisibleConfirmPassword ? EyeViewsWhite : EyeViewsOff} alt="Imagem de um olho para visualizar a senha." />
                </button>
              </div>
            </div>
          </div>
          <div className={styles.containerCheckbox}>
            <Checkbox
              onChange={({ target }) => setCheckBox(target.checked)}
              checked={checkBox}
              sx={{
                zIndex: 1,
                color: '#BA02C9',
                '&.Mui-checked': {
                  color: '#BA02C9',
                },
              }}
            />
            <p>
              Ao selecionar a caixa você concorda com nossos
              {' '}
              <span>Termos, Condições e Política de Privacidade.</span>
              {' '}
              <small>(Você deve concordar com os termos e condições para continuar)</small>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.containerButton}>
        <button id={styles.buttonBack} onClick={clickBack} type="button">Voltar</button>
        <button
          disabled={!checkBox || disabledButon}
          id={styles.buttonContinue}
          onClick={nestPhase}
          type="button"
        >
          Continuar
        </button>
      </div>
    </section>
  );
}

export default PhaseThreeLAE;
