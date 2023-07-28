import {
  Box, FormControlLabel, Modal, Radio, RadioGroup,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import axios from "../../../interceptors/axiosConfig";
import styles from '../../../styles/Modals/ModalCompanySignUp/ModalCompanySignUp.module.css';
import IconX from "../../../assets/Icons/IconX.svg";
import EyeViewsOff from '../../../assets/EyeViewsOff.svg';
import EyeViewsWhite from '../../../assets/EyeViewsWhite.svg';
import { maskNIF } from "../../../helpers/masks";
import 'react-phone-input-2/lib/style.css';
import AppContext from "../../../Context/AppContext";
import getSecureLocalStorage from "../../../helpers/getSecureLocalStorage";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '462px',
  height: '939px',
  maxHeight: '98vh',
  bgcolor: '#FFFFFF',
  zIndex: 2,
};

function ModalCompanySignUp({
  open, handleClose, openSuccess, fetchAccounts,
}) {
  const { t } = useTranslation();
  const { globalInfoUser } = useContext(AppContext);
  const [isPassword, setIsPassword] = useState(true);
  const [isPasswordConfirmation, setIsPasswordConfirmation] = useState(true);
  const [disabledButton, setDisabledButton] = useState(true);
  const [checkboxTel, setCheckboxTel] = useState(true);
  const [inputsForms, setInputsForms] = useState({
    nameUser: '',
    nameCompany: '',
    emailCompany: '',
    passwordCompany: '',
    confirmationPasswordCompany: '',
    nifCompany: '',
    telCompany: '',
  });


  useEffect(() => {
    const valuesInputs = !Object.values(inputsForms).every((e) => e.trim() !== "");
    const telMain = checkboxTel ? false : inputsForms?.telCompany?.length <= 5;
    const confirmPassword = inputsForms.passwordCompany === inputsForms.confirmationPasswordCompany;
    setDisabledButton((valuesInputs || telMain) && !confirmPassword);
  }, [inputsForms, checkboxTel]);

  const clearState = () => {
    setInputsForms({});
    handleClose();
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setInputsForms((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  const clickCreateAccount = async () => {
    try {
      const infoUser = await getSecureLocalStorage();
      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      await axios.post(`${baseUrl}/user/associate/create`, {
        username: inputsForms.nameUser?.trim(),
        nickname: inputsForms.nameCompany?.trim(),
        password: inputsForms.passwordCompany?.trim(),
        email: inputsForms.emailCompany?.trim(),
        telephone: checkboxTel ? globalInfoUser.telephone : inputsForms.telCompany?.trim(),
        age: "02/02/0002",
        gender: 4,
      }, { headers });
      fetchAccounts(infoUser);
      handleClose();
      openSuccess();
    } catch (error) {
      return Swal.fire({
        icon: 'error',
        title: t(error?.response?.data?.error),
      });
    }
  };

  const handleOnPhone = (value) => {
    setInputsForms((prevInputs) => ({
      ...prevInputs,
      telCompany: value,
    }));
  };


  return (
    <Modal
      open={open}
      onClose={clearState}
      sx={{ zIndex: '900' }}
      aria-labelledby="Modal de Criação de conta."
      aria-describedby="Esse modal cria as contas associadas"
    >
      <Box sx={style} className={styles.signUpCompanyMain} componen="form">
        <header className={styles.headerCompany}>
          <div>
            <button type="button" onClick={clearState}>
              <img src={IconX} alt="Icone de X para fechar o Modal" />
            </button>
          </div>
          <h1>
            Adicionar novo perfil
          </h1>
        </header>
        <div className={styles.signUpCompanyContainer}>
          <label className={styles.companyInput} htmlFor="nameUser">
            <span>Nome</span>
            <input
              required
              id="nameUser"
              type="text"
              placeholder="Nome"
              value={inputsForms.nameUser}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.companyInput} htmlFor="nameCompany">
            <span>
              Empresa
              {' '}
              <span>(Nome de usuário Ex: @SoulPrime)</span>
            </span>
            <input
              required
              id="nameCompany"
              type="text"
              placeholder="Empresa (Nome de usuário Ex: @SoulPrime)"
              value={inputsForms.nameCompany}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.companyInput} htmlFor="emailCompany">
            <span>E-mail</span>
            <input
              required
              id="emailCompany"
              type="email"
              placeholder="E-mail"
              value={inputsForms.emailCompany}
              onChange={handleInputChange}
            />
          </label>
          <label className={styles.companyInput} htmlFor="passwordCompany">
            <span>Senha</span>
            <div className={styles.inputPassword}>
              <input
                required
                id="passwordCompany"
                type={isPassword ? 'password' : 'text'}
                placeholder="Senha"
                value={inputsForms.passwordCompany}
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => setIsPassword(!isPassword)}>
                <img src={isPassword ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
              </button>
            </div>
          </label>
          <label className={styles.companyInput} htmlFor="confirmationPasswordCompany">
            <span>Confirmação de senha</span>
            <div className={styles.inputPassword}>
              <input
                required
                id="confirmationPasswordCompany"
                type={isPasswordConfirmation ? 'password' : 'text'}
                placeholder="Confirmação de senha"
                value={inputsForms.confirmationPasswordCompany}
                onChange={handleInputChange}
              />
              <button type="button" onClick={() => setIsPasswordConfirmation(!isPasswordConfirmation)}>
                <img src={isPasswordConfirmation ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
              </button>
            </div>
          </label>
          <label className={styles.companyInput} htmlFor="nif-company">
            <span>CPF ou CNPJ</span>
            <input
              required
              id="nifCompany"
              type="text"
              placeholder="00.000.000/0000-00"
              value={maskNIF(inputsForms.nifCompany)}
              onChange={handleInputChange}
            />
          </label>
          <label
            className={styles.companyInputNumber}
            id={checkboxTel ? styles.companyInputNumber : null}
            htmlFor="telCompany"
          >
            <span>Whatsapp</span>
            <PhoneInput
              className={styles.inputNumber}
              country="br"
              specialLabel=""
              placeholder="+55 (11) 90000-0000"
              value={inputsForms.telCompany}
              onChange={handleOnPhone}
              inputProps={{
                id: 'telCompany',
                name: 'phone',
                required: true,
                placeholder: "+55 (11) 90000-0000",
                readOnly: checkboxTel,
              }}
            />
          </label>
        </div>
        <div className={styles.radioButtonTel}>
          <RadioGroup
            aria-labelledby="Botão radio para escolher qual telefone vai ser usado."
            defaultValue="pt"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="true"
              control={(
                <Radio
                  checked={checkboxTel}
                  onClick={() => setCheckboxTel(true)}
                  sx={{
                    color: '#BA02CA',
                    '&.Mui-checked': {
                      color: '#BA02CA',
                    },
                  }}
                />
)}
              label="Usar o número da conta principal"
            />
            <FormControlLabel
              value="false"
              control={(
                <Radio
                  checked={!checkboxTel}
                  onClick={() => setCheckboxTel(false)}
                  sx={{
                    color: '#BA02CA',
                    '&.Mui-checked': {
                      color: '#BA02CA',
                    },
                  }}
                />
)}
              label="Adicionar novo número"
            />
          </RadioGroup>
        </div>
        <button
          disabled={disabledButton}
          className={styles.buttonConfirm}
          onClick={clickCreateAccount}
          type="submit"
        >
          Confirmar
        </button>
      </Box>
    </Modal>
  );
}

export default ModalCompanySignUp;
