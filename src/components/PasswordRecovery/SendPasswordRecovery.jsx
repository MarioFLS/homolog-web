/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import axios from "../../interceptors/axiosConfig";
import styles from '../../styles/SingUp/SendCode/SendCode.module.css';
import EyeViewsOff from '../../assets/EyeViewsOff.svg';
import EyeViewsWhite from '../../assets/EyeViewsWhite.svg';

function SendPasswordRecovery({ inputEmail }) {
  const { t } = useTranslation();
  const [values, setValues] = useState(Array(6).fill(''));
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const inputRefs = useRef([]);
  const { pathname } = useLocation();
  const [newPassword, setNewPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(true);

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
    event.preventDefault();
    try {
      if (!newPassword?.trim() || newPassword.length < 5) {
        setErrorEmail(true);
      }
      const otpCode = values.join("");
      await axios.patch(`${baseUrl}/user/change_password`, { email: inputEmail, otpCode, newPassword });
      return pathname === "/login/password-recovery" ? navigate("/login") : navigate("/advertiser");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
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
              onClick={async () => axios.post(`${baseUrl}/user/send_recovery_email`, { email: inputEmail })}
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
        <div>
          <div className={styles.containerPassword}>
            <input
              required
              type={isPassword ? 'password' : 'text'}
              value={newPassword}
              placeholder="Digite sua nova senha"
              onChange={({ target }) => {
                setErrorEmail(false);
                setNewPassword(target.value);
              }}
            />
            <button type="button" onClick={() => setIsPassword(!isPassword)}>
              <img src={isPassword ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
            </button>
          </div>
          {errorEmail ? <span>Você deve por uma nova senha de no mínimo 5 caracteres!</span> : null}
        </div>
        <button
          className={styles.sendCodeBtn}
          onClick={onClick}
          type="submit"
          disabled={values.some((v) => v === "") || newPassword.length < 5}
        >
          Enviar
        </button>
      </div>
    </section>
  );
}

export default SendPasswordRecovery;
