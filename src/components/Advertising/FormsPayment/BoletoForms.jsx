/* eslint-disable react/prop-types */

import { useTranslation } from 'react-i18next';
import { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import secureLocalStorage from 'react-secure-storage';
import { CircularProgress, Stack } from '@mui/material';
import styles from '../../../styles/Advertising/Payment/FormsPayment/BoletoForms/BoletoForms.module.css';
import AppContext from '../../../Context/AppContext';
import createAds from '../../../helpers/createAds';
import getSecureLocalStorage from '../../../helpers/getSecureLocalStorage';
import axios from "../../../interceptors/axiosConfig";
import { maskNIF } from "../../../helpers/masks";
import { validaCPF, validarCNPJ } from '../../../helpers/validateCPFAndCNPJ';

function BoletoForms({ nextForm }) {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const { t } = useTranslation();
  const {
    newAds, userHeader, globalInfoUser, setInfoBoleto,
  } = useContext(AppContext);
  const [cig, setCig] = useState('');
  const [send, setSend] = useState(true);


  const generatePay = async () => {
    const { accessToken } = await getSecureLocalStorage();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    try {
      const responseCreateAds = await createAds(newAds, userHeader, Swal, t, setSend);
      const adId = responseCreateAds.data.id;
      const { jobId } = responseCreateAds.data;
      const infoUserCredit = secureLocalStorage.getItem("user_information_session") || globalInfoUser.email;
      const response = await axios.post(`${baseUrl}/integration/bank_slip`, {
        price_cents: Number((newAds.price * 100).toFixed(0)),
        email: infoUserCredit?.email?.trim() || globalInfoUser.email,
        ad_id: adId,
        jobId,
        amount: newAds.priceInDollar,
        cig: cig?.replace(/\D/g, "").trim(),
        name: globalInfoUser.username,

      }, { headers });

      setInfoBoleto(response.data);
      if (!responseCreateAds?.error) {
        return nextForm();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: t("alert-generic-text"),
        text: t(error?.response?.data?.error),
      });
      return setSend(true);
    }
  };

  const clickButton = async (event) => {
    try {
      event.preventDefault();
      setSend(false);
      await generatePay();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Algo deu errado... mas vamos resolver! Tente novamente!",
        text: "Erro na compra do ADS",
      });
      setSend(true);
    }
  };


  return (
    <form className={styles.containerForm}>
      <div className={styles.containerMainForm}>
        <div className={styles.containerInputs}>
          <label htmlFor="input-name-boleto">
            <p>Nome</p>
            <input id="input-name-boleto" type="text" readOnly value={userHeader.nickname} />
          </label>
          <label htmlFor="input-email-boleto">
            <p>E-mail</p>
            <input id="input-email-boleto" type="text" readOnly value={userHeader.email} />
          </label>
          <label htmlFor="input-cig-boleto">
            <p>CPF ou CNPJ</p>
            <input
              id="input-cig-boleto"
              type="text"
              onChange={({ target }) => setCig(target.value)}
              value={maskNIF(cig)}
              maxLength={18}
              max={18}
            />
          </label>

        </div>
      </div>

      {send
        ? (
          <button
            disabled={!validaCPF(cig) && !validarCNPJ(cig)}
            onClick={clickButton}
            className={styles.btnNext}
            type="button"
          >
            {t('button-continue')}
          </button>
        ) : (
          <Stack
            sx={{
              color: 'grey.500',
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            spacing={2}
            direction="row"
          >
            <CircularProgress color="secondary" />
          </Stack>
        )}
    </form>
  );
}

export default BoletoForms;
