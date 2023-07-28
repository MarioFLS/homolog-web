import { useTranslation } from 'react-i18next';
import Mockup04 from '../../assets/Mockup04.png';
import Wallet from '../../assets/WalletToken.svg';
import styles from '../../styles/LandingPage/SectionFour/SectionFour.module.css';

function SectionFour() {
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContainerImg}>
          <img src={Mockup04} alt="Imagem de  um smartphone mostrando em sua tela da carteira da Soulprime" />
        </div>
        <div className={styles.sectionContainerText}>
          <div>
            <h1>Wallet</h1>
            <div style={{ width: '80px' }} className={styles.bordText} />
          </div>
          <h2>{t('digital-wallet')}</h2>
          <p>{t('connect-digital-wallet')}</p>
        </div>
        <div className={styles.sectionImg}>
          <img src={Wallet} alt="Imagem de uma carteira flutando na tela." />
        </div>
      </div>
    </section>
  );
}

export default SectionFour;
