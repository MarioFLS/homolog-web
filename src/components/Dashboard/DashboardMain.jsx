import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/DashboardMain/DashboardMain.module.css';
import CarouselAds from './CarouselAds';
import SectionChart from './SectionChart';

function DashboardMain({ data }) {
  // const { globalInfoUser } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  /* useEffect(() => {
    if (globalInfoUser.id) {
      if (!globalInfoUser.cpf) {
        Swal.fire({
          icon: 'info',
          title: t("alert-advertiser-title"),
          text: t("alert-advertiser-text"),
        });
        return navigate("/wallet");
      }
    }
  }, [globalInfoUser]); */
  return (
    <main className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <h1>
          Dashboard
          {' '}
          <span style={{
            backgroundColor: 'red', color: "white", padding: "5px 10px", borderRadius: "30px",
          }}
          >
            Beta
          </span>
        </h1>
        <button type="button" onClick={() => navigate('/advertising/new')}>{t('yourAds-button')}</button>
      </header>
      <SectionChart />
      <CarouselAds data={data || []} />
    </main>
  );
}

export default DashboardMain;
