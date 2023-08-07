import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import styles from "../../styles/RewardLearnAndEarn/SignUpRewardLearnAndEarn/SignUpRewardLearnAndEarn.module.css";
import IconLogin from "../../assets/Icons/IconLogin.svg";
import SignUpSteppers from "../../components/RewardLearnAndEarn/FormsSignUp/SignUpSteppers";
import PhaseOneLAE from "../../components/RewardLearnAndEarn/FormsSignUp/SignUpPhases/PhaseOneLAE";
import PhaseTwoLAE from "../../components/RewardLearnAndEarn/FormsSignUp/SignUpPhases/PhaseTwoLAE";
import PhaseThreeLAE from "../../components/RewardLearnAndEarn/FormsSignUp/SignUpPhases/PhaseThreeLAE";
import PhaseFourLAE from "../../components/RewardLearnAndEarn/FormsSignUp/SignUpPhases/PhaseFourLAE";
import PhaseFiveLAE from "../../components/RewardLearnAndEarn/FormsSignUp/SignUpPhases/PhaseFiveLAE";

function SignUpRewardLearnAndEarn() {
  const navigate = useNavigate();
  const [step, setStepe] = useState(0);


  const clickContinue = () => {
    if (step === 4) return navigate("/nft-signed");
    setStepe((preves) => preves + 1);
  };

  const clickBack = () => {
    if (step >= 0) {
      setStepe((preves) => preves - 1);
    }
  };

  const [phaseForm, setPhaseForm] = useState(<PhaseOneLAE clickContinue={clickContinue} />);
  useEffect(() => {
    switch (step) {
      case 0:
        return setPhaseForm(<PhaseOneLAE clickContinue={clickContinue} />);
      case 1:
        return setPhaseForm(<PhaseTwoLAE clickContinue={clickContinue} clickBack={clickBack} />);
      case 2:
        return setPhaseForm(<PhaseThreeLAE clickContinue={clickContinue} clickBack={clickBack} />);
      case 3:
        return setPhaseForm(<PhaseFourLAE clickContinue={clickContinue} />);
      default:
        return setPhaseForm(<PhaseFiveLAE clickContinue={clickContinue} />);
    }
  }, [step]);

  return (
    <main className={styles.containerMain}>
      <div className={styles.containerText}>
        <h1>
          Faça seu cadastro na
          plataforma
        </h1>
        <p>
          Crie sua conta na plataforma e visualize as informações para resgatar o seu NFT. Além disso, esse cadastro te dá acesso a nossa rede social web3, que te remunera por assistir e criar anúncios e muito mais!
        </p>

        <div className={styles.containerLogin}>
          <p>Já tem cadastro na SoulPrime? </p>
          <div>
            <button onClick={() => navigate("/check/learn-and-earn/login")} type="button">
              <img src={IconLogin} alt="Icone para ir pra login" />
              <p>Acessar minha conta </p>
            </button>
          </div>

        </div>
      </div>
      <form className={styles.formSignUp}>
        <header className={styles.headerSteppers}>
          <SignUpSteppers step={step} />
        </header>
        {phaseForm}

      </form>
    </main>
  );
}

export default SignUpRewardLearnAndEarn;
