import { /* Backdrop, */ Modal } from '@mui/material';
import LoginMain from '../Login/LoginMain';

function ModalLogin({
  open, handleClose,
}) {
  return (
    <Modal
      aria-labelledby="Model de Login"
      aria-describedby="Esse Model permite que utilizando email e senha você faça login na SoulPrime"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <LoginMain />
    </Modal>
  );
}


export default ModalLogin;
