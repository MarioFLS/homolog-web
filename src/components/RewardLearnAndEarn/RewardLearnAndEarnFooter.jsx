import IconInstagramRose from '../../assets/IconsSocialNetwork/IconInstagramRose.svg';
import IconTikTokRose from '../../assets/IconsSocialNetwork/IconTikTokRose.svg';
import IconTwitterRose from '../../assets/IconsSocialNetwork/IconTwitterRose.svg';
import IconDiscordRose from '../../assets/IconsSocialNetwork/IconDiscordRose.svg';
import IconLikedinRose from '../../assets/IconsSocialNetwork/IconLikedinRose.svg';
import styles from '../../styles/RewardLearnAndEarn/RewardLearnAndEarnFooter/RewardLearnAndEarnFooter.module.css';

function RewardLearnAndEarnFooter() {
  return (
    <footer className={styles.footerLearnAndEarn}>
      <h3>©2023 SoulPrime. Todos os direitos reservados.</h3>
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
