import {
  Accordion, AccordionDetails, AccordionSummary, FormControl, FormControlLabel, Radio, RadioGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import IconLanguage from '../../assets/Icons/IconLanguage.svg';
import styles from '../../styles/Header/AccordionLanguage/AccordionLanguage.module.css';

function AccordionLanguage() {
  const { i18n, t } = useTranslation();
  const [isLanguage, setLanguage] = useState('');

  const changeLanguageHandler = ({ target }) => {
    localStorage.setItem('language', target.value);
    i18n.changeLanguage(target.value);
    setLanguage(target.value);
  };

  useEffect(() => {
    const linguageStorage = localStorage.getItem('language');
    if (!linguageStorage) {
      setLanguage('pt');
    } else {
      setLanguage(linguageStorage);
    }
  }, []);
  return (
    <section className={styles.sectionMain}>
      <Accordion className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={styles.accordionSummary}
        >
          <div className={styles.title}>
            <img src={IconLanguage} alt="Icone de Linguagem" />
            <h1>{t('headerMain-popover-config-language')}</h1>
          </div>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDefatils}>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="pt"
                control={(
                  <Radio
                    // eslint-disable-next-line no-unneeded-ternary
                    checked={isLanguage === 'pt' ? true : false}
                    onClick={changeLanguageHandler}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label="Português (BR)"
              />
              <FormControlLabel
                value="en-us"
                control={(
                  <Radio
                    checked={isLanguage === 'en-us'}
                    onClick={changeLanguageHandler}
                    sx={{
                      color: '#BA02CA',
                      '&.Mui-checked': {
                        color: '#BA02CA',
                      },
                    }}
                  />
)}
                label="Inglês (US)"
              />
            </RadioGroup>
          </FormControl>

        </AccordionDetails>
      </Accordion>

    </section>
  );
}

export default AccordionLanguage;
