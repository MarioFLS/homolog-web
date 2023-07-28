import copy from 'copy-to-clipboard';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../../styles/Advertising/Payment/FormsPayment/PixForms/PixForms.module.css';
import IconCopy from '../../../assets/Icons/IconCopy.svg';

function PixForms() {
  const { t } = useTranslation();
  const [code] = useState('853615030407645510416869066365');

  const copyCode = () => {
    copy(code);
  };
  return (
    <form className={styles.containerForms}>
      <p>{t('pixForms-text-paragraph-one')}</p>
      <div className={styles.containerPix} />
      <p>{t('pixForms-text-paragraph-two')}</p>
      <div className={styles.containerInput}>
        <input type="text" readOnly value={code} />
        <button type="button" onClick={copyCode}><img src={IconCopy} alt="Icone de Copiar" /></button>

      </div>
    </form>
  );
}

export default PixForms;
