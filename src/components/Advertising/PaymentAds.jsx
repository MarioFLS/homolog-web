/* eslint-disable no-nested-ternary */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import ChevronLeft from '../../assets/ChevronLeft.svg';
import styles from '../../styles/Advertising/Payment/PaymentAds.module.css';
import BaseForms from './FormsPayment/BaseForms';
import UserForms from './FormsPayment/UserForms';
// import PixForms from './FormsPayment/PixForms';
import FinishedForms from './FormsPayment/FinishedForms';
import CreditCardForms from './FormsPayment/CreditCardForms';
import UploadPayment from './UploadPayment';
import BoletoForms from './FormsPayment/BoletoForms';
import PayBoletoForms from './FormsPayment/PayBoletoForms';
import FinishedFormsBoleto from './FormsPayment/FinishedFormsBoleto';

function PaymentAds() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [typePayment, setTypePayment] = useState('boleto');
  const [statePayment, setStatePayment] = useState(1);
  const [formsPayment, setFormsPayment] = useState(<UserForms />);

  const nextForm = () => {
    if (statePayment === 3 && typePayment === 'boleto') return navigate(`/published/${typePayment}`);
    if (statePayment === 2 && typePayment === 'boleto') return setStatePayment(statePayment + 1);
    if (statePayment !== 2) return setStatePayment(statePayment + 1);
    return navigate(`/published/${typePayment}`);
  };

  useEffect(() => {
    /* if (statePayment === 2) {
      return setFormsPayment(<UserForms nextForm={nextForm} />);
    } */
    if (statePayment === 2) {
      if (typePayment === 'boleto') {
        return setFormsPayment(<BoletoForms nextForm={nextForm} setStatePayment={setStatePayment} />);
      }
      return setFormsPayment(<CreditCardForms nextForm={nextForm} setStatePayment={setStatePayment} />);
    }
    if (statePayment === 3) {
      return setFormsPayment(<PayBoletoForms nextForm={nextForm} />);
    }
    if (statePayment === 4 && typePayment !== 'boleto') {
      return setFormsPayment(<FinishedForms />);
    }
    return setFormsPayment(<FinishedFormsBoleto />);
  }, [statePayment]);

  return (
    <section className={styles.sectionPayment}>
      <UploadPayment />
      <div className={styles.containerPayment}>

        <div className={styles.containerText}>
          {statePayment === 1 ? <h1>{t('paymentAds-forms-title')}</h1>
            : statePayment !== 4 ? (
              <button type="button" onClick={() => setStatePayment(statePayment - 1)}>
                <img src={ChevronLeft} alt="Icone de uma Seta apontando para esquerda" />
              </button>
            )
              : <div style={{ display: 'block' }} />}
          <span>
            {t('paymentAds-modal-step')}
            {' '}
            {statePayment}
            {' '}
            {t('paymentAds-modal-of')}
            {' '}
            {typePayment === 'boleto' ? 3 : 2}
          </span>
        </div>

        <div className={styles.formsPaymente}>
          {statePayment === 1 ? (
            <BaseForms props={{
              typePayment,
              setTypePayment,
              nextForm,
            }}
            />
          ) : formsPayment}
        </div>
        {/*  <button className={styles.btnNext} onClick={handleOpen} type="button">{t('button-continue')}</button> */}
      </div>

      {/* <ModalAds handleClose={handleClose} open={open} /> */}
    </section>
  );
}

export default PaymentAds;
