import { useTranslation } from 'react-i18next';
import SectionOne from '../components/Home/SectionOne';
import Footer from '../components/LandingPage/Footer';
import styles from '../styles/Home/HomeMain.module.css';
import RocketLaunch from '../assets/RocketLaunch.svg';
import Sections from '../components/Home/Sections';

function Home() {
  const { t } = useTranslation();
  return (
    <div className={styles.containerMainLP}>
      <main className={styles.main}>
        <div className={styles.container}>
          <SectionOne />
        </div>
        <section className={styles.sectionBusiness}>
          <article className={styles.sectionBusinessImage}>
            <p>
              {' '}
              <img src={RocketLaunch} alt="Icone de Foguete" />
              {' '}
              {t('article-business')}
            </p>
            <p>
              {' '}
              <img src={RocketLaunch} alt="Icone de Foguete" />
              {' '}
              {t('article-business')}
            </p>
            <p>
              {' '}
              <img src={RocketLaunch} alt="Icone de Foguete" />
              {t('article-business')}
            </p>
            <p>
              {' '}
              <img src={RocketLaunch} alt="Icone de Foguete" />
              {t('article-business')}
            </p>
          </article>
        </section>
        <div className={styles.container}>
          <Sections />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
