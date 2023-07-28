import { useState } from 'react';

import { Box } from '@mui/material';

import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import axios from "../../interceptors/axiosConfig";
import styles from '../../styles/PasswordRecovery/sendEmail/PasswordRecovery.module.css';


const style = {
  display: "flex",
  flexDirection: "column",
  height: "80vh",
  justifyContent: "center",
  alignItems: "center",
};

function PasswordRecoverySendEmail({ setStage, inputEmail, setInputEmail }) {
  const [errorEmail, setErrorEmail] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const { t } = useTranslation();

  const onClick = async (event) => {
    event.preventDefault();
    try {
      setStage(2);
      await axios.post(`${baseUrl}/user/send_recovery_email`, { email: inputEmail });
    } catch (error) {
      return Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
  };

  return (
    <Box sx={style}>
      <form className={styles.sectionPassword}>
        <div className={styles.sectionText}>
          <h2>Recupere sua senha</h2>
          <p>Digite seu email de recuperação.</p>
        </div>
        <div className={styles.sectionInput}>
          <div>
            <input
              type="email"
              required
              value={inputEmail}
              onChange={({ target }) => {
                setErrorEmail(false);
                setInputEmail(target.value);
              }}
              placeholder="Digite seu email"
            />
            {errorEmail ? <span>O campo email não pode estar vazio!</span> : null}
          </div>
        </div>
        <button
          type="submit"
          disabled={!inputEmail}
          onClick={onClick}
          className={styles.sectionButton}
        >
          Enviar
        </button>
      </form>
    </Box>

  );
}

export default PasswordRecoverySendEmail;
