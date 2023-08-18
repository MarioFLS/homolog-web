import { Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import secureLocalStorage from "react-secure-storage";
import EyeViewsWhite from "../../../assets/EyeViewsWhite.svg";
import EyeViewsOff from "../../../assets/EyeViewsOff.svg";
import styles from "../../../styles/RewardLearnAndEarn/LoginRewardLearnAndEarn/LoginRewardLearnAndEarn.module.css";
import axios from "../../../interceptors/axiosConfig";

function InputLoginLearnAndEarn({ checkEmail, setCheckEmail, setPage }) {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailMb, setEmailMb] = useState('');
  const [spanError, setSpanError] = useState(null);
  const [spanEmailMbError, setSpanEmailMbError] = useState(null);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;


  useEffect(() => {
    setSpanError(null);
    setSpanEmailMbError(null);
  }, [email, password, emailMb]);

  const checkEmailNft = async () => {
    try {
      if (checkEmail) {
        return await axios.get(`${baseUrl}/user/check_email_nft`, { params: { email: emailMb } });
      }
      return await axios.get(`${baseUrl}/user/check_email_nft`, { params: { email } });
    } catch (error) {
      if (error?.response?.data?.error === "Você já possui um NFT registrado!") {
        return { error: 'REGISTRED' };
      }
      return { error: 'NOTFOUND' };
    }
  };

  const sendEmailCheckEmail = async (accessToken) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      if (checkEmail) {
        await axios.post(`${baseUrl}/user/check_email_nft`, { email: emailMb }, { headers });
        return setPage(2);
      }
    } catch (error) {
      if (error.response.data.error !== "Esse email já está associado ao NFT.") {
        return setSpanEmailMbError("Esse email não possui um NFT");
        // return navigate("/nft-signed");
      }
    }
  };

  const clickLogin = async () => {
    try {
      const checkIfTheEmailHasNft = await checkEmailNft();
      if (checkIfTheEmailHasNft.error === "NOTFOUND") {
        return checkEmail ? setSpanEmailMbError("Esse email não possui um NFT") : setSpanError("Esse email não possui um NFT");
      }
      const response = await axios.post(`${baseUrl}/user/auth`, {
        email: email?.trim(),
        password,
      }, { params: { nft: true } });

      const {
        email: userEmail,
        accessToken,
        refreshToken: { id, user_id: userId },
      } = response.data;

      if (!checkIfTheEmailHasNft.error || checkIfTheEmailHasNft.error === "REGISTRED") {
        await sendEmailCheckEmail(accessToken);
        secureLocalStorage.setItem('user_information_session', {
          email: userEmail,
          accessToken,
          refreshToken: id,
          userId,
          emailNft: emailMb,
        });

        if (response.status === 200 && spanError === null && (!checkEmail || (email?.trim() === emailMb?.trim()))) {
          return navigate("/nft-signed");
        }
      }
    } catch (error) {
      setSpanError("O Email ou senha estão incorretos.");
    }
  };

  const disabledButton = () => {
    if (checkEmail && !emailMb?.trim()) {
      return true;
    }
    if (!email?.trim() || !password?.trim()) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className={styles.containerLoginInputs}>
        {spanError && <span>{spanError}</span>}
        <input
          onChange={({ target }) => setEmail(target.value)}
          value={email}
          className={styles.inputEmail}
          type="text"
          placeholder="Insira seu e-mail"
        />
        <div className={styles.containerInputPassword}>
          <input
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Insira sua senha"
          />
          <div className={styles.containerButtonPassword}>
            <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              <img src={isPasswordVisible ? EyeViewsWhite : EyeViewsOff} alt="Imagem de um olho para visualizar a senha." />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.containerCheckbox}>
        <Checkbox
          onChange={({ target }) => setCheckEmail(target.checked)}
          defaultValue={false}
          value={checkEmail}
          className={styles.checkbox}
          sx={{
            zIndex: 1,
            color: '#BA02C9',
            '&.Mui-checked': {
              color: '#BA02C9',
            },
          }}
        />
        <p>Adicionar e-mail cadastrado no MB</p>
      </div>
      <div className={styles.containerInputCheckEmail}>
        {checkEmail && (
          <>
            {spanEmailMbError && <span>{spanEmailMbError}</span>}
            <input
              value={emailMb}
              className={`${styles.inputCheckEmail} ${checkEmail ? styles.fadeOutElement : `${styles.fadeOutElement} `}`}
              type="text"
              placeholder="Insira seu e-mail cadastrado no MB"
              onChange={({ target }) => setEmailMb(target.value)}
            />
          </>

        )}
      </div>
      <div className={styles.containerButtonContinue}>
        <button
          disabled={disabledButton()}
          onClick={clickLogin}
          type="button"
        >
          Continuar
        </button>
      </div>
    </>
  );
}

export default InputLoginLearnAndEarn;
