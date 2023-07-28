import { useContext } from "react";
import { useTranslation } from "react-i18next";
import copy from 'copy-to-clipboard';
import AppContext from "../../../Context/AppContext";
import IconSuccess from "../../../assets/Icons/IconSuccess.svg";
import IconCopyRose from "../../../assets/Icons/IconCopyRose.svg";
import IconDownloadRose from "../../../assets/Icons/IconDownloadRose.svg";
import IconClockDollar from "../../../assets/Icons/IconClockDollar.svg";
import styles from "../../../styles/Advertising/Payment/FormsPayment/PayBoletoForms/PayBoletoForms.module.css";

function PayBoletoForms({ nextForm }) {
  const { t } = useTranslation();
  const { infoBoleto } = useContext(AppContext);

  const copyCode = () => {
    copy(infoBoleto.identification);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://faturas.iugu.com/2330f813-34be-441f-8956-62911b20f94f-44a3.pdf';
    link.target = '_blank';
    link.download = 'nome-do-arquivo.pdf';
    link.click();
  };

  return (
    <form className={styles.containerForm}>
      <div className={styles.containerMainForm}>
        <div className={styles.containerInfoBoleto}>
          <div className={styles.containerGenerateBillet}>
            <h5>Boleto gerado</h5>
            <img src={IconSuccess} alt="" />
          </div>
          <section>
            <div className={styles.infoBoleto}>
              <p>copie o código ou imprima o boleto</p>
              <div className={styles.containerBarCode}>
                <input type="text" value={infoBoleto.identification} readOnly />
                <button type="button" onClick={copyCode}>
                  <img src={IconCopyRose} alt="Icone de Copiar" />
                </button>

                <button onClick={handleDownload} type="button">
                  <img src={IconDownloadRose} alt="Icone de fazer Download" />
                </button>
                {/*  <a href={infoBoleto.pdf} target="_blank" download="Fatura Iugu" rel="noreferrer" /> */}

              </div>
            </div>
            <div className={styles.containerDateClock}>
              <img src={IconClockDollar} alt="Icone Relogio com Icone Dolar" />
              <p>O prazo para aprovação do pagamento do boleto é de 1 dia útil.</p>
            </div>
          </section>
        </div>

      </div>
      <button onClick={nextForm} className={styles.btnNext} type="button">{t('button-continue')}</button>
    </form>
  );
}

export default PayBoletoForms;
