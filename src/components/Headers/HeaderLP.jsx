import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popover } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import styles from '../../styles/Header/HeaderLP/Header.module.css';
import Logo from '../../assets/Soulprime.png';
import BR from '../../assets/BR.svg';
import US from '../../assets/US.svg';
import ModalAboutUs from '../Modals/ModalAboutUs';
import ModalToken from '../Modals/ModalToken';
import HeaderLPMobile from './HeaderMobile/HeaderLPMobile';

function HeaderLP({
  LanguageHandler, isLanguage, open, setOpen,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname?.split('/');
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 1050px)' });
  const handleOpen = () => setOpen(true);

  const [openModalToken, setModalToken] = useState(false);
  const handleModalToken = () => { navigate('/prt-governance-experience'); window.scrollTo(0, 0); };


  const [anchorElLogin, setAnchorElLogin] = useState(null);
  /*  const ClickLogin = (event) => {
    setAnchorElLogin(event.currentTarget);
  }; */

  const CloseLogin = () => {
    setAnchorElLogin(null);
  };

  const openLogin = Boolean(anchorElLogin);
  const idLogin = openLogin ? 'popover-Login' : undefined;

  if (isMobileOrTablet) {
    return <HeaderLPMobile LanguageHandler={LanguageHandler} isLanguage={isLanguage} open={open} setOpen={setOpen} />;
  }
  return (
    <header className={styles.header}>
      <div className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={Logo} alt="SoulPrime Logo" />
          </Link>
        </div>
        <nav className={styles.navLinks}>
          <button type="button" onClick={() => { navigate('/'); window.scrollTo(0, 0); }}>
            {t("headerLP-home")}
          </button>
          <button type="button" onClick={handleOpen}>
            {t("headerLP-aboutUs")}
          </button>
          <button id={url[1] === "prt-governance-experience" ? styles.tokenSelected : null} type="button" onClick={handleModalToken}>
            {t("headerLP-token")}
          </button>
          <a onClick={() => navigate('/')} href="#homePartners">
            {t("headerLP-partners")}
          </a>
          <a href="#homeContact">
            {t("headerLP-contacts")}
          </a>
          <button type="button" onClick={() => navigate("check/learn-and-earn")}>NFT</button>
        </nav>
        <div className={styles.navbarButtons}>
          <div className={styles.navbarCountries}>
            <div>
              <button
                type="button"
                onClick={() => LanguageHandler('pt')}
                id={isLanguage === 'pt' ? styles.languageSelected : null}
              >
                <img
                  src={BR}
                  className={styles.navbarBR}
                  alt="Icone da Bandeira do Brasil"
                />
              </button>
              <button
                type="button"
                onClick={() => LanguageHandler('en-us')}
                id={isLanguage === 'en-us' ? styles.languageSelected : null}
              >
                <img
                  src={US}
                  className={styles.navbarUS}
                  alt="Icone da Bandeira do Estados Unidos"
                />
              </button>

            </div>
          </div>
          <div className={styles.linkButtonAcess}>
            <button type="button" className={styles.buttonAcess} onClick={() => navigate("/advertiser")}>
              Login
            </button>
            <Popover
              id={idLogin}
              open={openLogin}
              anchorEl={anchorElLogin}
              onClose={CloseLogin}
              BackdropProps={{ style: { backgroundColor: '#09090D', opacity: 0.5 } }}
              PaperProps={{ style: { boxShadow: 'none', borderRadius: "16px", border: "none" } }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              sx={{
                marginTop: '30px', marginLeft: '-30px', boxShadow: "none", borderRadius: "16px",
              }}
            >
              <article className={styles.popoverLogin}>
                <button
                  id={styles.buttonAdvertiser}
                  type="button"
                  onClick={() => navigate("/advertiser")}
                >
                  Sou anunciante
                </button>
                <button
                  id={styles.buttonUser}
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Sou usuário
                </button>
              </article>
            </Popover>
          </div>
        </div>
      </div>
      <ModalAboutUs open={open} setOpen={setOpen} />
      <ModalToken open={openModalToken} setOpen={setModalToken} />
    </header>
  );
}

export default HeaderLP;
