import { Box } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import IconX from "../../../../assets/Icons/IconX.svg";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
};


function StageOneRecoveyPassword({
  styles, nextStage, handleClose, inputs, setInputs,
}) {
  const sendEmail = async () => {
    try {
      await axios.post(`${baseUrl}/user/send_recovery_email`, { email: inputs.email });
      nextStage();
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
        <p>Insira seu e-mail cadastrado que enviaremos um link para você voltar a acessar sua conta.  </p>
      </header>
      <div className={styles.containerInput}>
        <label htmlFor="emailRecovery">
          <span>E-mail</span>
          <input
            type="email"
            value={inputs.email}
            onChange={({ target }) => setInputs((preves) => ({ ...preves, email: target.value }))}
            id="emailRecovery"
            required
            placeholder="Insira seu e-mail"
          />
        </label>
      </div>
      <button className={styles.buttonRecoveryPassword} onClick={sendEmail} type="button">Confirmar</button>
    </Box>
  );
}

export default StageOneRecoveyPassword;
