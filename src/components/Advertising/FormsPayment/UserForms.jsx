/* eslint-disable react/prop-types */

import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from '../../../Context/AppContext';
import styles from '../../../styles/Advertising/Payment/FormsPayment/UserForms/UserForms.module.css';

function UserForms({ nextForm }) {
  const { t } = useTranslation();
  const { userForms, setUserForms } = useContext(AppContext);
  return (
    <form className={styles.containerForm}>
      <div className={styles.containerInputs}>
        <label htmlFor="name">
          <span>
            {' '}
            {t('userForms-label-name')}
          </span>
          <input type="text" id="name" placeholder={t('userForms-label-name')} />
        </label>
        <label htmlFor="email">
          <span>
            {' '}
            {t('userForms-label-email')}
          </span>
          <input
            type="email"
            id="email"
            value={userForms.email}
            onChange={(({ target }) => setUserForms({ ...userForms, email: target.value }))}
            placeholder={t('userForms-label-email')}
          />
        </label>
        <label htmlFor="cpf">
          <span>
            {' '}
            {t('userForms-label-cpf')}
          </span>
          <input
            type="text"
            id="cpf"
            value={userForms.cpf}
            onChange={(({ target }) => setUserForms({ ...userForms, cpf: target.value }))}
            placeholder={t('userForms-label-cpf')}
          />
        </label>
      </div>
      <button
        className={styles.btnNext}
        onClick={nextForm}
        type="button"
      >
        {t('button-continue')}
      </button>
    </form>
  );
}

export default UserForms;
