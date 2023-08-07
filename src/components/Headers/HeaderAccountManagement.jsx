import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import styles from '../../styles/Header/HeaderAccountManagement/HeaderAccountManagement.module.css';
import LogoSoulprime from '../../assets/Logo/LogoSoulPrime.png';
import BR from '../../assets/BR.svg';
import US from '../../assets/US.svg';

function HeaderAccountManagement() {
  const { i18n } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');

  const changeLanguageHandler = (lang) => {
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  useEffect(() => {
    const linguageStorage = localStorage.getItem('language');
    if (!linguageStorage) {
      return setLanguage('pt');
    }
    setLanguage(linguageStorage);
    return changeLanguageHandler(linguageStorage);
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={LogoSoulprime} alt="SoulPrime Logo" />
          </Link>
        </div>
        <nav className={styles.navbarButtons}>
          <div className={styles.navbarCountries}>
            <div>
              <button
                type="button"
                onClick={() => changeLanguageHandler('pt')}
                id={isLanguage === 'pt' ? styles.languageSelected : null}
              >
                <img
                  src={BR}
                  className={styles.navbarBR}
                  alt="Icone da Bandeira do Brasil"
                />
              </button>
              <button
                type="button"
                onClick={() => changeLanguageHandler('en-us')}
                id={isLanguage === 'en-us' ? styles.languageSelected : null}
              >
                <img
                  src={US}
                  className={styles.navbarUS}
                  alt="Icone da Bandeira do Estados Unidos"
                />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAccountManagement;
