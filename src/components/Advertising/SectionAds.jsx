import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import ChevronLeft from '../../assets/ChevronLeft.svg';
import styles from '../../styles/Advertising/SectionAds/SectionAds.module.css';
import AppContext from '../../Context/AppContext';
import MomentsCategoriaPreview from '../../assets/MomentsCategoriaPreview.png';

function SectionAds() {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { newAds, setNewAds } = useContext(AppContext);

  useEffect(() => {
    fetch(`${baseUrl}/categories`)
      .then((response) => response.json().then((data) => {
        setCategories(data);
        const firstCategories = data[0].id;
        setNewAds({ ...newAds, adsCategory: firstCategories });
      }));
  }, []);


  const handleButton = (event) => {
    event.preventDefault();
    if (newAds.adsTitle.trim().length < 3) {
      return;
    }
    // return navigate('/advertising/new/goals');
    return navigate('/advertising/new/choices_ad');
  };

  return (
    <form className={styles.sectionAds}>
      <section className={styles.sectionCreateAds}>
        <div className={styles.containerAds}>
          <div className={styles.containerAdsInput}>
            <h3>{t('sectionAds-ads-forms-title')}</h3>
            <input
              value={newAds.adsTitle}
              onChange={({ target }) => setNewAds({ ...newAds, adsTitle: target.value })}
              type="text"
              placeholder="Digite o nome da campanha"
            />
          </div>
          <div className={styles.containerAdsInput}>
            <h3>{t("sectionAds-ads-forms-title-h3")}</h3>
            <select
              value={newAds.adsCategory}
              onChange={({ target }) => setNewAds((prev) => ({ ...prev, adsCategory: target.value }))}
              type="text"
              placeholder={t("sectionAds-ads-container-select-placeholder")}
            >
              {categories.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.containerAdsInput}>
            <h3>{t('sectionAds-ads-container-title-h3')}</h3>
            <RadioGroup
              name="radio-buttons-group"
            >
              <FormControlLabel
                control={(
                  <Radio
                    checked={!newAds.adultOnly}
                    onClick={() => setNewAds((prev) => ({ ...prev, adultOnly: false }))}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label="Para todos os públicos"
              />
              <FormControlLabel
                control={(
                  <Radio
                    checked={newAds.adultOnly}
                    onClick={() => setNewAds((prev) => ({ ...prev, adultOnly: true }))}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label="Para adultos (+ 18 anos)"
              />
            </RadioGroup>
          </div>
        </div>
        <div>
          <img src={MomentsCategoriaPreview} alt="Imagem do Momments mudando a categória." />
        </div>
      </section>

      <div className={styles.sectionAdsAdsButton}>
        <button
          className={styles.buttonReturn}
          type="button"
          onClick={() => navigate('/advertising')}
        >
          <img src={ChevronLeft} alt="Seta para a esquerda" />
          <span>{t('sectionAds-ads-button-return')}</span>
        </button>
        <button
          type="submit"
          disabled={newAds.adsTitle.trim().length < 3}
          onClick={handleButton}
        >
          {t('sectionAds-ads-button-continue')}
        </button>
      </div>
    </form>
  );
}

export default SectionAds;
