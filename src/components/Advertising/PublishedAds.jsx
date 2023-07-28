import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ClockFrontGradient from '../../assets/ClockFrontGradient.png';
import styles from '../../styles/Published/Published.module.css';
import HeaderMain from '../Headers/HeaderMain';
import AppContext from '../../Context/AppContext';

function PublishedAds() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { type } = useParams();
  const { setNewAds, setInfoBoleto } = useContext(AppContext);
  useEffect(() => {
    setNewAds({
      adsTitle: '',
      adsCategory: '',
      price: 0,
      priceInDollar: '',
      views: '',
      file: '',
      link: '',
      adultOnly: false,
      buttonType: 1,
      cig: '',
    });
    setInfoBoleto({
      success: false,
      url: "",
      pdf: "",
      identification: "",
      invoice_id: "",
    });
  }, []);

  return (
    <>
      <HeaderMain />
      <section className={styles.sectionPublished}>
        <div className={styles.containerMain}>
        <header>
          <h2>Seu anúncio</h2>
          <p>Em análise</p>
        </header>
        <div className={styles.containerInfo}>
            <img src={ClockFrontGradient} alt="Icone de uma forma com pontas arredondas e um simbulo de confirmação no centro" />
            {type === 'boleto'
              ?
              (
                <div className={styles.containerTextBoleto}>
                  <h1>{t("published-ads-boleto-title")}</h1>
                  <p>{t("published-ads-boleto-paragraph")}</p>
                </div>
              )
              :
              (
                <div className={styles.containerText}>
                  <h1>{t("published-ads-title")}</h1>
                  <p>{t("published-ads-paragraph")}</p>
                </div>
              )
            }
          <button onClick={() => navigate('/dashboard')} type="button">Ir para a Dashboard</button>
        </div>
        </div>
      </section>
    </>
  );
}

export default PublishedAds;
