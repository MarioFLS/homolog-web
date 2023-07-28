import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
// import IconUser from '../../assets/IconUser.svg';
import { t } from 'i18next';
import styles from '../../styles/Wallet/SectionCompany/SectionCompany.module.css';
import IconEdit from '../../assets/Icons/IconEdit.svg';
import AppContext from '../../Context/AppContext';
import ModalProfilePhoto from '../Modals/ProfilePhoto/ModalProfilePhoto';

function SectionCompany() {
  const {
    globalInfoUser: {
      nickname, imagem, email, username, cpf,
    },
  } = useContext(AppContext);
  const [disableEdit] = useState(true);
  const [cpfInput, setCpfInput] = useState("");
  const [open, setOpen] = useState(false);

  const closeModal = () => { setOpen(false); };

  useEffect(() => {
    if (!disableEdit) {
      return setCpfInput(cpf);
    }
  }, [disableEdit]);

  useEffect(() => {
    setCpfInput(cpf);
  }, []);

  return (
    <>
      <section className={styles.sectionCompany}>
        <article>
          <div className={styles.containerCompany}>
            <div className={styles.containerCompanyAvatar}>
              <Avatar
                className={styles.containerCompanyImg}
                alt="Icone do Usuário"
                src={imagem}
                onClick={() => setOpen(true)}
              />
              <button type="button" onClick={() => setOpen(true)} className={styles.imgEdit}>
                <img src={IconEdit} alt="Icone de Edição" />
              </button>
            </div>
            <h2>{username}</h2>
          </div>
          <form className={styles.containerForms}>
            <label htmlFor="">
              <span>{t("wallet-company")}</span>
              <input
                type="text"
                placeholder={nickname}
                readOnly
              />
            </label>
            <label htmlFor="">
              <span>Email</span>
              <input type="text" className={styles.inputEmail} placeholder={email} readOnly />
            </label>
            <label htmlFor="">
              <span>CPF ou CNPJ</span>
              <input
                value={cpfInput ?? ""}
                type="text"
                placeholder={cpf || "00000/000-00"}
                readOnly
              />
            </label>

          </form>
        </article>
      </section>
      <ModalProfilePhoto open={open} handleClose={closeModal} />
    </>
  );
}

export default SectionCompany;
