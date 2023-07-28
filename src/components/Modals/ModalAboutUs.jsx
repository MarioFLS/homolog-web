import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "../../styles/Modals/ModalAboutUs/ModalAboutUs.module.css";
import IconX from "../../assets/Icons/IconX.svg";

function ModalAboutUs({
  open, setOpen,
}) {
  const handleClose = () => setOpen(false);
  const { t } = useTranslation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-quem-somos"
        aria-describedby="Esse modal é um texto que explica sobre a Soul. Titulado 'Quem Somos'."
      >
        <div className={styles.containerModalAbout}>
          <div className={styles.buttonCloseModal}>
            <button type="button" onClick={handleClose}><img src={IconX} alt="Icone de um X" /></button>
          </div>
          <header className={styles.headerModelAbout}>
            <h2>{t("about-us-modal")}</h2>
          </header>
          <hr />
          <section className={styles.sectionTextAbout}>
            <p>
              {t("paragraph-one")}
            </p>
            <p>
              {t("paragraph-two")}
            </p>
            <p>
              {t("paragraph-three")}
            </p>
          </section>
          <div className={styles.containerButton}>
            <button
              className={styles.buttonClose}
              onClick={handleClose}
              type="button"
            >
              {t("close")}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className={styles.buttonContact}
            >
              <a href="#homeContact">{t("contact-us-modal")}</a>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalAboutUs;
