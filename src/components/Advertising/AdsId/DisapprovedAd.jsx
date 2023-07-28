import styles from '../../../styles/Advertising/Id/DisapprovedAd/DisapprovedAd.module.css';
import IconInfoCircle from '../../../assets/Icons/IconInfoCircle.svg';

function DisapprovedAd() {
  return (
    <div className={styles.containerDisapproved}>
      <div className={styles.containerMain}>
        <div className={styles.containerText}>
          <h4>Seu anúncio foi reprovado</h4>
          <p>O conteúdo do seu anúncio não está de acordo com as diretrizes de permissão da plataforma. Você pode editar seu anúncio e enviar novamente.</p>
          <div>
            <img src={IconInfoCircle} alt="Icone de informação" />
            <p>Anúncios relacionados a bebidas alcoólicas devem ser direcionadas apenas para o público adulto (+18) </p>
          </div>
        </div>
      </div>

      <button type="button">Editar meu anúncio</button>
    </div>
  );
}

export default DisapprovedAd;
