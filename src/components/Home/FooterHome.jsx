import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/Home/Footer.module.css';

function FooterHome() {
  const { t } = useTranslation();
  const [isLanguage, setLanguage] = useState('pt');
  useEffect(() => {
    const linguageStorage = localStorage.getItem('language');
    if (!linguageStorage) {
      return setLanguage('pt');
    }
    setLanguage(linguageStorage);
  });
  return (
    <footer className={styles.footer}>
      <div>
        <h6>©2023 SoulPrime</h6>
      </div>
      <div className={styles.footerLinks}>
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
        <a
          href={isLanguage === "pt"
            ? "https://drive.google.com/file/d/1dIzqswOAlegNXQq1BZDXlq0lfj6y0hn7/view"
            : "https://drive.google.com/file/d/1uouhCxEXIdilvdq4OoEXmQxfaiWY6lsl/view"}
          target="_blank"
          rel="noreferrer"
        >
          FAQ
        </a>
      </div>
    </footer>
  );
}

export default FooterHome;
