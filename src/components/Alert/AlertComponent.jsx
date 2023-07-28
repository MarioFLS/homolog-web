import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';


function AlertComponent({ type, text, open }) {
  const [openAlert, setOpen] = useState(open);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      handleOpen();
    }
  }, [open]);


  return (
    <div>
      <Snackbar
        open={openAlert}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity={type}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertComponent;
