import { Modal } from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "../../styles/Modals/ModalToken/ModalToken.module.css";
import IconX from "../../assets/Icons/IconX.svg";
import PRTToken from '../../assets/PRTToken.png';

function ModalToken({
  open, setOpen,
}) {
  const { t } = useTranslation();
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-token"
        aria-describedby="Esse modal é um texto que explica sobre a Soul. Titulado 'Quem Somos'."
      >
        <div className={styles.containerModalToken}>
          <div className={styles.buttonCloseModal}>
            <button type="button" onClick={handleClose}><img src={IconX} alt="Icone de um X" /></button>
          </div>
          <header className={styles.headerModelToken}>
            <h2>{t("title-token")}</h2>
          </header>
          <hr />
          <section className={styles.sectionTextToken}>
            <div className={styles.sectionTextContainer}>
              <div className={styles.sectionTextOneContainer}>
                <div>
                  <h4>{t("title-prt")}</h4>
                  <p>
                    <span>{t("token-span-one")}</span>
                    {t("token-paragraph-one")}
                  </p>
                  <p>
                    <span>{t("token-span-two")}</span>
                    {t("token-paragraph-two")}
                  </p>
                  <p>
                    <span>{t("token-span-three")}</span>
                    {t("token-paragraph-three")}
                  </p>
                  <p>
                    <span>{t("token-span-four")}</span>
                    {t("token-paragraph-four")}
                  </p>
                  <p>
                    <span>{t("token-span-five")}</span>
                    {t("token-paragraph-five")}
                  </p>
                </div>
                <img src={PRTToken} alt="Icone do PRT" />
              </div>
              <div className={styles.sectionTextTwoContainer}>
                <p>
                  <span>{t("token-span-six")}</span>
                  {t("token-paragraph-six")}
                </p>
                <p>
                  <span>{t("token-span-seven")}</span>
                  {t("token-paragraph-seven")}
                </p>
                <p>
                  <span>{t("token-span-eight")}</span>
                  {t("token-paragraph-eight")}
                </p>
                <p>
                  <span>{t("token-span-nine")}</span>
                  {t("token-paragraph-nine")}
                </p>
                <ul>
                  <li>{t("list-one")}</li>
                  <li>{t("list-two")}</li>
                  <li>{t("list-three")}</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </Modal>
    </div>
  );
}

export default ModalToken;
