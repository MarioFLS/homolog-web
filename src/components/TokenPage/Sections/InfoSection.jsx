import copy from 'copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import PRTToken from "../../../assets/PRTToken.png";
import IconRoseTablerExternalLink from "../../../assets/Icons/IconRoseTablerExternalLink.svg";
import IconRoseCopy from "../../../assets/Icons/IconRoseCopy.svg";
import styles from "../../../styles/PageToken/Section/InfoSection/InfoSection.module.css";

function InfoSection() {
  const { t } = useTranslation();

  const copyCode = () => {
    copy("0xcf574B17Bc361fBb59A0Fa20E70F7cD7183D2f95");
  };

  return (
    <section className={styles.sectionInfo}>
      <article className={styles.articleBase}>
        <div className={styles.containerTitle}>
          <img src={PRTToken} alt="Icone do PRT" />
          <h3>Prime Token</h3>
          <h4>PRT</h4>
        </div>

        <div className={styles.containerText}>
          <p>
            <span>{t("tokenPage-section-info-topics-one-title")}</span>
            {" "}
            Prime Token
          </p>
          <p>
            <span>{t("tokenPage-section-info-topics-two-title")}</span>
            {" "}
            PRT
          </p>
          <p>
            <span>{t("tokenPage-section-info-topics-three-title")}</span>
            {" "}
            ERC-20 | Ethereum
          </p>
          <p>
            <span>{t("tokenPage-section-info-topics-four-title")}</span>
            {" "}
            Web 3, SocialFi, NFT
          </p>
          <p>
            <span>{t("tokenPage-section-info-topics-five-title")}</span>
            {" "}
            {t("tokenPage-section-info-topics-five-response")}
          </p>
        </div>

        <div className={styles.containerWhitepaper}>
          <p>White Paper</p>
          <a href="https://drive.google.com/file/d/1w60MVvbJ6sgVTs1yGysezCNFA20s7pPj/view" target="_blank" rel="noopener noreferrer">
            PT
            {' '}
            <img src={IconRoseTablerExternalLink} alt="Icone de Link Externo. Leva para o Whitepaper em português" />
          </a>
          <a href="https://drive.google.com/file/d/1LowYovQvcSYfJUoknb0k6C7OV13P1wKG/view" target="_blank" rel="noopener noreferrer">
            EN
            <img src={IconRoseTablerExternalLink} alt="Icone de Link Externo. Leva para o Whitepaper em inglês" />
          </a>
        </div>
      </article>

      <article className={styles.articleInfo}>
        <div className={styles.containerDescription}>
          <h4>
            {t("tokenPage-section-technical-description-title")}
          </h4>
          <p>
            {' '}
            {t("tokenPage-section-technical-description-response")}
          </p>
        </div>

        <div className={styles.containerDescription}>
          <h4>
            {t("tokenPage-section-smart-contract-title")}
          </h4>
          <p>{t("tokenPage-section-smart-contract-response")}</p>
        </div>

        <div className={styles.containerContract}>
          <p className={styles.contractTitle}>{t("tokenPage-section-smart-contract")}</p>
          <p className={styles.contractHex}>0xcf574...B17Bc361</p>
          <button type="button" onClick={copyCode}>
            <img src={IconRoseCopy} alt="Icone de copiar" />
            {t("tokenPage-section-smart-contract-copy")}
          </button>
          <a href="https://etherscan.io/token/0xcf574B17Bc361fBb59A0Fa20E70F7cD7183D2f95" target="_blank" rel="noopener noreferrer">
            <img src={IconRoseTablerExternalLink} alt="Icone para ir para um Link Externo" />
            {t("tokenPage-section-smart-contract-access")}
          </a>
        </div>
      </article>
    </section>
  );
}

export default InfoSection;
