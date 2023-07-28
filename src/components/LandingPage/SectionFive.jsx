import { useTranslation } from 'react-i18next';
import Padlock from '../../assets/Padlock.png';
import PadlockUS from '../../assets/PadlockUS.png';
import KeyView from '../../assets/KeyView.svg';
import styles from '../../styles/LandingPage/SectionFive/SectionFive.module.css';

function SectionFive() {
  const { t, i18n } = useTranslation();
  const { language } = i18n;
  return (
    <section className={styles.section}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContainerText}>
          <div>
            <h1>{language === 'pt' ? 'Contas' : 'Accounts'}</h1>
            <div style={{ width: '88px' }} className={styles.bordText} />
          </div>
          <h2>{t('whyus-title')}</h2>
          <p>{t('whyus-description')}</p>
        </div>
        <div className={styles.sectionContainerImg}>
          <img src={language === 'pt' ? Padlock : PadlockUS} alt="Imagem de um cadeado com as frases envolta: Confidencialidade, Liberdade, Mais Segurança e Você no Controle" />
        </div>
        <div className={styles.sectionImg}>
          <img src={KeyView} alt="Imagem de uma chave Flutuante" />
        </div>
      </div>
    </section>
  );
}

export default SectionFive;
