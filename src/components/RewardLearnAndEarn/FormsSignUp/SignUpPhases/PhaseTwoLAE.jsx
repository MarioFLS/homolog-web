
import { FormControl, Radio, RadioGroup } from "@mui/material";
import { useContext } from "react";
import styles from "../../../../styles/RewardLearnAndEarn/SignUpPhases/PhaseTwoLAE/PhaseTwoLAE.module.css";
import AppContext from "../../../../Context/AppContext";

function PhaseTwoLAE({ clickContinue, clickBack }) {
  const { userSignUp, setUserSignUp } = useContext(AppContext);
  const { gender } = userSignUp;
  const setInfoUserInput = ({ target }) => {
    const { value } = target;
    setUserSignUp((preves) => ({ ...preves, gender: value }));
  };

  return (
    <section className={styles.sectionPhaseTwo}>
      <div className={styles.containerMain}>
        <FormControl>
          <p>Qual é o seu gênero?</p>
          <RadioGroup
            name="radio-buttons-group-gender"
            className={styles.radioGroup}
          >
            <label htmlFor="radio-female-phase-two">
              <Radio
                onChange={setInfoUserInput}
                value={1}
                checked={gender === "1"}
                sx={{
                  color: '#BA02CA',
                  '&.Mui-checked': {
                    color: '#BA02CA',
                  },
                }}
                id="radio-female-phase-two"
              />
              <p>Feminino</p>
            </label>

            <label htmlFor="radio-male-phase-two">
              <Radio
                onChange={setInfoUserInput}
                value={2}
                checked={gender === "2"}
                sx={{
                  color: '#BA02CA',
                  '&.Mui-checked': {
                    color: '#BA02CA',
                  },
                }}
                id="radio-male-phase-two"
              />
              <p>Masculino</p>
            </label>
            <label htmlFor="radio-male-null-two">
              <Radio
                onChange={setInfoUserInput}
                value={3}
                checked={gender === "3"}
                sx={{
                  color: '#BA02CA',
                  '&.Mui-checked': {
                    color: '#BA02CA',
                  },
                }}
                id="radio-male-null-two"
              />
              <p>Prefiro não dizer</p>
            </label>
            <label htmlFor="radio-male-other-two">
              <Radio
                onChange={setInfoUserInput}
                value={4}
                checked={gender === "4"}
                sx={{
                  color: '#BA02CA',
                  '&.Mui-checked': {
                    color: '#BA02CA',
                  },
                }}
                id="radio-male-other-two"
              />
              <p>Outro</p>
            </label>

          </RadioGroup>
        </FormControl>
        <div>
          <p>Você é criador de conteúdo?</p>
          <RadioGroup
            name="radio-buttons-group-content-creator"
            className={styles.radioGroup}
          >
            <label htmlFor="radio-yes-other-two">
              <Radio
                checked={userSignUp.content_creator}
                sx={{
                  color: '#BA02CA',
                  '&.Mui-checked': {
                    color: '#BA02CA',
                  },
                }}
                onChange={() => setUserSignUp((preves) => ({ ...preves, content_creator: true }))}
                id="adio-yes-other-two"
              />
              <p>Sim</p>
            </label>
            <label htmlFor="radio-false-other-two">
              <Radio
                checked={!userSignUp.content_creator}
                sx={{
                  color: '#BA02CA',
                  '&.Mui-checked': {
                    color: '#BA02CA',
                  },
                }}
                id="radio-false-other-two"
                onChange={() => setUserSignUp((preves) => ({ ...preves, content_creator: false }))}
              />
              <p>Não</p>
            </label>
          </RadioGroup>
        </div>
      </div>

      <div className={styles.containerButton}>
        <button id={styles.buttonBack} onClick={clickBack} type="button">Voltar</button>
        <button id={styles.buttonContinue} onClick={clickContinue} type="button">Continuar</button>
      </div>
    </section>
  );
}

export default PhaseTwoLAE;
