import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Navigate, Outlet, useLocation, useNavigate,
} from 'react-router';
import secureLocalStorage from 'react-secure-storage';
import HeaderLP from '../components/Headers/HeaderLP';
import Footer from '../components/LandingPage/Footer';
import PartnersCarousel from '../components/LandingPage/PartnersCarousel';
import SectionFive from '../components/LandingPage/SectionFive';
import SectionFour from '../components/LandingPage/SectionFour';
import SectionOne from '../components/LandingPage/SectionOne';
import SectionThree from '../components/LandingPage/SectionThree';
import SectionTwo from '../components/LandingPage/SectionTwo';
import styles from '../styles/LandingPage/LandingPage.module.css';
import MediaCarousel from '../components/LandingPage/MediaCarousel';
import getSecureLocalStorage from '../helpers/getSecureLocalStorage';

function LandingPage() {
  const { i18n } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const url = pathname?.split('/');

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

  useEffect(() => {
    const infoUser = (async () => getSecureLocalStorage())();
    if (infoUser && pathname === "/") {
      return navigate("wallet");
    }
  }, []);


  return (
    <>
      {url.includes('signUp')
        || url.includes('home')
        || url.includes('collection')
        || url.at(-1) === ''
        ? <HeaderLP LanguageHandler={changeLanguageHandler} isLanguage={isLanguage} open={open} setOpen={setOpen} /> : null}

      {url.at(-1) !== ''
        ? secureLocalStorage.getItem("user_information_session")
          ? <Outlet /> : <Navigate to="/" />
        : (
          <div className={styles.containerMainLP}>
            <main className={styles.main}>
              <div className={styles.container}>
                <SectionOne />
                <PartnersCarousel />
                <MediaCarousel />
                <SectionTwo />
                <SectionThree />
                <SectionFour />
                <SectionFive />
              </div>
            </main>
            <Footer open={open} setOpen={setOpen} />
          </div>
        )}
    </>
  );
}

export default LandingPage;
