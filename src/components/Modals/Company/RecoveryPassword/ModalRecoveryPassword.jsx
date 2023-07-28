import { Modal } from "@mui/material";
import { useEffect, useState } from "react";

import styles from '../../../../styles/Modals/ModalRecoveryPassword/ModalRecoveryPassword.module.css';
import StageOneRecoveyPassword from "./StageOneRecoveyPassword";
import StageTwoRecoveyPassword from "./StageTwoRecoveyPassword";



function ModalRecoveryPassword({ open, handleClose }) {
  const [stage, setStage] = useState(0);
  const nextStage = () => setStage(stage + 1);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setStage(0);
  }, []);

  const closeAndPrevesStage = () => {
    setStage(0);
    handleClose();
  };


  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="Modal de Recuperação de senha."
      aria-describedby="Esse modal é usado para que possa ser possível recuperar a senha do usuário."
      sx={{ zIndex: '900' }}
    >
      {stage === 0
        ? <StageOneRecoveyPassword styles={styles} nextStage={nextStage} handleClose={handleClose} inputs={inputs} setInputs={setInputs} />
        : <StageTwoRecoveyPassword handleClose={closeAndPrevesStage} inputs={inputs} setInputs={setInputs} />}
    </Modal>
  );
}

export default ModalRecoveryPassword;
