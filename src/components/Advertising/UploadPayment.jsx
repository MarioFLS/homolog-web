import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { Box, LinearProgress, ThemeProvider } from "@mui/material";
import AppContext from "../../Context/AppContext";
import IconInfoCircle from '../../assets/Icons/IconInfoCircle.svg';
import IconUpload from "../../assets/Icons/IconUpload.svg";
import IconUploadDisabled from "../../assets/Icons/IconUploadDisabled.svg";
import IconFileUpload from '../../assets/Icons/IconFileUpload.svg';
import IconFileUploadSuccess from '../../assets/Icons/IconFileUploadSuccess.svg';
import IconX from '../../assets/Icons/IconX.svg';
import ChevronLeft from '../../assets/ChevronLeft.svg';
import styles from '../../styles/Advertising/UploadPayment/UploadPayment.module.css';
import themeMain from "../../theme/themeMaterialUI";

function UploadPayment() {
  const { newAds, setNewAds } = useContext(AppContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [inputValue, setInputValue] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 25;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const sizeUpload = (size) => {
    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)}KB`;
    }
    return `${(size / (1024 * 1024)).toFixed(2)}MB`;
  };
  return (
    <div className={styles.containerPaymentAds}>
      <div className={styles.containerPaymentUploadMain}>
        <header className={styles.containerPaymentText}>
          <h1>{t('paymentAds-header-text')}</h1>
        </header>
        <div className={styles.containerPaymentUpload}>
          <div className={styles.containerUpload}>
            <div className={styles.containerTextUpload}>
              <img
                className={newAds.file ? styles.iconUpload : null}
                src={!newAds.file ? IconUpload : IconUploadDisabled}
                alt="Icone de uma nuvem, simbolizando o ato de upload."
              />
              <p>{t("paymentAds-text-paragraph")}</p>
            </div>
            <button disabled={newAds.file} type="button">{t("paymentAds-button-text")}</button>
            <input
              type="file"
              accept="video/*"
              disabled={newAds.file}
              className={styles.inputUpload}
              value={inputValue}
              onChange={({ target }) => {
                setInputValue(target.value);
                const file = target.files[0];
                setNewAds({ ...newAds, file });
              }}
            />
          </div>
          <div className={styles.containerInformationUpload}>
            <img src={IconInfoCircle} alt="Icone de informação" />
            <p>
              <b>{t("paymentAds-paragraph-three-b")}</b>
              {' '}
              {t("paymentAds-text-format")}
            </p>
          </div>
        </div>
      </div>
      {newAds.file ? (
        <section className={styles.sectionLoadedAds}>
          <header>
            <h2>Anúncio adicionado</h2>
          </header>
          {progress !== 100 ? (
            <div className={styles.containerLoadedTitleAds}>
              <div className={styles.containerTitle}>
                <img src={IconFileUpload} alt="Icone de Upload" />
                <div>
                  <p>{newAds.file.name}</p>
                  <Box sx={{ width: '100%' }}>

                    <ThemeProvider theme={themeMain}>
                      <LinearProgress variant="determinate" color="primary" value={progress} />
                    </ThemeProvider>
                  </Box>
                </div>
              </div>
              <div className={styles.containerSizeTitleAds}>
                <p>
                  {sizeUpload(newAds.file.size)}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setProgress(0);
                    setInputValue("");
                    setNewAds({ ...newAds, file: "" });
                  }}
                >
                  <img src={IconX} alt="Icone de X" />
                </button>
              </div>
            </div>
          )
            : (
              <div className={styles.containerLoadedSuccess}>
                <div className={styles.containerTitle}>
                  <img src={IconFileUploadSuccess} alt="Icone de Upload" />
                  <div>
                    <p>{newAds.file.name}</p>
                    <p className={styles.succesUploadParagraph}>{t("paymentAds-container-loaded")}</p>
                  </div>
                </div>
                <div className={styles.containerSizeTitleAds}>
                  <p>
                    {sizeUpload(newAds.file.size)}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setProgress(0);
                      setInputValue("");
                      setNewAds({ ...newAds, file: "" });
                    }}
                  >
                    <img src={IconX} alt="Icone de X" />
                  </button>
                </div>
              </div>
            )}
        </section>
      ) : null}
      <div className={styles.buttonReturn}>
        <button
          className={styles.buttonReturn}
          type="button"
          onClick={() => navigate('/advertising/new/goals')}
        >
          <img src={ChevronLeft} alt="Seta para a esquerda" />
          <span>{t('button-return')}</span>
        </button>
      </div>
    </div>
  );
}

export default UploadPayment;
