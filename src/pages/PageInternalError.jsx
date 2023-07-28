import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import HeaderLP from '../components/Headers/HeaderLP';
import FooterHome from '../components/Home/FooterHome';
import styles from '../styles/NotFound/NotFound.module.css';

function PageInternalError() {
  const { i18n, t } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname?.split('/').slice(0, -1);
  const prevesUrl = url.join('/');
  const previousUrl = prevesUrl.trim() === "" ? "/" : prevesUrl;

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <HeaderLP LanguageHandler={changeLanguageHandler} isLanguage={isLanguage} />
      <main className={styles.main}>
        <div className={styles.containerTitle}>
          <h1>500</h1>
          <h2>{t("pageInternal-container-title-h2")}</h2>
        </div>
        <div className={styles.containerText}>
          <p>{t("pageInternal-container-text-paragraph")}</p>
          <div>
            <button onClick={() => navigate(previousUrl)} className={styles.buttonReturn} type="button">{t("pageInternal-button-page")}</button>
            <button className={styles.buttonsupport} type="button">{t("notFound-container-button-support")}</button>
          </div>
        </div>
      </main>
      <FooterHome />
    </div>
  );
}

export default PageInternalError;
