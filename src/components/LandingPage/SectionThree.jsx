import { useTranslation } from 'react-i18next';
import MockupMomentsAds from '../../assets/MockupMomentsAds.png';
import styles from '../../styles/LandingPage/SectionThree/SectionThree.module.css';
import Quizzes from '../../assets/Quizzes.svg';

function SectionThree() {
  const { t } = useTranslation();
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContainerText}>
          <div>
            <h1>Moments Ads</h1>
            <div style={{ width: '174px' }} className={styles.bordText} />
          </div>
          <h2>{t('moments-h2')}</h2>
          <p>{t('moments-p')}</p>
        </div>
        <div className={styles.sectionContainerImg}>
          <img src={MockupMomentsAds} alt="Imagem de  um smartphone mostrando o aplicativo da Soulprime" />
        </div>
        <div className={styles.sectionImg}>
          <img src={Quizzes} alt="Imagem de um Trofeu flutando na tela." />
        </div>
      </div>
    </section>
  );
}

export default SectionThree;
