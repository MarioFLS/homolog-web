
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion, AccordionDetails, AccordionSummary,
} from '@mui/material';

import styles from '../../../styles/Header/HeaderMobile/HeaderLPMobile.module.css';
import Logo from '../../../assets/Soulprime.png';
import BR from '../../../assets/BR.svg';
import US from '../../../assets/US.svg';
import MenuHamburguer from "../../../assets/Icons/IconMenuHamburguer.svg";
import ModalAboutUs from '../../Modals/ModalAboutUs';
import ModalToken from '../../Modals/ModalToken';

function HeaderLPMobile({
  LanguageHandler, isLanguage, open, setOpen,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname?.split('/');
  const handleOpen = () => setOpen(true);
  const [expanded, setExpanded] = useState(false);

  const [openModalToken, setModalToken] = useState(false);
  const handleModalToken = () => navigate('/prt-governance-experience');

  return (
    <>
      <Accordion expanded={expanded} className={styles.accordion} component="header">
        <AccordionSummary
          className={styles.accordionSummary}
        >
          <div className={styles.containerHeader}>
            <div className={styles.containerLink}>
              <Link to="/">
                <img src={Logo} alt="SoulPrime Logo" />
              </Link>
            </div>

            <div className={styles.containerMain}>
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
              <button onClick={() => setExpanded(!expanded)} className={styles.buttonMenu} type="button">
                <img src={MenuHamburguer} alt="Icone de Menu do Tipo Hambúrguer" />
              </button>
            </div>
          </div>

        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <div>
            <button type="button" onClick={() => { navigate('/'); setExpanded(false); window.scrollTo(0, 0); }}>
              {t("headerLP-home")}
            </button>
            <button type="button" onClick={handleOpen}>
              {t("headerLP-aboutUs")}
            </button>
            <button id={url[1] === "prt-governance-experience" ? styles.tokenSelected : null} type="button" onClick={handleModalToken}>
              {t("headerLP-token")}
            </button>
            <a onClick={() => { navigate('/'); setExpanded(false); window.scrollTo(0, 0); }} href="#homePartners">
              {t("headerLP-partners")}
            </a>
            <a href="#homeContact">
              {t("headerLP-contacts")}
            </a>
          </div>

        </AccordionDetails>
      </Accordion>
      <ModalAboutUs open={open} setOpen={setOpen} />
      <ModalToken open={openModalToken} setOpen={setModalToken} />
    </>
  );
}

export default HeaderLPMobile;

/*     <header className={styles.header}>
      <div className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src={Logo} alt="SoulPrime Logo" />
          </Link>
        </div>
        <nav className={styles.navLinks}>

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
            <button type="button" className={styles.buttonAcess} onClick={ClickLogin}>
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
    </header> */
