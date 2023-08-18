import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import DiscordLogoFooter from '../../assets/DiscordLogo.svg';
import ArrowUp from '../../assets/ArrowUp.svg';
import TwitterLogo from '../../assets/TwitterLogo.svg';
import InstagramLogo from '../../assets/InstagramLogo.svg';
import LinkedinLogo from '../../assets/LinkedinLogo.svg';
import TikTokLogo from '../../assets/TikTokLogo.svg';
import styles from '../../styles/LandingPage/Footer/Footer.module.css';

function Footer({ setOpen }) {
  const { t } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');
  const handleOpen = () => setOpen(true);
  const OnTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const linguageStorage = localStorage.getItem('language');
    if (!linguageStorage) {
      return setLanguage('pt');
    }
    setLanguage(linguageStorage);
  });

  return (
    <footer className={styles.footer} id="homeContact">
      <div className={styles.footerMain}>
        <div className={styles.footerContainer}>
          <div className={styles.footerAboutUs}>
            <h4>{t('about-us')}</h4>
            <p>
              {t('about-us-paragraph')}
            </p>
            <button onClick={handleOpen} type="button">
              {t("about-us-continue")}
            </button>
          </div>
          <div className={styles.footerContact}>
            <h4>{t('contact-us')}</h4>
            <p>
              {t('contact-us-paragraph-one')}
              {' '}
              <a
                href="mailto:digital@soulprime.io"
                target="_blank"
                rel="noreferrer"
              >
                e-mail
              </a>
              {' '}
              {t('contact-us-paragraph-two')}
            </p>
            <div className={styles.socialMedia}>
              <h5>Redes Sociais</h5>
              <div>
                <a
                  href="https://www.instagram.com/soulprimeoficial/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={InstagramLogo} alt="Instagram Logo" />
                </a>
                <a
                  href="https://www.tiktok.com/@soulprimeoficial"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={TikTokLogo} alt="TikTok Logo" />
                </a>
                <a
                  href="https://twitter.com/SoulPrime_io"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={TwitterLogo} alt="Twitter Logo" />
                </a>
                <a
                  href="https://discord.gg/UwAUEU4gNb"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={DiscordLogoFooter} alt="Discord Logo" />
                </a>
                <a
                  href="https://www.linkedin.com/company/soulprimeio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={LinkedinLogo} alt="Linkedin Logo" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footerContactInfo}>
            <h4>Informações</h4>
            <a
              href={isLanguage === "pt"
                ? "https://drive.google.com/file/d/1dIzqswOAlegNXQq1BZDXlq0lfj6y0hn7/view"
                : "https://drive.google.com/file/d/1uouhCxEXIdilvdq4OoEXmQxfaiWY6lsl/view"}
              target="_blank"
              rel="noreferrer"
            >
              FAQ
            </a>
            <a
              href={isLanguage === "pt"
                ? "https://drive.google.com/file/d/1w60MVvbJ6sgVTs1yGysezCNFA20s7pPj/view"
                : "https://drive.google.com/file/d/1pDmc1T2SHheIxUMKQi27zuf-5YDGx1K1/view"}
              target="_blank"
              rel="noreferrer"
            >
              White Paper
            </a>
            <a
              href={isLanguage === "pt"
                ? "https://drive.google.com/file/d/1a8JG_watpoGSoJqggyJxdxBH3U8xVo_r/view"
                : "https://drive.google.com/file/d/1Uo09ffXQAf7KIQbVw7TzVhBdzYSx8PYE/view?usp=sharing"}
              target="_blank"
              rel="noreferrer"
            >
              {t('terms-of-use')}
            </a>
            <a
              href={isLanguage === "pt"
                ? "https://drive.google.com/file/d/10pLKbDzHoxGHaQyI7Eykf_Z6hHnH_FaT/view"
                : "https://drive.google.com/file/d/1Neo3V-vJzwZwXOJp2Uz9dKgGYUMBxiJK/view"}
              target="_blank"
              rel="noreferrer"
            >
              {t('privacy policy')}
            </a>
          </div>
        </div>
        <div className={styles.footerBack}>
          <h5>
            {t('footer-text')}
          </h5>
          <button type="button" onClick={OnTop}>
            <p>{t('Back-to-the-top')}</p>
            <img src={ArrowUp} alt="icone de uma seta para cima" />
          </button>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
