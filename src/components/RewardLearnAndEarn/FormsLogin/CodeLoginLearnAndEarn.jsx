/* eslint-disable react/no-array-index-key */
import { useEffect, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import styles from "../../../styles/RewardLearnAndEarn/LoginRewardLearnAndEarn/LoginRewardLearnAndEarn.module.css";
import axios from "../../../interceptors/axiosConfig";

function CodeLoginLearnAndEarn() {
  const [values, setValues] = useState(Array(6).fill(''));
  const inputs = Array(6).fill(null).map(() => useRef(null));
  const currentInputRef = useRef(0);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const navigate = useNavigate();

  useEffect(() => {
    inputs[0]?.current?.focus();
  }, []);

  const handleInputChange = (e, inputIndex) => {
    const { value } = e.target;
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[inputIndex] = value;
      return newValues;
    });
    if (inputIndex < 5 && value) {
      inputs[inputIndex + 1].current.focus();
      currentInputRef.current = inputIndex + 1;
    } else if (inputIndex > 0 && !value) {
      inputs[inputIndex - 1].current.focus();
      currentInputRef.current = inputIndex - 1;
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text/plain');

    const characters = pastedText.split('');

    setValues((prevValues) => {
      const newValues = [...prevValues];
      characters.forEach((character, index) => {
        if (index < 6) {
          newValues[index] = character;
        }
      });
      return newValues;
    });

    const lastFilledIndex = Math.min(characters.length, 5);
    if (inputs[lastFilledIndex]) {
      inputs[lastFilledIndex].current.focus();
      currentInputRef.current = lastFilledIndex;
    }
  };

  const handleKeyDown = (e, inputIndex) => {
    if (e.key === 'Backspace' && !values[inputIndex]) {
      if (inputIndex > 0) {
        inputs[inputIndex - 1].current.focus();
        currentInputRef.current = inputIndex - 1;
      }
    }
  };

  const sendCode = async () => {
    // const infoUser = secureLocalStorage.getItem("user_information_session");
    try {
      const { accessToken, emailNft } = secureLocalStorage.getItem("user_information_session");
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      await axios.post(`${baseUrl}/user/add_nft_to_email`, { email: emailNft, otp_code: values.join("") }, { headers });
      navigate("/nft-signed");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error?.response?.data?.error,
      });
    }
  };

  return (
    <div className={styles.containerCode}>
      <div className={styles.containerCodeMain}>
        <h4>Insira o código enviado por e-mail</h4>
        <div className={styles.containerInputs}>
          {values.map((value, index) => (
            <input
              key={index}
              ref={inputs[index]}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
            />
          ))}
        </div>
      </div>

      <button onClick={sendCode} type="button">Entrar</button>
    </div>
  );
}

export default CodeLoginLearnAndEarn;
