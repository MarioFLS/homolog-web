import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import HeaderLP from '../components/Headers/HeaderLP';
import FooterHome from '../components/Home/FooterHome';
import styles from '../styles/NotFound/NotFound.module.css';

function PageNotFound() {
  const { i18n, t } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');
  const navigate = useNavigate();

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HeaderLP LanguageHandler={changeLanguageHandler} isLanguage={isLanguage} />
      <main className={styles.main}>
        <div className={styles.containerMain}>
          <div className={styles.containerTitle}>
            <h1>404</h1>
            <h2>{t("notFound-title-h2")}</h2>
          </div>
          <div className={styles.containerText}>
            <p>{t("notFound-container-paragraph")}</p>
            <div>
              <button onClick={() => navigate('/')} className={styles.buttonReturn} type="button">{t("notFound-container-button-page")}</button>
              <button className={styles.buttonsupport} type="button">{t("notFound-container-button-support")}</button>
            </div>
          </div>
        </div>
      </main>
      <FooterHome />
    </div>
  );
}

export default PageNotFound;
