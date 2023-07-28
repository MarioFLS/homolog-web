import { useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CarouselAds from '../Dashboard/CarouselAds';
import IconSearch from '../../assets/Icons/IconSearch.svg';
import styles from '../../styles/Advertising/YourAds/YourAds.module.css';
import AppContext from '../../Context/AppContext';
import { getAdsOfUser } from '../../helpers/getAds';
import getSecureLocalStorage from '../../helpers/getSecureLocalStorage';

function YourAds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ads, setAds, userHeader } = useContext(AppContext);
  const [typeAds, setTypeAds] = useState(1);
  const getAds = async () => {
    const response = await getAdsOfUser(userHeader, setAds, t);
    setAds(response.data);
  };

  useEffect(() => {
    const infoUser = (async () => getSecureLocalStorage())();
    if (infoUser) {
      getAds();
    }
  }, []);

  return (
    <main className={styles.containerMain}>
      <div className={styles.containerAds}>
        <div className={styles.containerText}>
          <h1>{t('yourAds-title')}</h1>
          <button type="button" onClick={() => navigate('new')}>
            {t('yourAds-button')}
          </button>
        </div>
        <section className={styles.sectionAds}>
          <header>
            <nav>
              <button
                onClick={() => setTypeAds(1)}
                type="button"
                className={typeAds === 1 ? styles.adsSelected : null}
              >
                <div className={styles.adsSelectedContainer}>
                  <h2>{t('yourAds-header-nav-title-active')}</h2>
                  <p>{ads.length}</p>
                </div>
                <div className={styles.adsSelectedDiv} />
              </button>
              <button
                onClick={() => setTypeAds(2)}
                type="button"
                className={typeAds === 2 ? styles.adsSelected : null}
              >
                <div className={styles.adsSelectedContainer}>
                  <h2>{t('yourAds-header-nav-title-finished')}</h2>
                  <p>0</p>
                </div>
                <div className={styles.adsSelectedDiv} />
              </button>
              <button
                onClick={() => setTypeAds(3)}
                type="button"
                className={typeAds === 3 ? styles.adsSelected : null}
              >
                <div className={styles.adsSelectedContainer}>
                  <h2>{t('yourAds-header-nav-title-sketch')}</h2>
                  <p>0</p>
                </div>
                <div className={styles.adsSelectedDiv} />
              </button>
            </nav>
            <div className={styles.sectionInput}>
              <img src={IconSearch} alt="Icone de uma Lupa" />
              <input type="text" placeholder={t('yourAds-header-input-placeholder')} />
            </div>

          </header>
          <CarouselAds data={ads || []} />
        </section>
      </div>
    </main>
  );
}

export default YourAds;
