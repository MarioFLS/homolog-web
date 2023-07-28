/* eslint-disable no-nested-ternary */
import { useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import FirstAds from '../components/Advertising/FirstAds';

import YourAds from '../components/Advertising/YourAds';
import HeaderMain from '../components/Headers/HeaderMain';
import AppContext from '../Context/AppContext';
import { getAdsOfUser } from '../helpers/getAds';

function Advertising() {
  const { t } = useTranslation();
  const {
    ads, userHeader, setAds,
  } = useContext(AppContext);
  const { pathname } = useLocation();
  const url = pathname?.split('/');

  const getAds = async () => {
    const response = await getAdsOfUser(userHeader, setAds, t);
    setAds(response.data);
  };

  useEffect(() => {
    getAds();
  }, []);

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
    <>
      <HeaderMain />
      {ads?.length > 0
        ? url.length > 2 ? <Outlet /> : <YourAds />
        : url.length > 2 ? <Outlet /> : <FirstAds />}
    </>
  );
}

export default Advertising;
