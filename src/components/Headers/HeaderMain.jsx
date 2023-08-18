import { Avatar, Popover } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from '../../assets/SoulPrimeLogoHorizontal.png';
import IconDashboard from '../../assets/Icons/IconDashboard.svg';
import IconsPayments from '../../assets/Icons/IconPayments.svg';
import ArrowDropDown from '../../assets/ArrowDropDown.svg';
import IconSetting from '../../assets/Icons/IconSetting.svg';
import IconWallet from '../../assets/Icons/IconWallet.svg';
import IconProfile from '../../assets/Icons/IconProfile.svg';
import IconLock from '../../assets/Icons/IconLock.svg';
import IconTablerShieldLock from '../../assets/Icons/IconTablerShieldLock.svg';
import IconMessageReport from '../../assets/Icons/IconMessageReport.svg';
import IconTablerFileText from '../../assets/Icons/IconTablerFileText.svg';

import styles from '../../styles/Header/HeaderMain/HeaderMain.module.css';
import AccordionLanguage from './AccordionLanguage';
import AppContext from '../../Context/AppContext';
import getInfoUser from '../../helpers/getInfoUser';
import Company from './Company/Company';
import getSecureLocalStorage from '../../helpers/getSecureLocalStorage';
import ModalProfilePhoto from '../Modals/ProfilePhoto/ModalProfilePhoto';
import IconEdit from '../../assets/Icons/IconEdit.svg';



function HeaderMain() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname?.split('/');
  const [value, setValue] = useState('one');
  const [anchorElCompany, setAnchorElCompany] = useState(null);
  const [anchorElNotificação, setAnchorElConfig] = useState(null);
  const {
    globalInfoUser, setGlobalInfoUser, setUserHeader, userHeader,
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);

  const closeModal = () => { setOpen(false); };


  const fetchUser = async () => {
    const infoUser = await getSecureLocalStorage();
    if (infoUser) {
      const user = await getInfoUser(globalInfoUser);
      if (user?.data) {
        const { data } = user;
        if (user.data.address?.length === 0 || globalInfoUser?.address?.length === 0) {
          const paths = ["/dashboard", "/advertising", "/wallet"];
          if (paths.includes(pathname)) {
            return navigate("/advertiser");
          }
          setGlobalInfoUser(data);
          setUserHeader(data);
        }
      }
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!globalInfoUser?.id) {
          return await fetchUser();
        }
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, [globalInfoUser]);

  const ClickCompany = (event) => {
    setAnchorElCompany(event.currentTarget);
  };

  const CloseCompany = () => {
    setAnchorElCompany(null);
  };

  const openCompany = Boolean(anchorElCompany);
  const idCompany = openCompany ? 'popover-company' : undefined;

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const ClickConfig = (event) => {
    setAnchorElConfig(event.currentTarget);
  };

  const CloseConfig = () => {
    setAnchorElConfig(null);
  };

  const openConfig = Boolean(anchorElNotificação);
  const idConfig = openConfig ? 'popover-config' : undefined;

  const signOut = () => {
    localStorage.clear();
    navigate("/");
    window.location.href = "/";
  };

  return (
    <>
      <header className={styles.headerContainer}>
        <Link to="/dashboard">
          <img className={styles.logoSoulprime} src={Logo} alt="Logo da Soulprime" />
        </Link>
        <nav
          value={value}
          className={styles.navbarMainTabs}
        >
          <button
            type="button"
            onClick={() => { handleChange('one'); navigate('/dashboard'); }}
            className={styles.navbarTabs}
            id={url.includes('dashboard') ? styles.navbarTabSelected : null}
          >
            <img className={styles.navbarTabsImage} src={IconDashboard} alt="Icone de Dashboard. Sua aparência é uma carta aberta." />
            <p>Dashboard</p>
          </button>
          <button
            type="button"
            onClick={() => { handleChange('two'); navigate('/advertising'); }}
            className={styles.navbarTabs}
            id={url.includes('advertising') && !url.includes('payment') ? styles.navbarTabSelected : null}
          >
            <img
              className={styles.navbarTabsImage}
              src={IconsPayments}
              alt="Icone de Anúncio. Sua aparência é uma brasa"
            />
            <p>{t('header-navbard-ads')}</p>
          </button>
        </nav>
        <div className={styles.navbarClient}>
          <div className={styles.navbarClientProfile}>
            <div className={styles.navbarClientContainer}>
              <button type="button" onClick={ClickCompany}>
                <p id={styles.navbarClientText}>{t('headerMain-company')}</p>
                <div>
                  <p>
                    {userHeader.username}
                  </p>
                  <img src={ArrowDropDown} alt="Pequena seta apontando para baixo." />
                </div>
              </button>
              <Popover
                id={idCompany}
                open={openCompany}
                anchorEl={anchorElCompany}
                onClose={CloseCompany}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ marginTop: '30px', marginLeft: '-30px', zIndex: '800' }}
              >
                <Company />
              </Popover>
            </div>
            <div className={styles.containerCompanyAvatar}>
              <Avatar alt="Icone do Usuário" src={userHeader.imagem} className={styles.containerCompanyImg} />
              <button type="button" onClick={() => setOpen(true)} className={styles.imgEdit}>
                <img src={IconEdit} alt="Icone de Edição" />
              </button>
            </div>
            {/* <div className={styles.containerCompanyAvatar}>
              <Avatar
                className={styles.containerCompanyImg}
                alt="Icone do Usuário"
                src={imagem}
                onClick={() => setOpen(true)}
              />

            </div> */}
          </div>
          {!userHeader?.associated && (
          <button type="button" onClick={() => navigate('/wallet')}>
            <img
              className={styles.navbarClientIcons}
              src={IconWallet}
              alt="Icone da carteira. Sua aparência é de uma carteira."
            />
          </button>
          )}

          <Popover
            id={idConfig}
            open={openConfig}
            anchorEl={anchorElNotificação}
            onClose={CloseConfig}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{ marginTop: '30px' }}
          >
            <div className={styles.popoverConfig}>
              <h3>Configurações</h3>
              <div>
                <button type="button">
                  <img src={IconProfile} alt="Imagem de um Bonequinho de palitos" />
                  <span>{t('headerMain-popover-config-account')}</span>
                </button>
                <button type="button">
                  <img src={IconLock} alt="Icone de um cadeado" />
                  <span>{t('headerMain-popover-config-privacy')}</span>
                </button>
                <button type="button" onClick={() => window.open("https://www.soulprime.io/Politica_de_Privacidade_SoulPrime.pdf", '_blank')}>
                  <img src={IconTablerFileText} alt="Icone de um tabela" />
                  <span>{t("headerMain-popover-config-terms")}</span>
                </button>
                <button type="button">
                  <img src={IconTablerShieldLock} alt="Icone de uma chave" />
                  <span>{t('headerMain-popover-config-security')}</span>
                </button>
                <AccordionLanguage />
                <button type="button">
                  <img src={IconMessageReport} alt="Icone de reportar uma menssagem" />
                  <span>{t('headerMain-popover-config-report')}</span>
                </button>
                <button
                  type="button"
                  className={styles.popoverConfigButton}
                  onClick={signOut}
                >
                  {t('headerMain-popover-config-logoff')}
                </button>
              </div>
            </div>
          </Popover>
          <button type="button" onClick={ClickConfig}>
            <img
              className={styles.navbarClientIcons}
              src={IconSetting}
              alt="Icone de Configuração. Sua aparência é de uma engrenagem."
            />
          </button>
        </div>
      </header>
      <ModalProfilePhoto open={open} handleClose={closeModal} />
    </>
  );
}

export default HeaderMain;
