import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useTranslation } from "react-i18next";
import IconX from "../../../../assets/Icons/IconX.svg";
import styles from "../../../../styles/Modals/ModalLoginCompany/ModalLoginCompany.module.css";
import EyeViewsOff from '../../../../assets/EyeViewsOff.svg';
import EyeViewsWhite from '../../../../assets/EyeViewsWhite.svg';
import getSecureLocalStorage from "../../../../helpers/getSecureLocalStorage";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
};

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

function ModalLoginCompany({
  open, handleClose, handleOpenSignUpModal, openCodeLogin,
  inputs, setInputs, openRecoveryPassword,
}) {
  const [disabledButton, setDisabledButton] = useState(false);
  const { t } = useTranslation();
  const [isPassword, setIsPassword] = useState(true);

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    setDisabledButton(false);
  }, [inputs]);

  const loginBtn = async (event) => {
    event.preventDefault();

    if (!inputs.email.trim()) {
      setErrorEmail(true);
      setDisabledButton(false);
    }
    if (!inputs.password.trim()) {
      setDisabledButton(false);
      setErrorPassword(true);
    }
    setDisabledButton(true);
    try {
      const infoUser = await getSecureLocalStorage();
      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };

      const funcLogin = await axios.post(`${baseUrl}/user/associate/auth`, {
        email: inputs.email,
        password: inputs.password,
      }, { headers });
      if (funcLogin?.error) {
        return Swal.fire({
          icon: 'error',
          title: funcLogin.error,
        });
      }
      handleClose();
      openCodeLogin();
    } catch (error) {
      setErrorLogin(true);
      return Swal.fire({
        icon: 'error',
        title: error.response?.data.error,
      });
    }
  };

  const clickSignUp = () => {
    handleClose();
    handleOpenSignUpModal();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ zIndex: '900' }}
      aria-labelledby="Modal de Login de associação"
      aria-describedby="Esse modal serve para fazer login"
    >
      <Box sx={style} componen="form" className={styles.sectionLogin}>
        <header className={styles.headerCompany}>
          <div className={styles.closeCompany}>
            <button type="button" onClick={handleClose}>
              <img src={IconX} alt="Icone de X para fechar o Modal" />
            </button>
          </div>
          <div className={styles.containerHeaderText}>
            <h2>Logar com novo perfil</h2>
            <p>
              Ainda não tem uma conta?
              {' '}
              <button onClick={clickSignUp} type="button">Faça o cadastro!</button>
            </p>
          </div>
          <div>
            {errorLogin ? <span>O Email ou senha estão incorretos</span> : null}
          </div>
        </header>
        <div className={styles.sectionInput}>
          <label className={styles.companyInput} htmlFor="emailCompany">
            <span>E-mail</span>
            <input
              id="emailCompany"
              type="email"
              required
              value={inputs.email}
              onChange={({ target }) => {
                setErrorEmail(false);
                setInputs((preves) => ({ ...preves, email: target.value }));
              }}
              placeholder={t('headerLP-Modal-placeholder-email')}
            />
            {errorEmail ? <span>O campo email não pode estar vazio!</span> : null}
          </label>

          <label className={styles.companyInput} htmlFor="passwordCompany">
            <span>Senha</span>
            <div className={styles.inputPassword}>
              <input
                id="passwordCompany"
                required
                type={isPassword ? 'password' : 'text'}
                value={inputs.password}
                placeholder={t('headerLP-Modal-placeholder-password')}
                onChange={({ target }) => {
                  setErrorPassword(false);
                  setInputs((preves) => ({ ...preves, password: target.value }));
                }}
              />
              <button type="button" onClick={() => setIsPassword(!isPassword)}>
                <img src={isPassword ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
              </button>
            </div>
            {errorPassword ? <span>O campo email não pode estar vazio!</span> : null}
          </label>
        </div>
        <div className={styles.containerButtons}>
          <button
            disabled={!inputs.email || !inputs.password || disabledButton}
            type="submit"
            onClick={loginBtn}
            className={styles.buttonConfirm}
          >
            Confirmar
          </button>
          <button
            type="button"
            onClick={() => { openRecoveryPassword(); handleClose(); }}
            className={styles.buttonPassword}
          >
            Esqueci minha senha
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalLoginCompany;
