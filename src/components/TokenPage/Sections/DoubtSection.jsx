import {
  Accordion, AccordionDetails, AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { useState } from "react";
import { useTranslation } from "react-i18next";
import MockupAtivo from "../../../assets/MockupAtivo.png";
import styles from "../../../styles/PageToken/Section/DoubtSection/DoubtSection.module.css";

function DoubtSection() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    if (!isExpanded && expanded === 'panel1') return setExpanded('panel2');
    if (!isExpanded && expanded === 'panel2') return setExpanded('panel3');
    return setExpanded(isExpanded ? panel : 'panel1');
  };

  return (
    <section className={styles.sectionDoubt}>
      <header className={styles.sectionHeader}>
        <h2>{t("tokenPage-section-doubts-title")}</h2>
      </header>
      <main className={styles.containerMain}>
        <div className={styles.containerInternal}>
          <Accordion className={styles.accordion} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
            <AccordionSummary
              className={styles.accordionSumary}
              expandIcon={<ExpandMoreIcon style={{ color: '#BA02C9' }} />}
            >
              <h4>{t("tokenPage-section-doubts-accordion-one-title")}</h4>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <p>
                {t("tokenPage-section-doubts-accordion-one-text")}
                {' '}
                <a href="https://conta.mercadobitcoin.com.br/cadastro?mgm_token=16683cc938757f5da870260bfef18b45992918175cb3db7bd4f719b20a527c90&utm_campaign=mgm&utm_source=web&utm_medium=link-copy" target="_blank" rel="noopener noreferrer">Mercado Bitcoin</a>
                {' '}
                {t("tokenPage-section-doubts-accordion-one-text-two")}
                {' '}
              </p>
              <p>
                <small>{t("tokenPage-section-doubts-accordion-one-text-date")}</small>
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.accordion} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
            <AccordionSummary
              className={styles.accordionSumary}
              expandIcon={<ExpandMoreIcon style={{ color: '#BA02C9' }} />}
            >
              <h4>{t("tokenPage-section-doubts-accordion-two-title")}</h4>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <p>
                {t("tokenPage-section-doubts-accordion-two-text")}
              </p>
            </AccordionDetails>
          </Accordion>
          <Accordion className={styles.accordion} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
            <AccordionSummary
              className={styles.accordionSumary}
              expandIcon={<ExpandMoreIcon style={{ color: '#BA02C9' }} />}
            >
              <h4>
                {t("tokenPage-section-doubts-accordion-three-title")}
              </h4>
            </AccordionSummary>
            <AccordionDetails className={styles.accordionDetails}>
              <p>
                {t("tokenPage-section-doubts-accordion-three-text")}
              </p>
              <p>
                <small>
                  {' '}
                  {t("tokenPage-section-doubts-accordion-three-text-date")}
                </small>
              </p>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className={styles.containerImg}>
          <img src={MockupAtivo} alt="Imagem da seleção de Ativo do PRT" />
        </div>
      </main>
    </section>
  );
}

export default DoubtSection;
