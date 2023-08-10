import { useTranslation } from 'react-i18next';
import IconInstagramRose from '../../assets/IconsSocialNetwork/IconInstagramRose.svg';
import IconTikTokRose from '../../assets/IconsSocialNetwork/IconTikTokRose.svg';
import IconTwitterRose from '../../assets/IconsSocialNetwork/IconTwitterRose.svg';
import IconDiscordRose from '../../assets/IconsSocialNetwork/IconDiscordRose.svg';
import IconLikedinRose from '../../assets/IconsSocialNetwork/IconLikedinRose.svg';
import styles from '../../styles/RewardLearnAndEarn/RewardLearnAndEarnFooter/RewardLearnAndEarnFooter.module.css';

function RewardLearnAndEarnFooter() {
  const { t } = useTranslation();


  return (
    <footer className={styles.footerLearnAndEarn}>
      <h3 id={styles.bigTitle}>©2023 SoulPrime. Todos os direitos reservados.</h3>
      <h3 id={styles.smallTitle}>©2023 SoulPrime.</h3>
      <div className={styles.containerLinks}>
        <a
          href="https://drive.google.com/file/d/15m_menpZ5QQXr9_ZEnnG0XlBb7Eha6bg/view"
          target="_blank"
          rel="noreferrer"
        >
          FAQ
        </a>
        <a
          href="https://drive.google.com/file/d/1a8JG_watpoGSoJqggyJxdxBH3U8xVo_r/view"
          target="_blank"
          rel="noreferrer"
        >
          {t('terms-of-use')}
        </a>
        <a
          href="http://www.soulprime.io/Politica_de_Privacidade_SoulPrime.pdf"
          rel="noreferrer"
        >
          {t('privacy policy')}
        </a>
      </div>
      <div>
        <a href="https://www.instagram.com/soulprimeoficial/" target="_blank" rel="noopener noreferrer">
          <img src={IconInstagramRose} alt="Icone do Instagram na cor rosa" />
        </a>
        <a href="https://www.tiktok.com/@soulprimeoficial" target="_blank" rel="noopener noreferrer">
          <img src={IconTikTokRose} alt="Icone do TikTok na cor rosa" />
        </a>
        <a href="https://twitter.com/SoulPrime_io" target="_blank" rel="noopener noreferrer">
          <img src={IconTwitterRose} alt="Icone do Twitter na cor rosa" />
        </a>
        <a href="https://discord.com/invite/UwAUEU4gNb" target="_blank" rel="noopener noreferrer">
          <img src={IconDiscordRose} alt="Icone do Discord na cor rosa" />
        </a>
        <a href="https://www.linkedin.com/company/soulprimeio" target="_blank" rel="noopener noreferrer">
          <img src={IconLikedinRose} alt="Icone do Linkedin na cor rosa" />
        </a>
      </div>
    </footer>
  );
}

export default RewardLearnAndEarnFooter;
