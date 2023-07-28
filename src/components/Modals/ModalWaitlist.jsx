import { Checkbox, Modal } from "@mui/material";
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import swal from 'sweetalert';
import { waitlist } from '../../config/firebase-config';
import styles from "../../styles/Modals/ModalWaitlist/ModalWaitlist.module.css";
import IconX from "../../assets/Icons/IconX.svg";

function ModalWaitlist({ openList, setOpenList }) {
  const handleClose = () => setOpenList(false);

  const { t } = useTranslation();
  const [checkBoxOption, setCheckBoxOption] = useState(false);
  const [values, setValues] = useState({ valueOne: 0, valueTwo: 0 });
  const [isDisabled, setDisabled] = useState(true);

  const sumValuesInput = ({ target }) => {
    const value = Number(target.value);
    const disables = value !== values.valueOne + values.valueTwo;
    setDisabled(disables);
  };
  let influencer_id = new URLSearchParams(window.location.search).get(
    'influencer_id',
  );

  if (influencer_id) {
    localStorage.setItem('influencer_id', influencer_id);
  } else {
    influencer_id = localStorage.getItem('influencer_id');
  }
  const handleFormSubmit = (event) => {
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
    handleClose();
  };

  useEffect(() => {
    const valueOne = Math.floor((Math.random() * 10) + 1);
    const valueTwo = Math.floor((Math.random() * 10) + 1);
    setValues({ valueOne, valueTwo });
  }, []);
  return (
    <Modal
      open={openList}
      onClose={handleClose}
    >
      <div className={styles.containerMainFormsFirebase}>
        <div className={styles.buttonCloseModal}>
          <button type="button" onClick={handleClose}><img src={IconX} alt="Icone de um X" /></button>
        </div>
        <section className={styles.sectionForms}>
          <form onSubmit={handleFormSubmit}>
            <h2>{t('subscribe-waitlist')}</h2>
            <div className={styles.sectionFormsInput}>
              <input className={styles.inputsForms} id="nome" type="name" placeholder={t('name-placeholder')} />
              <input className={styles.inputsForms} id="mail" type="email" placeholder={t('mail-placeholder')} />
              <input
                className={styles.inputsForms}
                id="whatsapp"
                type="number"
                placeholder={t('wpp-placeholder')}
              />
              <input
                className={styles.inputsForms}
                type="number"
                onChange={sumValuesInput}
                id="input-validity"
                placeholder={`${values.valueOne}+${values.valueTwo}=?`}
              />
              <div className={styles.checkbox}>
                <Checkbox
                  sx={{
                    zIndex: 1,
                    color: '#BA02C9',
                    '&.Mui-checked': {
                      color: '#BA02C9',
                    },
                  }}
                  type="checkbox"
                  id="checkit"
                  onChange={(e) => setCheckBoxOption(e.target.checked)}
                  checked={checkBoxOption}
                />
                {/* <input
                  type="checkbox"
                  id="checkit"
                  onChange={(e) => setCheckBoxOption(e.target.checked)}
                  checked={checkBoxOption}
                /> */}
                <label htmlFor="checkit">
                  {t('checkbox-label')}
                </label>
              </div>

            </div>
            <button disabled={isDisabled} type="submit">{t("button-access-model")}</button>
          </form>
        </section>
      </div>
    </Modal>
  );
}

export default ModalWaitlist;
