import { Checkbox } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import styles from "../../../../styles/RewardLearnAndEarn/SignUpPhases/PhaseFiveLAE/PhaseFiveLAE.module.css";
import IconClick from "../../../../assets/Icons/IconClick.svg";
import getSecureLocalStorage from "../../../../helpers/getSecureLocalStorage";

const interestsOne = [
  { id: 1, name: 'Pets' },
  { id: 2, name: 'Música' },
  { id: 3, name: 'Games' },
  { id: 4, name: 'Memes' },
  { id: 5, name: 'Saúde' },
  { id: 6, name: 'Terapia' },
];

const interestsTwo = [
  { id: 7, name: 'DIY' },
  { id: 8, name: 'Artes' },
  { id: 9, name: 'Design' },
  { id: 10, name: 'Cinema' },
  { id: 11, name: 'Humor' },
  { id: 12, name: 'Memes' },
];

const interestsThree = [
  { id: 13, name: 'Tecnologia' },
  { id: 14, name: 'Blockchain' },
  { id: 15, name: 'Finanças' },
  { id: 16, name: 'Web 3.0' },
  { id: 17, name: 'Cripto' },
  { id: 18, name: 'Bebidas' },
];

const interestsFour = [
  { id: 19, name: 'Fotografia' },
  { id: 20, name: 'Natureza' },
  { id: 21, name: 'Animais' },
  { id: 22, name: 'Esportes' },
  { id: 23, name: 'Fitness' },
  { id: 24, name: 'Beleza' },
];



function PhaseFiveLAE({ clickContinue }) {
  const [interests, setInterests] = useState([]);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

  const setInterestsCheckbox = ({ target }) => {
    const { name, checked } = target;
    if (!checked) return setInterests((preves) => preves.filter((interest) => interest !== name));
    return setInterests((preves) => ([...preves, name]));
  };

  const finalizeRegistration = async () => {
    if (interests.length >= 3) {
      const infoUser = await getSecureLocalStorage();
      await axios.put(`${baseUrl}/user/interests`, { interests }, {
        headers: { Authorization: `Bearer ${infoUser.accessToken}` },
      });
      return clickContinue();
    }
  };

  return (
    <section className={styles.sectionPhaseFive}>
      <article>
        <img src={IconClick} alt="Icone de click" />
        <p>
          <span>Escolha no mínimo 3 interesses</span>
          {' '}
          para finalizar seu cadastro na Soul.
        </p>
      </article>

      <div className={styles.containerMainInterests}>
        <h2>Quais são seus principais interesses?</h2>
        <div className={styles.containerInterests}>
          <div className={styles.containerSixInterests}>
            {interestsOne.map(({ name, id }) => (
              <div key={id}>
                <Checkbox
                  onChange={setInterestsCheckbox}
                  name={name}
                  sx={{
                    zIndex: 1,
                    color: '#BA02C9',
                    '&.Mui-checked': {
                      color: '#BA02C9',
                    },
                  }}
                />
                <p>{name}</p>
              </div>
            ))}
          </div>
          <div className={styles.containerSixInterests}>
            {interestsTwo.map(({ name, id }) => (
              <div key={id}>
                <Checkbox
                  onChange={setInterestsCheckbox}
                  name={name}
                  sx={{
                    zIndex: 1,
                    color: '#BA02C9',
                    '&.Mui-checked': {
                      color: '#BA02C9',
                    },
                  }}
                />
                <p>{name}</p>
              </div>
            ))}
          </div>
          <div className={styles.containerSixInterests}>
            {interestsThree.map(({ name, id }) => (
              <div key={id}>
                <Checkbox
                  onChange={setInterestsCheckbox}
                  name={name}
                  sx={{
                    zIndex: 1,
                    color: '#BA02C9',
                    '&.Mui-checked': {
                      color: '#BA02C9',
                    },
                  }}
                />
                <p>{name}</p>
              </div>
            ))}
          </div>
          <div className={styles.containerSixInterests}>
            {interestsFour.map(({ name, id }) => (
              <div key={id}>
                <Checkbox
                  onChange={setInterestsCheckbox}
                  sx={{
                    zIndex: 1,
                    color: '#BA02C9',
                    '&.Mui-checked': {
                      color: '#BA02C9',
                    },
                  }}
                />
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className={styles.containerButton}>
        <button disabled={interests.length < 3} id={styles.buttonContinue} onClick={finalizeRegistration} type="button">Finalizar cadastro</button>
      </div>
    </section>
  );
}

export default PhaseFiveLAE;
