import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import BackgroundAdvertising from '../../assets/BackgroundAdvertising.png';
import styles from '../../styles/Advertising/FirstAds/FirstAds.module.css';

function FirstAds() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <main className={styles.containerAdsMain}>
      <div className={styles.containerAdsContainer}>
        <div className={styles.containerAdsText}>
          <h1>{t("firts-ads-text")}</h1>
          <button onClick={() => navigate('new')} type="button">{t("firts-ads-button")}</button>
        </div>
        <div className={styles.containerAdsImg}>
          <img src={BackgroundAdvertising} alt="Imagem de uma garota mexendo no telefone" />
        </div>
      </div>
    </main>
  );
}

export default FirstAds;
