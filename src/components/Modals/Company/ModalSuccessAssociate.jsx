import { Box, Modal } from "@mui/material";
import TickDynamicSuccess from '../../../assets/TickDynamicSuccess.png';
import styles from '../../../styles/Modals/ModalSuccessAssociate/ModalSuccessAssociate.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
};

function ModalSuccessAssociate({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Modal de Criação de conta."
      aria-describedby="Esse modal cria as contas associadas"
    >
      <Box sx={style} className={styles.containerSuccessAssociate}>
        <img src={TickDynamicSuccess} alt="Icone de Sucesso" />
        <div>
          <h2>Seu novo perfil foi adicionado com sucesso</h2>
          <p>Agora você já pode alternar entre seus perfis quando quiser sem sair do seu dashboard</p>
        </div>
        <button onClick={handleClose} type="button">Concluir</button>
      </Box>
    </Modal>
  );
}

export default ModalSuccessAssociate;
