import { useTranslation } from "react-i18next";
import LogoPRT from "../../../assets/Logo/LogoPRT.png";
import styles from "../../../styles/PageToken/Section/IntroductorySection/IntroductorySection.module.css";

function IntroductorySection() {
  const { t } = useTranslation();
  return (
    <section className={styles.sectionMain}>
      <div className={styles.containerMain}>
        <div className={styles.containerTitle}>
          <h2>
            <span>PRT</span>
            {' '}
            {t("tokenPage-section-introductory-title")}
          </h2>
        </div>
        <div className={styles.containerText}>
          <p>{t("tokenPage-section-introductory-text")}</p>
        </div>
        <div className={styles.containerButton}>
          <button type="button">
            <a href="https://conta.mercadobitcoin.com.br/cadastro?mgm_token=16683cc938757f5da870260bfef18b45992918175cb3db7bd4f719b20a527c90&utm_campaign=mgm&utm_source=web&utm_medium=link-copy" className={styles.buttonBuy} target="_blank" rel="noopener noreferrer">{t("tokenPage-section-introductory-button-buy")}</a>
          </button>

          {/* <button type="button" className={styles.buttonBuy}>{t("tokenPage-section-introductory-buttons")}</button> */}
          {/* <button type="button" className={styles.buttonDeal}>{t("tokenPage-section-introductory-buttons")}</button> */}
          <button type="button">
            <a href="https://conta.mercadobitcoin.com.br/cadastro?mgm_token=16683cc938757f5da870260bfef18b45992918175cb3db7bd4f719b20a527c90&utm_campaign=mgm&utm_source=web&utm_medium=link-copy" className={styles.buttonDeal} target="_blank" rel="noopener noreferrer">{t("tokenPage-section-introductory-button-trade")}</a>
          </button>
        </div>
      </div>
      <div className={styles.containerImg}>
        <img src={LogoPRT} alt="Logo do PRT" />
      </div>
    </section>
  );
}

export default IntroductorySection;
