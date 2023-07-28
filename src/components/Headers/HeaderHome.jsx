import LogoWithText from '../../assets/LogoWithText.png';
import styles from '../../styles/Header/HeaderHome/Header.module.css';

function HeaderHome() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <img className={styles.headerImg} src={LogoWithText} alt="Logo da SoulPrime" />
        <div>
          <button className={styles.headerBtnUser} type="button"><span>Sou usuário</span></button>
          <button className={styles.headerBtnAd} type="button">
            <span>Anunciar na SoulPrime</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderHome;
