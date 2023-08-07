import { useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';
import Context from './AppContext';
import { getAdsOfUser } from '../helpers/getAds';
import getInfoUser from '../helpers/getInfoUser';
import getSecureLocalStorage from '../helpers/getSecureLocalStorage';

function AppProvider({ children }) {
  const { t } = useTranslation();
  const [advertisersCpf, setCpf] = useState(null);
  const [ads, setAds] = useState([]);
  const [idWallet, setIdWallet] = useState('');
  const [balance, setBalance] = useState(0);
  const [globalInfoUser, setGlobalInfoUser] = useState({});
  const [userHeader, setUserHeader] = useState({});
  const [newAds, setNewAds] = useState({
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
  const [infoBoleto, setInfoBoleto] = useState({
    success: false,
    url: "",
    pdf: "",
    identification: "",
    invoice_id: "",
  });
  const [userForms, setUserForms] = useState({
    email: '',
    cpf: '',
  });
  const [alertInfos, setAlertInfos] = useState({});
  const [userSignUp, setUserSignUp] = useState({
    username: "",
    nickname: "",
    telephone: "",
    age: "",
    email: "",
    password: "",
    bio: "",
    gender: "1",
    content_creator: true,
  });

  const contextValue = useMemo(
    () => ({
      ads,
      setAds,
      idWallet,
      setIdWallet,
      balance,
      setBalance,
      globalInfoUser,
      setGlobalInfoUser,
      newAds,
      setNewAds,
      userForms,
      setUserForms,
      alertInfos,
      setAlertInfos,
      advertisersCpf,
      setCpf,
      userHeader,
      setUserHeader,
      infoBoleto,
      setInfoBoleto,
      userSignUp,
      setUserSignUp,
    }),
    [
      ads,
      idWallet,
      balance,
      globalInfoUser,
      newAds,
      userForms,
      alertInfos,
      advertisersCpf,
      userHeader,
      infoBoleto,
      userSignUp,
    ],
  );

  const fetchUser = async () => {
    const infoUser = await getSecureLocalStorage();
    if (infoUser) {
      try {
        const { data } = await getInfoUser(globalInfoUser);
        setGlobalInfoUser(data);
        setUserHeader(data);
      } catch (error) {
        const { data } = await getInfoUser(globalInfoUser);
        setGlobalInfoUser(data);
        setUserHeader(data);
      }
    }
  };

  const getAds = async () => {
    const response = await getAdsOfUser(userHeader, setAds, t);
    setAds(response.data);
  };

  useEffect(() => {
    fetchUser();
    getAds();
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default AppProvider;
