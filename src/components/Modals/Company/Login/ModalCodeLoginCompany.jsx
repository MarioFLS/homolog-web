import { Box, Modal } from "@mui/material";
import CodeLogin from "./CodeLogin";
import styles from '../../../../styles/Modals/ModalCodeLoginCompany/ModalCodeLoginCompany.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
};

function ModalCodeLoginCompany({
  open, handleClose, email, fetchAccounts, setInputs,
}) {
  return (
    <Modal
      sx={{ zIndex: '990' }}
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de Criação de conta."
      aria-describedby="Esse modal cria as contas associadas"
    >
      <Box sx={style} className={styles.containerMainCode}>
        <header>
          <h2>Código de confirmação</h2>
          <p>
            Insira o código que foi enviado para
            seu e-mail cadastrado.
          </p>
        </header>
        <CodeLogin setInputs={setInputs} handleClose={handleClose} email={email} styles={styles} fetchAccounts={fetchAccounts} />
      </Box>
    </Modal>
  );
}

export default ModalCodeLoginCompany;
