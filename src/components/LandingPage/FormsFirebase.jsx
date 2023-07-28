/* eslint-disable camelcase */
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import swal from 'sweetalert';
import SoulReady from '../../assets/SoulReady.png';
import Iframe from '../../Iframe';
// import { waitlist } from '../../config/firebase-config';
import ReadyPlayerMe from '../../assets/ReadyPlayerMe.png';
import styles from '../../styles/LandingPage/FormsFirebase/FormsFirebase.module.css';

function FormsFirebase() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  /* const [values, setValues] = useState({ valueOne: 0, valueTwo: 0 });
  const [isDisabled, setDisabled] = useState(true); */
  // const [checkBoxOption, setCheckBoxOption] = useState(false);

  /*   const sumValuesInput = ({ target }) => {
    const value = Number(target.value);
    const disables = value !== values.valueOne + values.valueTwo;
    setDisabled(disables);
  }; */

  let influencer_id = new URLSearchParams(window.location.search).get(
    'influencer_id',
  );

  if (influencer_id) {
    localStorage.setItem('influencer_id', influencer_id);
  } else {
    influencer_id = localStorage.getItem('influencer_id');
  }

  /*  function handleFormSubmit(event) {
    event.preventDefault();
    const nomeField = document.querySelector('#nome').value;
    const emailField = document.querySelector('#mail').value;
    const whatsappField = document.querySelector('#whatsapp').value;
    const avatarField = window.localStorage.getItem('avatar_id');

    if (!nomeField || !emailField || !whatsappField) {
      swal(t('fields emptys alert'), t('all fields alert'), 'error');
      return;
    }

    if (checkBoxOption !== true) {
      swal('Check It', t('checkit text alert'), 'error');
      return;
    }

    waitlist
      .add({
        username: nomeField,
        email: emailField,
        whatsapp: whatsappField,
        avatar: avatarField,
        influencer_id,
      })
      .then(() => {
        swal(t('congrats'), t('success text alert'), 'success').then(() => {
          document.querySelector('#nome').value = '';
          document.querySelector('#mail').value = '';
          document.querySelector('#whatsapp').value = '';
          setCheckBoxOption(false);
        });
      });
  }

  useEffect(() => {
    const valueOne = Math.floor((Math.random() * 10) + 1);
    const valueTwo = Math.floor((Math.random() * 10) + 1);
    setValues({ valueOne, valueTwo });
  }, []); */

  return (
    <section className={styles.sectionRPM} id="firebaseform">
      <div className={styles.sectionContainer}>
        <section className={styles.containerRPM}>
          <div id="voce-no-metaverso">
            <div className={styles.containerRPMText}>
              <h2>{t('metaverso-create')}</h2>
              <p>{t('ready-player-me')}</p>
            </div>
            <div className={styles.containerRPMImg}>
              <img src={SoulReady} alt="Logo da SoulPrime e da Ready Player Me" />
              <img src={ReadyPlayerMe} alt="Foto de Avatares da Ready Player Me" />
            </div>
          </div>
          <button id="voce-no-metaversoBtn" onClick={setShowModal} type="button">{t('avatar-button')}</button>

          <div id="readyplayerme_avatar_preview" />
          {showModal ? (
            <div id="readyplayerme-modal-container">
              <Iframe
                source="https://soulprime.readyplayer.me/avatar?frameApi"
                setShowModal={setShowModal}
              />
            </div>
          ) : (
            ''
          )}
        </section>
        {/* <section className={styles.sectionForms}>
          <form onSubmit={handleFormSubmit}>
            <h2>{t('subscribe-waitlist')}</h2>
            <div className={styles.sectionFormsInput}>
              <input id="nome" type="name" placeholder={t('name-placeholder')} />
              <input id="mail" type="email" placeholder={t('mail-placeholder')} />
              <input
                id="whatsapp"
                type="number"
                placeholder={t('wpp-placeholder')}
              />
              <input
                type="number"
                onChange={sumValuesInput}
                id="input-validity"
                placeholder={`${values.valueOne}+${values.valueTwo}=?`}
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="checkit"
                  onChange={(e) => setCheckBoxOption(e.target.checked)}
                  checked={checkBoxOption}
                />
                <label htmlFor="checkit">
                  {t('checkbox-label')}
                </label>
              </div>

            </div>
            <button disabled={isDisabled} type="submit">{t('main-button')}</button>
          </form>
        </section> */}
      </div>
    </section>
  );
}

export default FormsFirebase;
