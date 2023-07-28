import { Box } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import IconX from "../../../../assets/Icons/IconX.svg";
import styles from "../../../../styles/Modals/ModalRecoveryPassword/StageTwo/StageTwoRecoveyPassword.module.css";
import CodeSixOtp from "../../../Code/CodeSixOtp";
import EyeViewsOff from '../../../../assets/EyeViewsOff.svg';
import EyeViewsWhite from '../../../../assets/EyeViewsWhite.svg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
};

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
function StageTwoRecoveyPassword({ handleClose, inputs, setInputs }) {
  const [values, setValues] = useState(Array(6).fill(''));
  const [isPassword, setIsPassword] = useState(true);

  const changePassword = async (event) => {
    try {
      event.preventDefault();
      await axios.patch(`${baseUrl}/user/change_password`, {
        email: inputs.email,
        otpCode: values?.join(""),
        newPassword: inputs.password,
      });
      handleClose();
      setInputs({
        email: '',
        password: '',
      });
      return Swal.fire({
        icon: 'success',
        title: "Senha alterado com sucesso!",
      });
    } catch (error) {
      return Swal.fire({
        icon: 'error',
        title: error.response?.data.error,
      });
    }
  };
  return (
    <Box sx={style} className={styles.containerMainRecovery}>
      <header>
        <div>
          <button type="button" onClick={() => handleClose()}>
            <img src={IconX} alt="Icone de X para fechar o Modal" />
          </button>
        </div>
        <h2>Recuperar senha</h2>
        <p>
          Insira o código que foi enviado para seu
          e-mail cadastrado e crie sua nova senha. Caso não tenha recebido, clique em reenviar e-mail.
        </p>
      </header>
      <CodeSixOtp values={values} setValues={setValues} styles={styles} />
      <div className={styles.inputPassword}>
        <input
          id="passwordCompany"
          required
          type={isPassword ? 'password' : 'text'}
          placeholder="Nova senha"
          value={inputs.password}
          onChange={({ target }) => setInputs((preves) => ({ ...preves, password: target.value }))}
        />
        <button type="button" onClick={() => setIsPassword(!isPassword)}>
          <img src={isPassword ? EyeViewsOff : EyeViewsWhite} alt="Icone de Visualização" />
        </button>
      </div>
      <button type="submit" onClick={changePassword} className={styles.buttonRecoveryPassword}>Concluir</button>
    </Box>
  );
}

export default StageTwoRecoveyPassword;
