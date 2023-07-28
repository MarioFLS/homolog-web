/* eslint-disable react/prop-types */
import React, {
  useContext, useRef, useState,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import axios from "../../interceptors/axiosConfig";
import styles from '../../styles/SingUp/SendCode/SendCode.module.css';
import AppContext from '../../Context/AppContext';
import getSecureLocalStorage from '../../helpers/getSecureLocalStorage';

function SendCode() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [disabledButton, setDisabledButton] = useState(false);
  const {
    globalInfoUser, setGlobalInfoUser, emailBase,
  } = useContext(AppContext);
  const [values, setValues] = useState(Array(6).fill(''));
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const gregCode = import.meta.env.VITE_APP_GREG_CODE;
  const inputRefs = useRef([]);

  const config = {
    headers: { Authorization: `Bearer ${gregCode}` },
  };

  const handleChange = (index, event) => {
    const { value } = event.target;
    if (value === "0" || Number(value || value === "")) {
      const newValues = [...values];
      newValues[index] = event.target.value.slice(0, 1);
      setValues(newValues);
      if (event.target.value !== '' && index < values.length - 1) {
        inputRefs.current[index + 1].focus();
      } else if (event.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const clickBackspace = (index, event) => {
    const { key } = event;
    const { value } = event.target;
    if (key === "Backspace" && index > 0) {
      if (value === "") { return inputRefs.current[index - 1].focus(); }
    }
  };
  const onClick = async (event) => {
    const infoUser = await getSecureLocalStorage();
    event.preventDefault();
    try {
      setDisabledButton(true);
      const token = values.join("");
      const emailLogin = emailBase || infoUser.email || globalInfoUser.email;
      const { data: { usuarioInfo } } = await axios.post(
        "https://greg-api.blocklize.io/auth/login",
        { email: emailLogin, tokenId: token },
      );

      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      const addresses = [
        {
          address: usuarioInfo.walletAddress,
          mb_address: false,
          currency: "ETHEREUM",
          nft_address: true,
        },
      ];
      await axios.post(`${baseUrl}/user/address`, { addresses, user_id: infoUser.userId }, { headers });
      setGlobalInfoUser({ ...globalInfoUser, address: addresses });

      localStorage.setItem("code_registration", JSON.stringify(true));
      return pathname === "/login" ? navigate('/wallet') : navigate('/advertising');
    } catch (error) {
      setDisabledButton(false);
      Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
  };

  const onClickCode = async () => {
    const user = await getSecureLocalStorage();
    axios.post("https://greg-api.blocklize.io/auth/requestLogin", { email: user.email }, config);
  };


  return (
    <section className={styles.sectionSendCode}>
      <div className={styles.containerSendCodeMain}>
        <header>
          <h2>Insira o código</h2>
          <p>
            Você não recebeu o código? Clique em
            {' '}
            <button
              type="button"
              onClick={onClickCode}
            >
              <b>reenviar.</b>
            </button>
          </p>
        </header>
        <div className={styles.containerCode}>
          {values.map((value, index) => {
            const id = index;
            return (
              <input
                key={id}
                value={value}
                onChange={(event) => handleChange(index, event)}
                maxLength={1}
                id={value !== "" ? styles.addedCode : null}
                type="tel"
                ref={(input) => {
                  inputRefs.current[index] = input;
                }}
                onKeyDown={(event) => clickBackspace(index, event)}
              />
            );
          })}
        </div>
        <button
          className={styles.sendCodeBtn}
          onClick={onClick}
          type="submit"
          disabled={values.some((v) => v === "") || disabledButton}
        >
          Enviar
        </button>
      </div>
    </section>
  );
}

export default SendCode;
