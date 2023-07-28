import { useTranslation } from 'react-i18next';
import IconPublished from '../../../assets/Icons/IconPublished.png';
import styles from '../../../styles/Advertising/Payment/FormsPayment/FinishedForms/FinishedForms.module.css';

function FinishedFormsBoleto() {
  const { t } = useTranslation();
  return (
    <div className={styles.containerFinished}>
      <h2>
        {' '}
        {t('finishedForms-text-title-one')}
      </h2>
      <img src={IconPublished} alt="Imagem com um símbolo de cento dentro dele" />
      <p>
        {' '}
        {t('finishedForms-text-title-two')}
      </p>
    </div>
  );
}

export default FinishedFormsBoleto;
