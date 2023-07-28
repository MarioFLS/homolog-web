import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import InfoSection from "../components/TokenPage/Sections/InfoSection";
import IntroductorySection from "../components/TokenPage/Sections/IntroductorySection";
import styles from "../styles/PageToken/TokenPage/TokenPage.module.css";
import AdvantagesSection from "../components/TokenPage/Sections/AdvantagesSection";
import WhyBuySection from "../components/TokenPage/Sections/WhyBuySection";
import DoubtSection from "../components/TokenPage/Sections/DoubtSection";
import HeaderLP from "../components/Headers/HeaderLP";
import Footer from "../components/LandingPage/Footer";

function TokenPage() {
  const { i18n } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');
  const [open, setOpen] = useState(false);

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
    <>
      <HeaderLP LanguageHandler={changeLanguageHandler} isLanguage={isLanguage} open={open} setOpen={setOpen} />

      <div className={styles.containerMainLP}>
        <main className={styles.main}>
          <div className={styles.container}>
            <IntroductorySection />
            <InfoSection />
            <AdvantagesSection />
            <WhyBuySection />
            <DoubtSection />
          </div>
        </main>
        <Footer open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

export default TokenPage;
