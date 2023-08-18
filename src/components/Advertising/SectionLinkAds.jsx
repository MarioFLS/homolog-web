import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import AppContext from "../../Context/AppContext";
import MomentsBotãoctaPreview from '../../assets/MomentsBotãoctaPreview.png';
import styles from '../../styles/Advertising/SectionLinkAds/SectionLinkAds.module.css';
import ChevronLeft from '../../assets/ChevronLeft.svg';

function SectionLinkAds() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { newAds, setNewAds } = useContext(AppContext);

  const isLink = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+|^www\.[^ "]+\.[^ "]+$/;

    if (regex.test(url)) {
      return false;
    }
    return true;
  };

  const handleButton = (event) => {
    event.preventDefault();
    if (isLink(newAds.link)) {
      return;
    }
    return navigate('/advertising/new/goals');
  };


  return (
    <form className={styles.sectionAds}>
      <section className={styles.sectionCreateAds}>
        <div className={styles.containerAds}>
          <div className={styles.containerAdsInput}>
            <h3>{t("selectLink-title")}</h3>
            <input
              value={newAds.link}
              onChange={({ target }) => setNewAds({ ...newAds, link: target.value })}
              type="text"
              placeholder="Digite o endereço de direcionamento"
            />
          </div>
          <div className={styles.containerAdsInput}>
            <h3>{t('selectLink-button-title')}</h3>
            <RadioGroup
              name="radio-buttons-group"
            >
              <FormControlLabel
                control={(
                  <Radio
                    checked={newAds.buttonType === 3}
                    onClick={() => setNewAds((prev) => ({ ...prev, buttonType: 3 }))}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label={t("selectLink-button-one")}
              />
              <FormControlLabel
                control={(
                  <Radio
                    checked={newAds.buttonType === 2}
                    onClick={() => setNewAds((prev) => ({ ...prev, buttonType: 2 }))}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label={t("selectLink-button-two")}
              />
              <FormControlLabel
                control={(
                  <Radio
                    checked={newAds.buttonType === 1}
                    onClick={() => setNewAds((prev) => ({ ...prev, buttonType: 1 }))}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label={t("selectLink-button-three")}
              />
            </RadioGroup>
          </div>
        </div>
        <div>
          <img src={MomentsBotãoctaPreview} alt="Imagem do Momments mudando a categória." />
        </div>
      </section>

      <div className={styles.sectionAdsAdsButton}>
        <button
          className={styles.buttonReturn}
          type="button"
          onClick={() => navigate('/advertising/new')}
        >
          <img src={ChevronLeft} alt="Seta para a esquerda" />
          <span>{t('sectionAds-ads-button-return')}</span>
        </button>
        <button
          type="submit"
          disabled={isLink(newAds.link)}
          onClick={handleButton}
        >
          {t('sectionAds-ads-button-continue')}
        </button>
      </div>
    </form>
  );
}

export default SectionLinkAds;
