/* eslint-disable jsx-a11y/media-has-caption */
import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "../../styles/Modals/ModalPreview/ModalPreview.module.css";
import IconX from "../../assets/Icons/IconX.svg";

function ModalPreview({
  open, setOpen, video,
}) {
  const handleClose = () => setOpen(false);
  const [urlVideo, setUrlVideo] = useState(null);

  useEffect(() => {
    if (video) {
      const objectURL = URL.createObjectURL(video);
      setUrlVideo(objectURL);
    }
  }, [video]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-token"
      aria-describedby="Esse modal é um texto que explica sobre a Soul. Titulado 'Quem Somos'."
    >
      <div className={styles.containerModalPreview}>
        <header>
          <h3>Pré-visualização</h3>
          <button type="button" onClick={handleClose}>
            <img src={IconX} alt="Icone de X para fechar Modal." />
          </button>
        </header>
        <div id={styles.containerVideo}>
          <video width="400px" controls preload="metadata">
            <source src={urlVideo} type="video/mp4" />
            <source src={urlVideo} type="video/webm" />
          </video>
        </div>
      </div>
    </Modal>
  );
}

export default ModalPreview;
