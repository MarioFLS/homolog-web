import { useTranslation } from "react-i18next";
import styles from "../../../styles/PageToken/Section/AdvantagesSection/AdvantagesSection.module.css";
import IconTablerWorldWww from "../../../assets/Icons/IconTablerWorldWww.svg";
import IconTablerMoodDollar from "../../../assets/Icons/IconTablerMoodDollar.svg";
import IconTablerBuildingEstate from "../../../assets/Icons/IconTablerBuildingEstate.svg";
import IconTablerArrowBearRight from "../../../assets/Icons/IconTablerArrowBearRight.svg";

function AdvantagesSection() {
  const { t } = useTranslation();
  return (
    <section className={styles.sectionAdvantages}>
      <header className={styles.sectionHeader}>
        <h2>{t("tokenPage-section-advantages-title")}</h2>
      </header>

      <main className={styles.containerMain}>
        <article className={styles.containerAdvantages}>
          <div className={styles.containerInternal}>
            <header>
              <img src={IconTablerWorldWww} alt="Icone da Web" />
              <h3>{t("tokenPage-section-advantages-web-title")}</h3>
            </header>
            <p>{t("tokenPage-section-advantages-web-text")}</p>
          </div>
          <div className={styles.containerImageArrow}>
            <img src={IconTablerArrowBearRight} alt="Icone de seta para o proximo quadro" />
          </div>

        </article>

        <article className={styles.containerAdvantages}>
          <div className={styles.containerInternal}>
            <header>
              <img src={IconTablerMoodDollar} alt="Icone de um rostinho com um dolar ao lado" />
              <h3>{t("tokenPage-section-advantages-proposal-title")}</h3>
            </header>
            <p>{t("tokenPage-section-advantages-proposal-text")}</p>
          </div>
          <div className={styles.containerImageArrow}>
            <img src={IconTablerArrowBearRight} alt="Icone de seta para o proximo quadro" />
          </div>
        </article>


        <article className={styles.containerAdvantages}>
          <div className={styles.containerInternal}>
            <header>
              <img src={IconTablerBuildingEstate} alt="Icone de um prédio" />
              <h3>{t("tokenPage-section-advantages-governance-title")}</h3>
            </header>
            <div>
              <p>{t("tokenPage-section-advantages-governance-text")}</p>
            </div>
            <div className={styles.containerList}>
              <ul>
                <li>
                  {t("tokenPage-section-advantages-governance-list-one")}
                </li>
                <li>
                  {t("tokenPage-section-advantages-governance-list-two")}
                </li>
                <li>{t("tokenPage-section-advantages-governance-list-three")}</li>
                <li>{t("tokenPage-section-advantages-governance-list-five")}</li>
              </ul>
            </div>
          </div>
        </article>
      </main>

    </section>
  );
}

export default AdvantagesSection;
