import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Outlet, useLocation, useNavigate,
} from 'react-router';
import AppContext from '../../Context/AppContext';
import styles from '../../styles/Advertising/NewAds/NewAds.module.css';
import SectionAds from './SectionAds';

function NewAds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname?.split('/');
  const { newAds } = useContext(AppContext);

  useEffect(() => {
    if (!url.includes('new')) {
      return navigate('new');
    }
  }, []);

  return (
    <main className={styles.containerNewAds}>
      <header className={styles.headerAds}>
        <h1>{t('NewAds-header-h1')}</h1>
      </header>
      {url.at(-1) !== 'new' ? newAds.adsTitle.trim()
        ? <Outlet /> : navigate("/advertising/new")
        : <SectionAds />}
    </main>
  );
}

export default NewAds;
