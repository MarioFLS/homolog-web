/* eslint-disable no-undef */
/* eslint-disable react/prop-types */

import { useContext, useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { CircularProgress, Stack } from "@mui/material";
import Swal from "sweetalert2";
import secureLocalStorage from "react-secure-storage";
import axios from "../../../interceptors/axiosConfig";
import AppContext from "../../../Context/AppContext";
import styles from '../../../styles/Advertising/Payment/FormsPayment/CreditCardForms/CreditCardForms.module.css';
import getSecureLocalStorage from "../../../helpers/getSecureLocalStorage";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
const baseBucket = import.meta.env.VITE_APP_BASE_BUCKET;

function CreditCardForms({ nextForm }) {
  const idIugu = import.meta.env.VITE_APP_ID_IUGU;
  const { newAds, userHeader, globalInfoUser } = useContext(AppContext);
  const [send, setSend] = useState(true);
  useEffect(() => {
    Iugu.setAccountID(idIugu);
    // Iugu.setTestMode(true);
    // "4111111111111111"
  }, []);

  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    creditCardNumber: '',
    creditCardCvv: '',
    creditCardExpiration: '',
    creditCardFirstName: '',
    creditCardLastName: '',
  });

  const createAds = async () => {
    const infoUser = await getSecureLocalStorage();
    try {
      const { file } = newAds;
      const { data: { url } } = await axios.get(`${baseUrl}/auth/get_presigned_url`, {
        headers: { Authorization: `Bearer ${infoUser.accessToken}` },
      });
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });

      const imageUrl = url.split("?")[0];

      const imageSplitsTotal = imageUrl.split("/");
      const key = imageSplitsTotal[imageSplitsTotal.length - 1];
      const link = `${baseBucket}/${key}`;
      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      const body = {
        purpose: 1,
        title: newAds.adsTitle,
        author: userHeader.id,
        payment_in_brl: newAds.price,
        payment_amount: newAds.priceInDollar,
        link: newAds.link,
        content: link,
        category: newAds.adsCategory,
        account: userHeader.id,
        adult_only: newAds.adultOnly,
        button_type: newAds.buttonType,
      };
      if (userHeader?.associated) {
        return await axios.post(`${baseUrl}/ads/associate/create`, body, { headers });
      }
      return await axios.post(`${baseUrl}/ads/create`, body, { headers });
    } catch (error) {
      console.log({ ads: error });
      Swal.fire({
        icon: 'error',
        title: t("alert-error-transaction-title"),
        text: t("alert-error-transaction-text"),
        confirmButtonText: t("alert-error-transaction-button"),
      });
      setSend(true);
      return { error: true };
    }
  };

  const inputValue = (target) => {
    const input = target;
    const inputName = input.name;
    if (inputName === "creditCardExpiration") {
      const inputDate = target.value.replace(/\D/g, '');
      const inputValueDate = `${inputDate.slice(0, 2)}/${inputDate.slice(2)}`;
      return setFormData({ ...formData, [inputName]: inputValueDate });
    }
    return setFormData({ ...formData, [inputName]: input.value });
  };

  const generatePay = async (token) => {
    const { accessToken } = await getSecureLocalStorage();

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    };
    try {
      const responseCreateAds = await createAds();
      const adId = responseCreateAds.data.id;
      const { jobId } = responseCreateAds.data;
      const infoUserCredit = secureLocalStorage.getItem("user_information_session") || globalInfoUser.email;
      const payCreditCard = await axios.post(`${baseUrl}/integration/credit_card`, {
        price_cents: Number((newAds.price * 100).toFixed(0)),
        email: infoUserCredit?.email?.trim() || globalInfoUser.email,
        token,
        ad_id: adId,
        jobId,
        amount: newAds.priceInDollar,

      }, { headers });
      console.log({ payCreditCard });
      if (payCreditCard?.data?.success === false) {
        const { status } = response.data;
        if (status === 'unauthorized') {
          Swal.fire({
            icon: 'error',
            title: t("alert-denied-transaction-title"),
            text: t("alert-denied-transaction-text"),
            confirmButtonText: t("alert-denied-transaction-button"),
          });
          setSend(true);
        }
      }
      if (!responseCreateAds?.error) {
        nextForm();
      }
    } catch (error) {
      console.log({ cartao: error });
      Swal.fire({
        icon: 'error',
        title: t("alert-generic-text"),
        text: t(error?.response?.data?.error),
      });
      return setSend(true);
    }
  };

  const clickButton = (event) => {
    try {
      event.preventDefault();
      setSend(false);
      const date = formData.creditCardExpiration.split('/');
      const creditCard = Iugu.CreditCard(
        formData.creditCardNumber,
        date[0],
        date[1],
        formData.creditCardFirstName,
        formData.creditCardLastName,
        formData.creditCardCvv,
      );

      Iugu.createPaymentToken(creditCard, (response) => {
        if (response.errors) {
          Swal.fire({
            icon: 'error',
            title: "Algo deu um passo em falso... mas vamos resolver! Verifique seus dados!",
            text: "Erro na compra! Verifique os dados do seu cartão.",
          });
          return setSend(true);
        }
        return generatePay(response.id);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: "Algo deu um passo em falso... mas vamos resolver! Tente novamente!",
        text: "Erro na compra do ADS",
      });
      setSend(true);
    }
  };

  return (
    <>
      <h2 className={styles.titleForms}>{t('creditCardForms-text-title-one')}</h2>
      <form className={styles.forms} autoComplete="off">

        <div className={styles.containerMainForm}>

          <div className={styles.containerInputs}>
            <label htmlFor="card">
              <span>{t('creditCardForms-label-card')}</span>
              <input
                maxLength={16}
                type="text"
                onChange={({ target }) => inputValue(target)}
                name="creditCardNumber"
                id="card"
                value={formData.creditCardNumber}
                placeholder="000 - 000 - 000 - 000"
                autoComplete="off"
              />
            </label>
            <div className={styles.containerInputsCards}>
              <label className={styles.labelCVV} htmlFor="cvv">
                <span>CVV</span>
                <input
                  onChange={({ target }) => inputValue(target)}
                  name="creditCardCvv"
                  value={formData.creditCardCvv}
                  id="cvv"
                  type="text"
                  placeholder="000"
                  className={styles.containerInputsCVV}
                  autoComplete="off"
                />
              </label>
              <label htmlFor="date">
                <span>{t('creditCardForms-label-date')}</span>
                <input
                  onChange={({ target }) => inputValue(target)}
                  name="creditCardExpiration"
                  value={formData.creditCardExpiration}
                  id="date"
                  type="text"
                  placeholder="MM/DD"
                  autoComplete="off"
                  maxLength={5}
                />
              </label>
            </div>

            <label htmlFor="password">
              {/* <span>{t('creditCardForms-label-password')}</span> */}
              <span>Nome Completo</span>
              <div className={styles.containerNameCard}>
                <input
                  onChange={({ target }) => inputValue(target)}
                  name="creditCardFirstName"
                  value={formData.creditCardFirstName.toUpperCase()}
                  type="text"
                  placeholder="Primeiro Nome"
                  autoComplete="off"
                />
                <input
                  onChange={({ target }) => inputValue(target)}
                  name="creditCardLastName"
                  value={formData.creditCardLastName.toUpperCase()}
                  type="text"
                  placeholder="Sobrenome"
                  autoComplete="off"
                />
              </div>
            </label>
          </div>
        </div>
        {/* <button className={styles.btnNext} onClick={clickButton} type="submit">
          {t('button-continue')}
        </button> */}
        {send
          ? (
            <button className={styles.btnNext} onClick={clickButton} type="submit">
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
    </>
  );
}

export default CreditCardForms;
