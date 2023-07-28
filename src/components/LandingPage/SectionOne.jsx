import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import { Helmet } from 'react-helmet';
import MockupHero from '../../assets/MockupHeroLeve.png';
import styles from '../../styles/LandingPage/SectionOne/SectionOne.module.css';
import ModalWaitlist from '../Modals/ModalWaitlist';
import PlayStore from '../../assets/PlaystoreButton.png';
import TestFlightButton from '../../assets/png-transparent-app-store-apple-logo-apple-text-logo-video-game.png';

function SectionOne() {
  const { t } = useTranslation();
  const [openList, setOpenList] = useState(false);
  // const navigate = useNavigate();
  useEffect(() => {
    <HelmetProvider>
      <Helmet>
        <link rel="preload" as="image" href={MockupHero} />
      </Helmet>
    </HelmetProvider>;
  }, []);
  return (
    <>
      <div id="home" />
      <br />
      <section className={styles.section}>
        <div className={styles.containerMainText}>
          <div className={styles.containerText}>
            <h1 className={styles.titleH1}>
              {t("main-title")}
              {' '}
              <span className={styles.titleH1Span}>
                {' '}
                {t("main-title-span")}
              </span>
            </h1>
            <p>
              <span>{t("main-description-span")}</span>
              {' '}
              {t("main-description")}
              {' '}
            </p>
          </div>
          <div className={styles.containerButton}>
            {/*   <button
              className={styles.buttonRegister}
              onClick={() => setOpenList(true)}
              type="button"
            >
              {t("main-button-signUp")}
            </button>
            <button
              className={styles.buttonAdvertiser}
              type="button"
            >
              <a href="https://linktr.ee/SoulPrime_io" target="_blank" rel="noreferrer">Download App</a>
            </button> */}
            <a
              className={styles.buttonPlayStore}
              href="https://play.google.com/store/apps/details?id=com.soulprime.app"
              target="_blank"
              rel="noreferrer"
            >
              <img src={PlayStore} alt="Icone da PlayStore" />
            </a>
            <a
              href="https://apps.apple.com/br/app/soul-prime/id1634272325?l=pt"
              target="_blank"
              className={styles.buttonPlayStore}
              rel="noreferrer"
            >
              <img src={TestFlightButton} alt="Icone do TestFlight" />
            </a>
            {/* <button type="button" className={styles.buttonRegister}>
              <img src={PlayStore} alt="" />
            </button> */}
          </div>
        </div>
        <div className={styles.sectionImg}>
          <img src={MockupHero} loading="lazy" alt="Imagem de Smartphones mostrando em sua tela a rede social SoulPrime" />
        </div>
        <div className={styles.containerButtonMobile}>
          {/*  <button
            className={styles.buttonRegister}
            onClick={() => setOpenList(true)}
            type="button"
          >
            {t("main-button-signUp")}
          </button>
          <button
            className={styles.buttonAdvertiser}
            type="button"
          >
            <a href="https://linktr.ee/SoulPrime_io" target="_blank" rel="noreferrer">Download App</a>
          </button> */}
          <a
            className={styles.buttonPlayStore}
            href="https://play.google.com/store/apps/details?id=com.soulprime.app"
            target="_blank"
            rel="noreferrer"
          >
            <img src={PlayStore} alt="Icone da PlayStore" />
          </a>
          <a href="https://apps.apple.com/br/app/soul-prime/id1634272325?l=pt" target="_blank" className={styles.buttonPlayStore} rel="noreferrer">
            <img src={TestFlightButton} alt="Icone do TestFlight" />
          </a>
        </div>
      </section>
      <ModalWaitlist openList={openList} setOpenList={setOpenList} />
    </>
  );
}

export default SectionOne;
