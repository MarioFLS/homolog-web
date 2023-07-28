/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import {
  Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from "../../interceptors/axiosConfig";
import IconUsers from '../../assets/Icons/IconUsers.svg';
import IconClose from '../../assets/Icons/IconClose.svg';
import IconDate from '../../assets/Icons/IconDate.svg';
import IconStar from '../../assets/Icons/IconStar.svg';
import EyeViewsPink from '../../assets/EyeViewsPink.svg';

import styles from '../../styles/Adm/ModalAd/ModalAd.module.css';
import checkUserToken from '../../helpers/checkUserToken';
import getSecureLocalStorage from '../../helpers/getSecureLocalStorage';

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '525px',
  padding: "60px 0px",
  bgcolor: '#FFFFFF',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  zIndex: 10,
};

const converteDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();
  return `${day}/${month}/${year}`;
};

function ModalAd({
  open, handleClose, ad, funcAds: { setPagesNumber, setAdsData, page }, typeAds,
}) {
  const [inputDisapproval, setInputDisapproval] = useState("");
  const [adStatus, setAdStatus] = useState(ad.status);

  useEffect(() => {
    setAdStatus(ad.status);
  }, [ad]);

  const approverAds = async (is_reprove) => {
    checkUserToken();
    const infoUser = await getSecureLocalStorage();
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    handleClose();
    if (is_reprove) {
      await axios.post(`${baseUrl}/user/send_disapproval_mail`, { user_id: ad.user_id, message: inputDisapproval.trim() }, { headers });
      setInputDisapproval("");
    }
    await axios.post(`${baseUrl}/adm/ads/approver`, { ad_id: ad.id, is_reprove }, { headers });
    const { data: { ads, pages_number } } = await axios.post(`${baseUrl}/adm/ads/all`, { page }, { headers });
    setPagesNumber(pages_number);
    setAdsData(ads);
  };


  const getStatusPayment = async () => {
    const infoUser = await getSecureLocalStorage();
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    const response = await axios.get(`${baseUrl}/integration/get_payment`, { headers, params: { order_number: ad.order_number } });
    if (response?.data.status) {
      const { status } = response.data;
      Swal.fire({
        position: 'top-end',
        icon: status === "paid" ? 'success' : 'info',
        title: `O anúncio está em: ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
      setAdStatus(status);
      return status;
    }
  };

  return (
    <Modal
      sx={{ zIndex: '900' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal do título do anúncio."
      aria-describedby="Modal para você escrever o nome do seu anúncio."
    >
      <Box sx={style}>
        <div className={styles.modalContainer}>
          <div className={styles.modalContainerMain}>
            <header>
              <div className={styles.containerTitle}>
                <h2>
                  {ad.title}
                </h2>
                <button type="button" onClick={handleClose}>
                  <img src={IconClose} alt="Icone para fechar o modal" />
                </button>
              </div>
              <div className={styles.containerInfo}>
                <div>
                  <img src={IconUsers} alt="Icone de usuários" />
                  <p>{ad.user}</p>
                </div>
                <div>
                  <img src={IconDate} alt="Icone de calendário" />
                  <p>{converteDate(ad.createdAt)}</p>
                </div>
                <div>
                  <img src={EyeViewsPink} alt="Icone de Estrela" />
                  <p>
                    {ad.tokens_views}
                  </p>
                </div>
                <div>
                  <img src={IconStar} alt="Icone de Estrela" />
                  {" "}
                  <p>
                    {ad.soul_ads ? "ADM" : "Anuncíador"}
                  </p>
                </div>
              </div>
            </header>

            <div className={styles.containerEdit}>
              <div className={styles.containerImage}>
                <video width="400px" controls preload="metadata">
                  <source src={ad.content} type="video/mp4" />
                  <source src={ad.content} type="video/webm" />
                </video>
              </div>
              {typeAds === 1 ? (
                <>
                  {
                    ad.status
                      ? (
                        <TableContainer component={Paper}>
                          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                            <TableHead>
                              <TableRow>
                                <TableCell> Valor (EM DOLAR):</TableCell>
                                <TableCell align="center">Token Views</TableCell>
                                <TableCell align="center"> Status:</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow
                                key={ad.amount}
                                // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                              >
                                <TableCell component="th" scope="row">
                                  $
                                  {' '}
                                  {ad.amount}
                                </TableCell>
                                <TableCell align="center">
                                  VIEWS:
                                  {' '}
                                  {parseFloat(ad.amount) / 0.05}
                                </TableCell>
                                <TableCell align="center">
                                  {' '}
                                  {adStatus}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      )
                      : <h3>SEM ORDEM DE PAGAMENTO</h3>
                  }
                  <div>
                    <Button color="success" variant="contained" type="button" onClick={getStatusPayment}>
                      Ver Status do Pagamento
                    </Button>
                  </div>
                  <div className={styles.inputDisapproval}>
                    <TextField
                      label="Menssagem de desaprovação."
                      id="filled-size-small"
                      variant="filled"
                      sx={{ width: "100%" }}
                      value={inputDisapproval}
                      onChange={({ target }) => setInputDisapproval(target.value)}
                    />
                  </div>
                  <div className={styles.modalApproveButton}>
                    <button
                      className={styles.buttonCancel}
                      onClick={() => approverAds(true)}
                      disabled={inputDisapproval.length <= 5}
                      type="button"
                    >
                      Reprovar
                    </button>
                    <button
                      className={styles.buttonApprove}
                      onClick={() => approverAds(false)}
                      type="button"
                    >
                      Aprovar
                    </button>
                  </div>
                </>
              ) : null}
            </div>

          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAd;
