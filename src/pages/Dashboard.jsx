import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DashboardMain from '../components/Dashboard/DashboardMain';
import HeaderMain from '../components/Headers/HeaderMain';
import AppContext from '../Context/AppContext';
import AlertComponent from '../components/Alert/AlertComponent';
import { getAdsOfUser } from '../helpers/getAds';
import getSecureLocalStorage from '../helpers/getSecureLocalStorage';

function Dashboard() {
  const {
    setAds, userHeader,
  } = useContext(AppContext);
  const { t } = useTranslation();
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);
  const getAds = async () => {
    try {
      const response = await getAdsOfUser(userHeader, setAds, t);
      setData(response.data || []);
      setAds(response.data);
    } catch (error) {
      if (error?.response?.status === 404) {
        setAlert(true);
      }
    }
  };


  useEffect(() => {
    const infoUser = (async () => getSecureLocalStorage())();
    if (infoUser) {
      getAds();
    }
  }, [userHeader]);
  return (
    <>
      <HeaderMain />
      <DashboardMain data={data} />
      <AlertComponent text="Você não tem nenhum anuncio." open={alert} type="info" />
    </>
  );
}

export default Dashboard;
