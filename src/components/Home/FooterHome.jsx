import styles from '../../styles/Home/Footer.module.css';

function FooterHome() {
  return (
    <footer className={styles.footer}>
      <div>
        <h6>©2023 SoulPrime</h6>
      </div>
      <div className={styles.footerLinks}>
        <a href="https://drive.google.com/file/d/1a8JG_watpoGSoJqggyJxdxBH3U8xVo_r/view" target="_blank" rel="noreferrer">Termos de Uso</a>
        <a
          href="http://www.soulprime.io/Politica_de_Privacidade_SoulPrime.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Política de Privacidade
        </a>
        <a href="https://drive.google.com/file/d/1OuncjxFlgGULAqdy4YgCid_Z39DqqB4Y/view" target="_blank" rel="noreferrer">FAQ</a>
      </div>
    </footer>
  );
}

export default FooterHome;
