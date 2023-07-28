/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from 'react';
import {
  Checkbox,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { useTranslation } from 'react-i18next';
import axios from "../../interceptors/axiosConfig";
import validateInputs from '../../helpers/validateInputsHome';
import SoulPrimeBigLogo from '../../assets/SoulPrimeBigLogo.svg';
import EyeViewsOff from '../../assets/EyeViewsOff.svg';
import EyeViewsWhite from '../../assets/EyeViewsWhite.svg';

import styles from '../../styles/Home/FormsUser.module.css';


const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

function FormsUser() {
  const { t } = useTranslation();
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();
  const label = { inputProps: { 'aria-label': 'Checkbox' } };
  const [isPassword, setIsPassword] = useState(true);
  const [inputs, setInputs] = useState({
    name: '',
    company: '',
    telephone: '',
    password: '',
    cpf: '',
    email: "",
    age: "01/01/0001",
  });

  const [inputError, setInputErro] = useState({
    name: null,
    company: null,
    telephone: null,
    password: null,
    cpf: null,
    email: null,
  });

  const [checkbox, setCheckbox] = useState({
    news: false,
    privacy: false,
  });

  const handleChangeInput = ({ target }) => {
    const { id } = target;
    const { value } = target;
    setDisabledButton(false);
    if (id === 'telephone' || id === 'cpf') {
      const numberValue = value.split('').filter((e) => Number(e) || '0').join('');
      setInputs({ ...inputs, [id]: numberValue });
    } else {
      setInputs((prev) => ({ ...prev, [id]: value }));
    }
  };

  const registerCompany = async (event) => {
    event.preventDefault();
    const response = validateInputs(inputs, setInputErro);

    try {
      setDisabledButton(true);
      if (response && checkbox.privacy) {
        await axios.post(`${baseUrl}/user/create`, { ...inputs, username: inputs.name?.trim(), nickname: inputs.company?.trim() });
        return navigate("/advertiser");
      }
    } catch (error) {
      setDisabledButton(false);
      return Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error) ?? t("alert-signUp-title"),
      });
    }
  };

  return (
    <section className={styles.sectionContainer}>
      <form className={styles.sectionForms}>
        <header className={styles.sectionFormsText}>
          <h2>Cadastre-se</h2>
          <p>Vincule sua conta da Soul a uma conta de anunciante e promova seus produtos e serviços para seus potenciais clientes!</p>
        </header>
        <div className={styles.sectionFormsInput}>

          <label>
            <input type="text" value={inputs.name} id="name" placeholder="Nome" onChange={handleChangeInput} />
            {inputError.name ? <span>Esse campo não pode ser vazio</span> : null}
          </label>

          <label>
            <input type="text" value={inputs.email} id="email" placeholder="Email" onChange={handleChangeInput} />
            <span>{inputError.email ? 'O Email deve ser preenchido corretamente' : null}</span>
          </label>

          <label>
            <div className={styles.inputPassword}>
              <input type={isPassword ? 'password' : 'text'} value={inputs.password} id="password" placeholder="Senha" onChange={handleChangeInput} />
              <button type="button" onClick={() => setIsPassword(!isPassword)}>
                <img src={isPassword ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
              </button>

            </div>
            <span>{inputError.password ? 'Digite uma senha válida' : null}</span>
          </label>

          <label>
            <div className={styles.containerNickname}>
              <div><span className={styles.spanNickname}>@</span></div>
              <input type="text" value={inputs.company} id="company" placeholder="Empresa(@ da sua empresa)" onChange={handleChangeInput} />
            </div>
            <p className={styles.paragraphCompany}>Esse é o apelido(nickname) da sua empresa na Soul, não coloque espaço ou caracteres especiais(@!#$%)</p>
            <span>{inputError.company ? 'Esse campo não pode ser vazio' : null}</span>
          </label>

          <label>
            <input type="text" value={inputs.telephone} id="telephone" placeholder="Whatsapp" onChange={handleChangeInput} />
            <span>{inputError.telephone ? 'Digite um número válido' : null}</span>
          </label>

          <label>
            <input type="text" value={inputs.cpf} id="cpf" placeholder="CPF ou CNPJ" onChange={handleChangeInput} />
            <span>{inputError.cpf ? 'Digite um CPF ou CNPJ válido' : null}</span>
          </label>

        </div>
        <div className={styles.sectionFormsCheck} id="sectionFormsCheck">
          <div>
            <Checkbox
              {...label}
              id="privacy"
              value={checkbox.privacy}
              onChange={() => setCheckbox((preves) => ({ ...preves, privacy: !preves.privacy }))}
              sx={{
                color: '#BA02C9',
                '&.Mui-checked': {
                  color: '#BA02C9',
                },
              }}
            />
            <label htmlFor="privacy" className={styles.labelPrivacity}>
              <span>
                Clique aqui para aceitar os
                <a
                  href="https://drive.google.com/file/d/1a8JG_watpoGSoJqggyJxdxBH3U8xVo_r/view"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  Termos de Uso
                </a>
                {' '}
                e confirmar que leu a Política de
                {' '}
                <a
                  href="http://www.soulprime.io/Politica_de_Privacidade_SoulPrime.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  {' '}
                  Política de Privacidade
                </a>
                {' '}
                da SoulPrime.
              </span>
              <span className={styles.spanText}>
                (*) Você pode cancelar a qualquer momento em suas configurações de anunciante.
              </span>
            </label>
          </div>
        </div>
        <div className={styles.sectionFormsButton}>
          <button
            disabled={!checkbox.privacy || disabledButton}
            onClick={async (event) => registerCompany(event)}
            type="submit"
          >
            Concluir
          </button>
        </div>
      </form>
      <div className={styles.containerImg}>
        <img src={SoulPrimeBigLogo} alt="Logo Gigante" />
      </div>
    </section>
  );
}

export default FormsUser;
