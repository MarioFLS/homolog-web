import { useNavigate, useParams } from 'react-router';

import { useContext, useEffect, useState } from 'react';

import { Box, Modal } from '@mui/material';

import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import axios from "../interceptors/axiosConfig";
import IconQuestion from '../assets/Icons/IconQuestion.svg';
import HeaderMain from '../components/Headers/HeaderMain';
import ChevronLeft from '../assets/ChevronLeft.svg';
import SectionInfoAds from '../components/Advertising/AdsId/SectionInfoAds';
import SectionChart from '../components/Advertising/AdsId/SectionChart';
import styles from '../styles/Advertising/Id/Ads.module.css';
import IconEdit from '../assets/Icons/IconEdit.svg';
import { getAdsOfUserById } from '../helpers/getAds';
import AppContext from '../Context/AppContext';
import getSecureLocalStorage from '../helpers/getSecureLocalStorage';

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 541,
  height: 360,
  bgcolor: '#FFFFFF',
  borderRadius: '24px',
  boxShadow: 24,
  p: 4,
};
function Ads() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [ad, setAd] = useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const { userHeader } = useContext(AppContext);

  const findAds = async () => {
    try {
      await getAdsOfUserById(userHeader, setAd, id, t);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
  };
  useEffect(() => {
    findAds();
  }, [userHeader]);

  const editAds = async () => {
    try {
      const infoUser = await getSecureLocalStorage();
      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      await axios.put(
        `${baseUrl}/ads/update`,
        { id, title, link: ad.link },
        { headers },
      );
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
  };
  return (
    <>
      <HeaderMain />
      {ad?.id ? (
        <div className={styles.containerMain}>
          <main className={styles.mainAds}>
            <header className={styles.headerAds}>
              <nav>
                <button onClick={() => navigate('/advertising')} type="button">
                  <img src={ChevronLeft} alt="Seta para esquerda" />
                  <p>Anúncios</p>
                </button>
              </nav>
              <button onClick={handleOpen} type="button">
                <h1>{`Campanha Promocional #${ad?.title}`}</h1>
                <img src={IconEdit} alt="Icone de um lapís, mostra que serve para editar o anúncio" />
              </button>
            </header>
            <div className={styles.containerSections}>
              <SectionInfoAds ad={ad} />
              <SectionChart ad={ad} />
            </div>
          </main>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="model-ads"
            aria-describedby="modal-edit-ads-description"
          >
            <Box sx={style}>
              <div className={styles.modalEdit}>
                <div className={styles.modalEditText}>
                  <h3>Escolha um título para seu anúncio</h3>
                  <input
                    type="text"
                    // value={title}
                    onChange={({ target }) => (setTitle(target.value))}
                    placeholder={`Campanha Promocional #${ad?.title}`}
                  />
                  <div>
                    <img src={IconQuestion} alt="Icone de interogação" />
                    <p>Este título é apenas uma forma de identificação, só você pode visualiza-lo.</p>
                  </div>
                </div>
                <div className={styles.modalEditButton}>
                  <button className={styles.buttonCancel} onClick={handleClose} type="button">
                    Cancelar
                  </button>
                  <button className={styles.buttonSave} onClick={editAds} type="button">
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      ) : null}

    </>
  );
}

export default Ads;
