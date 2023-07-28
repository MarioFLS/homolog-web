import { useTranslation } from 'react-i18next';
import Mockup02 from '../../assets/Mockup02.png';
import Megaphone from '../../assets/Megaphone.svg';
import styles from '../../styles/LandingPage/SectionTwo/SectionTwo.module.css';

function SectionTwo() {
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContainerImg}>
          <img src={Mockup02} alt="Imagem de  um smartphone mostrando em sua tela o MarketPlace da Soulprime" />
        </div>
        <div className={styles.sectionContainerText}>
          <div>
            <h1>Marketplace</h1>
            <div style={{ width: '154px' }} className={styles.bordText} />
          </div>
          <h2>{t('marketplace-h2')}</h2>
          <p>{t('marketplace-p')}</p>
        </div>
        <div className={styles.sectionImg}>
          <img src={Megaphone} alt="Imagem de um Megaphone flutando na tela." />
        </div>
      </div>
    </section>
  );
}

export default SectionTwo;
