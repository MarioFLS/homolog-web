import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import MockupExtract from "../../../assets/MockupExtract.png";
import IconCircleFilled1 from "../../../assets/IconsNumber/IconCircleFilled1.svg";
import IconCircleFilled2 from "../../../assets/IconsNumber/IconCircleFilled2.svg";
import IconCircleFilled3 from "../../../assets/IconsNumber/IconCircleFilled3.svg";
import IconCircleFilled4 from "../../../assets/IconsNumber/IconCircleFilled4.svg";
import styles from "../../../styles/PageToken/Section/WhyBuySection/WhyBuySection.module.css";

function WhyBuySection() {
  const { t } = useTranslation();
  const [selectedInfo, setSelectedInfo] = useState(1);
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      switch (selectedInfo) {
        case 1:
          setSelectedInfo(2);
          break;
        case 2:
          setSelectedInfo(3);
          break;
        case 3:
          setSelectedInfo(4);
          break;
        default:
          setSelectedInfo(1);
          break;
      }
    }, 3000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [selectedInfo]);

  return (
    <section className={styles.sectionBuy}>
      <header className={styles.sectionHeader}>
        <h2>{t("tokenPage-section-buy-title")}</h2>
        <p><small>{t("tokenPage-section-buy-paragraph")}</small></p>
      </header>
      <main className={styles.mainContainer}>
        <div className={styles.containerInternal}>
          <article
            className={styles.articleTextOne}
            id={selectedInfo === 1 ? styles.articleSelected : null}
          >
            <div className={styles.containerIcon}>
              <img src={IconCircleFilled1} alt="Icone do número 1" />
            </div>
            <div className={styles.containerText}>
              <h5>{t("tokenPage-section-buy-text-title-one")}</h5>
              <p>{t("tokenPage-section-buy-text-paragraph-one")}</p>
            </div>
          </article>
          <article
            className={styles.articleText}
            id={selectedInfo === 2 ? styles.articleSelected : null}
          >
            <div className={styles.containerIcon}>
              <img src={IconCircleFilled2} alt="Icone do número 2" />
            </div>
            <div className={styles.containerText}>
              <h5>{t("tokenPage-section-buy-text-title-two")}</h5>
              <p>{t("tokenPage-section-buy-text-paragraph-two")}</p>
            </div>
          </article>
          <article
            className={styles.articleText}
            id={selectedInfo === 3 ? styles.articleSelected : null}
          >
            <div className={styles.containerIcon}>
              <img src={IconCircleFilled3} alt="Icone do número 3" />
            </div>
            <div className={styles.containerText}>
              <h5>{t("tokenPage-section-buy-text-title-three")}</h5>
              <p>{t("tokenPage-section-buy-text-paragraph-three")}</p>
            </div>
          </article>
          <article
            className={styles.articleTextFour}
            id={selectedInfo === 4 ? styles.articleFourSelected : null}
          >
            <div className={styles.containerIcon}>
              <img src={IconCircleFilled4} alt="Icone do número 4" />
            </div>
            <div className={styles.containerText}>
              <h5>{t("tokenPage-section-buy-text-title-four")}</h5>
              <p>{t("tokenPage-section-buy-text-paragraph-four")}</p>
            </div>
          </article>
        </div>
        <div className={styles.containerImg}>
          <img src={MockupExtract} alt="Mockup do app com extrato" />
        </div>

      </main>
    </section>
  );
}

export default WhyBuySection;
