/* eslint-disable react/prop-types */
import CurrencyInput from 'react-currency-input-field';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import IconUsersGray from "../../../assets/Icons/IconUsersGray.svg";
// import IconPix from '../../../assets/Icons/IconPix.png';
import IconCreditCardRose from '../../../assets/Icons/IconCreditCardRose.svg';
import IconBarcodeRose from '../../../assets/Icons/IconBarcodeRose.svg';
import IconArrowsLeftRight from "../../../assets/Icons/IconArrowsLeftRight.svg";
import styles from '../../../styles/Advertising/Payment/FormsPayment/BaseForms/BaseForms.module.css';
import AppContext from '../../../Context/AppContext';

function BaseForms({ props }) {
  const { t } = useTranslation();
  const {
    typePayment, setTypePayment, nextForm,
  } = props;
  const { newAds, setNewAds } = useContext(AppContext);
  const [USDCoin, setUSDCoin] = useState("0");
  const [BRLCoin, setBRLCoin] = useState("0");
  const [viewsUser, setViewsUser] = useState(0);
  const [quotationDolar, setQuotationDolar] = useState("");

  useEffect(() => {
    const dollarQuotation = async () => {
      const response = await (await fetch("https://economia.awesomeapi.com.br/last/USD-BRL")).json();
      const USD = parseFloat(response.USDBRL.ask);
      setQuotationDolar(parseFloat(Math.round(USD * 100) / 100));
    };
    dollarQuotation();
  }, []);

  const handleWiews = (value) => {
    const viewsValue = Number(value);
    setViewsUser(viewsValue);
    const views = (viewsValue * 0.05);
    setUSDCoin(views.toFixed(2));
    setBRLCoin((views * quotationDolar).toFixed(2));
    return views;
  };

  const handleUSDValue = (value) => {
    const valueAds = value.split("").includes(",") ? parseFloat(value.replace(',', '.')) : 0;
    setBRLCoin((valueAds * quotationDolar).toFixed(2));
    setUSDCoin(value);
    setViewsUser(Math.floor(valueAds / 0.05));
  };

  const handleBRLValue = (value) => {
    const valueAds = value.split("").includes(",") ? parseFloat(value.replace(',', '.')) : 0;
    setBRLCoin(value);
    const USD = (valueAds / quotationDolar);
    setUSDCoin(USD.toFixed(2));
    setViewsUser(Math.floor(USD / 0.05));
  };

  useEffect(() => {
    const valueAdsUSD = parseFloat(USDCoin.replace(',', '.'));
    const valueAdsBRL = parseFloat(BRLCoin.replace(',', '.'));
    setNewAds({
      ...newAds, price: valueAdsBRL, priceInDollar: valueAdsUSD,
    });
  }, [USDCoin, quotationDolar]);

  return (
    <form className={styles.containerForm}>
      <div className={styles.containerMainForm}>
        <div className={styles.containerTextPayment}>
          <h2>{t('baseForms-title')}</h2>
          <div>
            <button
              type="button"
              onClick={() => setTypePayment('boleto')}
              className={styles.containerIcons}
              id={typePayment === 'boleto' ? styles.selectedPayment : null}
            >
              <img src={IconBarcodeRose} alt="Icone do Boleto" />
              <p>Boleto</p>
            </button>
            <button
              onClick={() => setTypePayment('card')}
              type="button"
              className={styles.containerIcons}
              id={typePayment === 'card' ? styles.selectedPayment : null}
            >
              <img src={IconCreditCardRose} alt="Icone do Pix" />
              <p>{t('baseForms-button-card')}</p>
            </button>
          </div>
        </div>
        <div className={styles.containerFormLabel}>
          <label htmlFor="value">
            <p>{t("baseForms-paragraph-value")}</p>
          </label>
          <div className={styles.containerInputValue}>
            <div className={styles.containerFormInput}>
              <div className={styles.containerCurrency}>
                <p>BRL</p>
              </div>

              <CurrencyInput
                name="value"
                id="value"
                decimalScale={2}
                decimalsLimit={2}
                type="text"
                value={BRLCoin}
                defaultValue={0}
                maxLength={100000}
                onValueChange={(value) => handleBRLValue(value)}
                className={styles.containerInput}
              />
            </div>
            <img src={IconArrowsLeftRight} alt="Icone de duas setas, cada uma apontando pra um lado." />
            <div className={styles.containerFormInput}>
              <div className={styles.containerCurrency}>
                <p>USD</p>
              </div>

              <CurrencyInput
                name="value"
                id="value"
                decimalScale={2}
                decimalsLimit={2}
                type="text"
                value={USDCoin}
                defaultValue={0}
                maxLength={100000}
                onValueChange={(value) => handleUSDValue(value)}
                className={styles.containerInput}
              />
            </div>


          </div>
        </div>
        <div className={styles.containerViews}>
          <label htmlFor="token">
            <p>{t("baseForms-views-paragraph")}</p>
          </label>
          <div className={styles.containerInputViews}>
            <img src={IconUsersGray} alt="Imagem de usuários" />
            <input
              type="text"
              value={viewsUser}
              onChange={({ target }) => handleWiews(target.value)}
            />
          </div>
        </div>
      </div>
      <button disabled={!newAds.file || !viewsUser} className={styles.btnNext} onClick={nextForm} type="button">{t('button-continue')}</button>
    </form>
  );
}

export default BaseForms;
