import styles from "../../styles/RewardLearnAndEarn/LoginRewardLearnAndEarn/LoginRewardLearnAndEarn.module.css";
import SectionLoginLearnAndEarn from "../../components/RewardLearnAndEarn/FormsLogin/SectionLoginLearnAndEarn";


function LoginRewardLearnAndEarn() {
  return (
    <main className={styles.containerMain}>
      <div className={styles.containerText}>
        <h1>Acesse sua conta na plataforma</h1>
        <p>
          <span>Já tem conta na Soul?</span>
          {' '}
          Acesse com o mesmo e-mail  e senha criados no cadastro do App para ver as informações de resgate do seu NFT.
        </p>
      </div>
      <form action="">
        <header>
          <h3>Login</h3>
        </header>

        <SectionLoginLearnAndEarn />
      </form>
    </main>
  );
}

export default LoginRewardLearnAndEarn;
