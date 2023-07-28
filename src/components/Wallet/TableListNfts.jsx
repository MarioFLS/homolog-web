import PropTypes from "prop-types";
import styles from '../../styles/Wallet/TableListNfts/TableListNfts.module.css';

function TableListNfts({ nft }) {
  const converteDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  };
  return (
    <div className={styles.containerNft}>
      <div className={styles.containerNftText}>
        <div className={styles.containerNftTextImage}>
          <img src={nft.image} alt={`Imagem do NFT de nome ${nft.name}`} />
        </div>
        <div className={styles.containerNftTextInfo}>
          <p className={styles.nftNumber}>{`# ${nft.name.split("#")[1]}`}</p>
          <p className={styles.nftName}>{nft.name}</p>
          <p className={styles.nftDescription}>{nft.description}</p>
        </div>
      </div>
      <div className={styles.containerNftInfos}>
        <div>
          <p className={styles.textTitle}>Dono</p>
          <p>{nft.owner}</p>
        </div>
        <div>
          <p className={styles.textTitle}>Coleção</p>
          <p>{nft.description}</p>
        </div>
        <div>
          <p className={styles.textTitle}>Data</p>
          <p>{converteDate(nft.date)}</p>
        </div>
      </div>
    </div>
  );
}

TableListNfts.propTypes = {
  nft: PropTypes.shape({
    compiler: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dna: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired,
    owner: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableListNfts;
