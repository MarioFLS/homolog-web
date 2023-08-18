import { useTranslation } from 'react-i18next';
import LogoAws from '../../assets/partners/LogoAws.svg';
import LogoMercadoBitcoin from '../../assets/partners/LogoMercadoBitcoin.svg';
import ReadyPlayerMe from "../../assets/partners/ReadyPlayerMe.svg";
import LogoFireblocks from '../../assets/partners/LogoFireblocks.svg';
import RocketRose from '../../assets/RocketRose.png';
import StarRose from '../../assets/StarRose.png';
import ChevronRigth from '../../assets/ChevronRigth.svg';
import styles from '../../styles/LandingPage/PartnersCarousel/PartnersCarousel.module.css';

function PartnersCarousel() {
  const { t } = useTranslation();
  return (
    <>
      <div id="homePartners" />
      <section className={styles.sectionPatners}>
        <header id={styles.headerMain}>
          <h3 className={styles.containerTitle}>{ t("partners-tittle") }</h3>
        </header>
        <article id={styles.articlePatners}>
          <div className={styles.containerPatners}>
            <aside className={styles.patner}>
              <header>
                <img src={LogoAws} alt="Logo da AWS" />
              </header>
              <div>
                <p>
                  {t("partners-text-aws")}
                </p>
                <button type="button">
                  <a
                    href="https://aws.amazon.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("partners-text-buttons")}
                    {' '}
                    <img src={ChevronRigth} alt="Icone de seta apontando para direita" />
                  </a>
                </button>
              </div>
            </aside>
            <aside className={styles.patner}>
              <header>
                <img src={LogoMercadoBitcoin} alt="Logo do Mercado Bitcoin" />
              </header>
              <div>
                <p>{t("partners-text-mb")}</p>
                <button type="button">
                  <a
                    href="https://www.mercadobitcoin.com.br"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("partners-text-buttons")}
                    {' '}
                    <img src={ChevronRigth} alt="Icone de seta apontando para direita" />
                  </a>
                </button>
              </div>
            </aside>
            <div className={styles.imageIconsPatners}>
              <img src={RocketRose} alt="Icone de um Foguete Rosa" />
            </div>
          </div>
          <div className={styles.containerPatners}>
            <div className={styles.imageIconsPatners}>
              <img src={StarRose} alt="Icone de uma Estrela Rosa" />
            </div>
            <aside className={styles.patner}>
              <header>
                <img src={ReadyPlayerMe} alt="Logo da ReadyPlayerMe" />
              </header>
              <div>
                <p>{t("partners-text-rpm")}</p>
                <button type="button">
                  <a
                    href="https://readyplayer.me"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t("partners-text-buttons")}
                    {' '}
                    <img src={ChevronRigth} alt="Icone de seta apontando para direita" />
                  </a>
                </button>
              </div>
            </aside>
            <aside className={styles.patner}>
              <header>
                <img src={LogoFireblocks} alt="Logo da Fireblocks" />
              </header>
              <div>
                <p>{t("partners-text-fireblock")}</p>
                <button type="button">
                  <a
                    href="https://www.fireblocks.com"
                    target="button"
                  >
                    {t("partners-text-buttons")}
                    {' '}
                    <img src={ChevronRigth} alt="Icone de seta apontando para direita" />
                  </a>
                </button>
              </div>
            </aside>

          </div>
        </article>

      </section>
    </>
  );
}

export default PartnersCarousel;
