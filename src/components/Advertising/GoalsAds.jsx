/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Users from '../../assets/Users.svg';
import View from '../../assets/View.svg';
import Traffic from '../../assets/Traffic.svg';
import Interaction from '../../assets/Interaction.svg';
import ChevronLeft from '../../assets/ChevronLeft.svg';
import styles from '../../styles/Advertising/GoalsAds/GoalsAds.module.css';

function GoalsAds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(1);
  const onChangeSelectedCard = (number) => {
    setSelectedCard(number);
  };
  return (

    <section className={styles.sectionAds}>
      <div className={styles.containerAdsMain}>
        <div className={styles.containerAds}>
          <header className={styles.sectionAdsAdsText}>
            <h2>{t('sectionAds-header-text')}</h2>
          </header>
          <div className={styles.sectionAdsGoalContainer}>
            <button
              type="button"
              className={styles.cardAdsGoal}
              onClick={() => onChangeSelectedCard(1)}
              id={selectedCard === 1 ? styles.selectedCard : null}
            >
              <img src={View} alt="Icone de Mensagens de  Visualização" />
              <div className={styles.cardAdsGoalText}>
                <div>
                  <h3>{t('sectionAds-ads-goal-views-h3')}</h3>
                </div>
                <p>{t('sectionAds-ads-goal-views-p')}</p>
              </div>
            </button>
            <button
              type="button"
              className={styles.cardAdsGoal}
              disabled
              // onClick={() => onChangeSelectedCard(4)}
              id={selectedCard === 4 ? styles.selectedCard : null}
            >
              <img src={Traffic} alt="Icone de Mensagens de Chat" />
              <div className={styles.cardAdsGoalText}>
                <div>
                  <h3>{t('sectionAds-ads-goal-traffic-h3')}</h3>
                  <p>Em Breve</p>
                </div>
                <p>{t('sectionAds-ads-goal-traffic-p')}</p>
              </div>
            </button>
            <button
              type="button"
              className={styles.cardAdsGoal}
              disabled
             // onClick={() => onChangeSelectedCard(3)}
              id={selectedCard === 3 ? styles.selectedCard : null}
            >
              <img src={Users} alt="Icone de usuários" />
              <div className={styles.cardAdsGoalText}>
                <div>
                  <h3>{t('sectionAds-ads-goal-lead-h3')}</h3>
                  <p>Em Breve</p>
                </div>
                <p>{t('sectionAds-ads-goal-lead-p')}</p>
              </div>
            </button>
            <button
              type="button"
              className={styles.cardAdsGoal}
              disabled
              // onClick={() => onChangeSelectedCard(2)}
              id={selectedCard === 2 ? styles.selectedCard : null}
            >
              <img src={Interaction} alt="Icone de Mensagens de Chat" />
              <div className={styles.cardAdsGoalText}>
                <div>
                  <h3>{t('sectionAds-ads-goal-community-h3')}</h3>
                  <p>Em Breve</p>
                </div>
                {/* <p>{t('sectionAds-ads-goal-community-p')}</p> */}
                <p>
                  Converter leads, unir pessoas com os mesmos interesses.
                </p>
              </div>
            </button>

          </div>
          <div className={styles.sectionAdsAdsButton}>
            <button
              className={styles.buttonReturn}
              type="button"
              onClick={() => navigate('/advertising/new/choices_ad')}
            >
              <img src={ChevronLeft} alt="Seta para a esquerda" />
              <span>{t('sectionAds-ads-button-return')}</span>
            </button>
            <button type="button" onClick={() => navigate('/advertising/new/payment')}>{t('sectionAds-ads-button-continue')}</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GoalsAds;
