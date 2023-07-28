/* eslint-disable react/prop-types */
import { Box, Modal } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import IconQuestion from '../../assets/Icons/IconQuestion.svg';
import styles from '../../styles/Advertising/Payment/PaymentAds.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '599px',
  height: '366px',
  bgcolor: '#FFFFFF',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};
function ModalAds({ open, handleClose }) {
  const { t } = useTranslation();
  const [textAds, setTextAds] = useState('');
  const navigate = useNavigate();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal do título do anúncio."
      aria-describedby="Modal para você escrever o nome do seu anúncio."
    >
      <Box sx={style}>
        <div className={styles.modalContainer}>
          <h2>
            {t('paymentAds-modal-title-ads')}
          </h2>

          <input value={textAds} onChange={(e) => setTextAds(e.target.value)} type="text" placeholder="Campanha Promocional #1" />
          <div className={styles.modalFormQuestion}>
            <img src={IconQuestion} alt="Icone de uma interrogação" />
            <p>
              {' '}
              {t('paymentAds-modal-paragraph-ads')}
            </p>
          </div>
        </div>
        <div className={styles.modalButton}>
          <button onClick={handleClose} className={styles.modalButtonExit} type="button">Cancelar</button>
          <button onClick={() => navigate('/published')} className={styles.modalButtonAds} type="button">{t('paymentAds-modal-button-ads')}</button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAds;
