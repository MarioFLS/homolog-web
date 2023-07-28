import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import UpdatePhoto from "./UpdatePhoto";
import ConfirmPhotoUpdate from "./ConfirmPhotoUpdate";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FFFFFF',
  borderRadius: '10px',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'center',
};

function ModalProfilePhoto({ open, handleClose }) {
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!open) setFile(null);
  }, [open]);

  return (
    <Modal
      aria-labelledby="Modal para trocar a foto"
      aria-describedby="Esse Modal permite que você troque a foto"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Box sx={style}>
        {!file ? <UpdatePhoto setFile={setFile} /> : <ConfirmPhotoUpdate file={file} handleClose={handleClose} setFile={setFile} />}
      </Box>
    </Modal>
  );
}

export default ModalProfilePhoto;
