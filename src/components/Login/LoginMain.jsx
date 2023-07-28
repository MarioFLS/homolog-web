import { Box } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from "../../interceptors/axiosConfig";
import EyeViewsOff from '../../assets/EyeViewsOff.svg';
import EyeViewsWhite from '../../assets/EyeViewsWhite.svg';
import styles from '../../styles/AccountManagement/Login/LoginMain.module.css';
import AppContext from '../../Context/AppContext';
import getInfoUser from '../../helpers/getInfoUser';
import loginUser from '../../helpers/loginUser';
import getSecureLocalStorage from '../../helpers/getSecureLocalStorage';

const style = {
  bgcolor: 'trasparent',
  display: "flex",
  with: "100%",
  alignItems: "center",
  justifyContent: "center",
  outline: 'none',
};

function LoginMain() {
  const [disabledButton, setDisabledButton] = useState(false);
  const {
    setGlobalInfoUser, setCpf, globalInfoUser, setUserHeader,
  } = useContext(AppContext);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true);
  const [inputs, setInputs] = useState({
    email: '',
    passoword: '',
    cpf: '',
  });

  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  // const [errorCpf, setErrorCpf] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const loginBtn = async (event) => {
    event.preventDefault();
    if (!inputs.email.trim()) {
      setErrorEmail(true);
      setDisabledButton(false);
    }
    if (!inputs.passoword.trim()) {
      setDisabledButton(false);
      setErrorPassword(true);
    }
    /*  if (!inputs.cpf.trim() && pathname !== "/login") {
      setDisabledButton(false);
      return setErrorCpf(true);
    } */
    setDisabledButton(true);
    try {
      setInputs((preves) => ({ ...preves, cpf: preves.cpf?.replace(/\D/g, "").trim() }));
      const funcLogin = await loginUser(inputs, axios, pathname, setCpf, setDisabledButton, setErrorLogin, setGlobalInfoUser);
      if (funcLogin?.error) {
        return Swal.fire({
          icon: 'error',
          title: funcLogin.error,
        });
      }


      const infoUser = await getSecureLocalStorage();
      if (infoUser?.accessToken) {
        setErrorLogin(false);
        if (pathname === "/adm") {
          const { data } = await getInfoUser(globalInfoUser).catch(() => setDisabledButton(false));
          setGlobalInfoUser(data);
          setUserHeader(data);
          return;
        }
        const dataInfoUser = funcLogin ?? (await getInfoUser(globalInfoUser)).data;
        setGlobalInfoUser(dataInfoUser);
        setUserHeader(dataInfoUser);
        const gregCode = import.meta.env.VITE_APP_GREG_CODE;

        const config = {
          headers: { Authorization: `Bearer ${gregCode}` },
        };


        if (funcLogin?.address?.length === 0) {
          await axios.post(
            "https://greg-api.blocklize.io/auth/requestLogin",
            { email: inputs.email ? inputs.email : infoUser?.email },
            config,
          );
          /**
           * @todo return code GREG
           *  */
          setGlobalInfoUser({ ...funcLogin, cpf: inputs.cpf?.replace(/\D/g, "").trim() });
          setUserHeader(funcLogin);
          return pathname === "/login" ? navigate("/login/code") : navigate("/advertiser/code");
        }
        setDisabledButton(true);
        return pathname !== "/login" ? navigate('/advertising') : navigate('/wallet');
      }
    } catch (error) {
      return Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
  };
  return (
    <Box sx={style}>
      <form className={styles.sectionLogin}>
        <div className={styles.sectionText}>
          <h2>{t("page-Login-Header-Title")}</h2>
          {pathname === "/advertiser" ? (
            <p>
              Ainda não tem uma conta?
              {' '}
              <Link to="signUp">Faça o cadastro!</Link>
            </p>
          ) : null}
          <div>
            {errorLogin ? <span>O Email ou senha estão incorretos</span> : null}
          </div>

        </div>
        <div className={styles.sectionInput}>
          <div>
            <input
              type="email"
              required
              value={inputs.email}
              onChange={({ target }) => {
                setErrorEmail(false);
                setDisabledButton(false);
                setInputs((preves) => ({ ...preves, email: target.value }));
              }}
              placeholder={t('headerLP-Modal-placeholder-email')}
            />
            {errorEmail ? <span>O campo email não pode estar vazio!</span> : null}
          </div>

          {/* {pathname === "/advertiser" ? (
            <div>
              <input
                type="text"
                required
                value={inputs.cpf}
                onChange={({ target }) => {
                  // setErrorCpf(false);
                  setDisabledButton(false);
                  setInputs((preves) => ({ ...preves, cpf: target.value }));
                }}
                placeholder="CPF ou CNPJ"
              />

            </div>
          ) : null} */}

          <div>
            <div className={styles.inputPassword}>
              <input
                required
                type={isPassword ? 'password' : 'text'}
                value={inputs.passoword}
                placeholder={t('headerLP-Modal-placeholder-password')}
                onChange={({ target }) => {
                  setErrorPassword(false);
                  setDisabledButton(false);
                  setInputs((preves) => ({ ...preves, passoword: target.value }));
                }}
              />
              <button type="button" onClick={() => setIsPassword(!isPassword)}>
                <img src={isPassword ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
              </button>
            </div>
            {errorPassword ? <span>O campo email não pode estar vazio!</span> : null}
          </div>
        </div>
        <button
         /*  disabled={pathname !== "/login"
            ? (!inputs.email || !inputs.passoword || !inputs.cpf) || disabledButton
            : (!inputs.email || !inputs.passoword) || disabledButton} */
          disabled={(!inputs.email || !inputs.passoword) || disabledButton}
          type="submit"
          onClick={loginBtn}
          className={styles.sectionButton}
        >
          {t("page-Login-Button-Text")}
        </button>
        <button
          type="button"
          onClick={() => navigate("password-recovery")}
          className={styles.sectionButtonPassword}
        >
          Esqueci minha senha
        </button>
      </form>
    </Box>
  );
}

export default LoginMain;
