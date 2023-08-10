import { Modal } from "@mui/material";
import styles from "../../../styles/RewardLearnAndEarn/ModalLearnAndEarnFailEmail/ModalLearnAndEarnFailEmail.module.css";
import IconX from "../../../assets/Icons/IconX.svg";

function ModalLearnAndEarnFailEmail({ open, modalClose }) {
  return (
    <Modal
      open={open}
      onClose={modalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.modalContainerMain}>
        <div>
          <header>
            <div>
              <button onClick={modalClose} type="button"><img src={IconX} alt="Icone de X para fechar o modal." /></button>
            </div>
            <h4>Você ainda não participou do Aprenda e Ganhe</h4>
          </header>
          <p>Volte para o Mercado Bitcoin e responda o questionário do programa Aprenda e Ganhe para continuar o resgaste do seu NFT na SoulPrime.</p>
        </div>
        <button className={styles.buttonReturnMb} type="button">
          <a href="https://www.mercadobitcoin.com.br/aprenda-e-ganhe/soulprime" target="_blank" rel="noopener noreferrer">Voltar para o Mercado Bitcoin</a>
        </button>
      </div>
    </Modal>
  );
}

export default ModalLearnAndEarnFailEmail;
