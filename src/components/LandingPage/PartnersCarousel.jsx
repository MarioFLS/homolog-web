import { useTranslation } from 'react-i18next';
import LogoAws from '../../assets/partners/LogoAws.svg';
import LogoMercadoBitcoin from '../../assets/partners/LogoMercadoBitcoin.svg';
import ReadyPlayerMe from "../../assets/partners/ReadyPlayerMe.svg";
import LogoFireblocks from '../../assets/partners/LogoFireblocks.svg';
import styles from '../../styles/LandingPage/PartnersCarousel/PartnersCarousel.module.css';

function PartnersCarousel() {
  const { t } = useTranslation();
  return (
    <>
      <div id="homePartners" />
      <section className={styles.sectionPatners}>
        <h3 className={styles.containerTitle}>{ t("partners") }</h3>
        <div className={styles.containerPatners}>
          <a href="https://www.amazon.com.br/" target="_blank" rel="noreferrer">
            <img src={LogoAws} alt="Logo da Amazon, com link pra Amazon" />
          </a>
          <a href="https://www.mercadobitcoin.com.br/" target="_blank" rel="noreferrer">
            <img src={LogoMercadoBitcoin} alt="Logo do Mercado Bitcoin, com link pra Mercado Bitcoin" />
          </a>
          <a href="https://readyplayer.me/pt-BR" target="_blank" rel="noreferrer">
            <img src={ReadyPlayerMe} alt="Logo do ReadyPlayerMe, com link pra ReadyPlayerMe" />
          </a>
          <a href="https://www.fireblocks.com/" target="_blank" rel="noreferrer">
            <img src={LogoFireblocks} alt="Logo do Fireblocks, com link pra Fireblocks" />
          </a>
        </div>
      </section>
    </>
  );
}

export default PartnersCarousel;
