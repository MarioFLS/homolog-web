import { useState } from "react";
import { useNavigate } from "react-router";
import BigLogoSoul from "../../assets/Logo/BigLogoSoul.png";
import styles from "../../styles/RewardLearnAndEarn/RewardLearnAndEarnMain/RewardLearnAndEarn.module.css";
import axios from "../../interceptors/axiosConfig";
import ModalLearnAndEarnFailEmail from "../Modals/LearnAndEarn/ModalLearnAndEarnFailEmail";
import { regexEmail } from "../../helpers/validateInputsHome";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
function RewardLearnAndEarnMain() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const modalClose = () => setOpen(false);

  const checkEmail = async () => {
    try {
      const check = await axios.get(`${baseUrl}/user/check_email_nft`, { params: { email } });
      if (check.status === 200) {
        return navigate("sign-up");
      }
    } catch (error) {
      setOpen(true);
    }
  };

  return (
    <>
      <main className={styles.mainLearnAndEarn}>
        <div className={styles.containerMain}>
          <header>
            <h1>
              Parabéns!
            </h1>
            <h2>
              Você concluiu o
              {' '}
              <span>Aprenda e Ganhe</span>
            </h2>
          </header>
          <section>
            <header>
              <h3>Como recompensa, você receberá um NFT exclusivo!</h3>
              <p>Para continuar, insira o e-mail utilizado no Mercado Bitcoin no questionário do programa Aprenda e Ganhe.</p>
            </header>
            <div>
              <input value={email} onChange={({ target }) => setEmail(target.value)} type="text" placeholder="Insira seu e-mail" />
              <button disabled={!regexEmail.test(email)} type="button" onClick={checkEmail}>Continuar</button>
            </div>
          </section>
        </div>
        <div>
          <img src={BigLogoSoul} alt="Logo da Soulprime dentro de um hexagono rosa." />
        </div>
      </main>
      <ModalLearnAndEarnFailEmail modalClose={modalClose} open={open} />
    </>

  );
}

export default RewardLearnAndEarnMain;
