import PropTypes from "prop-types";
import IconTablerExternalLink from '../../assets/Icons/IconTablerExternalLink.svg';
import styles from '../../styles/Wallet/TableGridNfts/TableGridNfts.module.css';

function TableGridNfts({ nft }) {
  return (
    <div className={styles.containerNft}>
      <div className={styles.containerNftTextInfo}>
        <div className={styles.containerNftTextTitle}>
          <p className={styles.nftNumber}>#01542842144</p>
          <button type="button">
            <img src={IconTablerExternalLink} alt="Icone de botão de redirecionamento" />
          </button>
        </div>
        <p className={styles.nftName}>{nft.name}</p>
        <p className={styles.nftowner}>{nft.owner}</p>
        <div className={styles.containerNftTextImage}>
          <img src={nft.image} alt={`Imagem do NFT de nome ${nft.name}`} />
        </div>
      </div>
    </div>
  );
}

TableGridNfts.propTypes = {
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

export default TableGridNfts;
