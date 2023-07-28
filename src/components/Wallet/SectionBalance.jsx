/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconMBRLCoin from '../../assets/Icons/IconMBRLCoin.svg';
import IconPRT from '../../assets/Icons/IconPRT.png';
import EyeViewsPink from '../../assets/EyeViewsPink.svg';
import styles from '../../styles/Wallet/SectionBalance/SectionBalance.module.css';
import AppContext from '../../Context/AppContext';

// eslint-disable-next-line no-unused-vars, react/prop-types
function SectionBalance() {
  const {
    globalInfoUser: {
      coin,
    },
  } = useContext(AppContext);
  const { t } = useTranslation();
  const [isPasswordPRT, setIsPasswordPRT] = useState(true);
  const [isPasswordView, setIsPasswordView] = useState(true);
  return (
    <section className={styles.sectionBalance}>
      <div className={styles.TextBalance}>
        <h2>{t("wallet-balance")}</h2>
      </div>
      <article className={styles.articleBalance}>
        <div className={styles.topBalance}>
          <div className={styles.topBalanceText}>
            <img src={IconPRT} alt="Icone do PRT" />
            <p>PRT Token</p>
            <p>{coin?.name}</p>
          </div>
          <div className={styles.topBalanceValues}>
            <input type={isPasswordPRT ? 'password' : 'text'} readOnly value={isPasswordPRT ? '0.00000' : "0.00"} />
            <button onClick={() => setIsPasswordPRT(!isPasswordPRT)} type="button">
              <img src={EyeViewsPink} alt="Icone de Vizualização" />
            </button>
          </div>
        </div>
        <div className={styles.topBalance}>
          <div className={styles.topBalanceText}>
            <img src={IconMBRLCoin} alt="Icone do MBRL Coin" />
            <p>MBRL Coin</p>
          </div>
          <div className={styles.topBalanceValues}>
            <input type={isPasswordView ? 'password' : 'text'} readOnly value={isPasswordView ? '0.00000' : coin} />
            <button onClick={() => setIsPasswordView(!isPasswordView)} type="button">
              <img src={EyeViewsPink} alt="Icone de Vizualização" />
            </button>

          </div>
        </div>
      </article>
    </section>
  );
}

export default SectionBalance;
