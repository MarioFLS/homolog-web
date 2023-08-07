import ReactInputMask from "react-input-mask";
import { useContext, useState } from "react";
import styles from "../../../../styles/RewardLearnAndEarn/SignUpPhases/PhaseOneLAE/PhaseOneLAE.module.css";
import AppContext from "../../../../Context/AppContext";

function PhaseOneLAE({ clickContinue }) {
  const { userSignUp, setUserSignUp } = useContext(AppContext);
  const [errorName, setErrorName] = useState(null);
  const [errorUser, setErrorUser] = useState(null);
  const [errorTel, setErrorTel] = useState(null);
  const [errorDate, setErrorDate] = useState(null);

  const setInfoUserInput = ({ target }) => {
    const { name, value } = target;
    if (name === "nickname") setErrorUser(null);
    if (name === "username") setErrorName(null);
    if (name === "age") setErrorDate(null);
    setUserSignUp((preves) => ({ ...preves, [name]: value }));
  };

  const setInfoUserInputMsk = ({ target }) => {
    const { name, value } = target;
    if (name === "telephone") setErrorTel(null);
    setUserSignUp((preves) => ({ ...preves, [name]: value }));
  };

  const nestPhase = () => {
    const {
      username, nickname, telephone, age,
    } = userSignUp;
    const testValues = [username, nickname, telephone, age]
      .every((item) => item !== "" || item?.trim() !== "" || item?.trim()?.replace(/\D/g, "") !== "");
    if (!testValues) {
      if (username === "" || username?.trim() === "" || username.length >= 3) setErrorName(true);
      if (nickname === "" || nickname?.trim() === "" || nickname.length >= 3) setErrorUser(true);
      if (telephone === "" || telephone?.trim() === "" || telephone?.trim()?.replace(/\D/g, "") === "") setErrorTel(true);
      if (age === "" || age?.trim() === "" || age?.trim()?.replace(/\D/g, "") === "") setErrorDate(true);
      return;
    }
    return clickContinue();
  };


  return (
    <section className={styles.sectionPhaseOne}>
      <div>
        <label htmlFor="phase-one-name-lae" id={errorName ? styles.labelError : null}>
          <p>Qual é o seu nome?</p>
          <input
            onChange={setInfoUserInput}
            type="text"
            id="phase-one-name-lae"
            name="username"
            placeholder="Nome completo"
            value={userSignUp.username}
          />
        </label>
        <label htmlFor="phase-one-user-lae" id={errorUser ? styles.labelError : null}>
          <p>Qual é o seu nome de usuário?</p>
          <input
            value={userSignUp.nickname}
            onChange={setInfoUserInput}
            type="text"
            id="phase-one-user-lae"
            name="nickname"
            placeholder="Nome de usuário"
          />
        </label>
      </div>
      <div>
        <label htmlFor="phase-one-tel-lae" id={errorTel ? styles.labelError : null}>
          <p>Qual é o seu telefone?</p>
          <ReactInputMask
            value={userSignUp.telephone}
            onChange={setInfoUserInputMsk}
            id="phase-one-tel-lae"
            mask="+99 (99) 99999-9999"
            maskChar=""
            name="telephone"
            placeholder="+55 (00) 00000-0000"
          />
        </label>
        <label htmlFor="phase-one-date-lae" id={errorDate ? styles.labelError : null}>
          <p>Qual é a sua data de nascimento?</p>
          <ReactInputMask
            value={userSignUp.age}
            onChange={setInfoUserInput}
            mask="99/99/9999"
            maskChar=""
            name="age"
            id="phase-one-date-lae"
            placeholder="00/00/0000"
          />
        </label>
      </div>
      <div className={styles.containerButton}>
        <button onClick={nestPhase} type="button">Continuar</button>
      </div>
    </section>
  );
}

export default PhaseOneLAE;
