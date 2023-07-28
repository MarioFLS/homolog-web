import Footer from '../components/LandingPage/Footer';
import styles from '../styles/NFTCollection/collection.module.css';

//const imageContext =require.context('../assets/Nfts', false, /\.(png|jpe?g|svg)$/);
//const images = imageContext.keys().map(imageContext);

function NFTCollection() {
  return (
    <div className={styles.containerMain}>
      <main className={styles.main}>
        <div className={styles.containerText}>
          <h1>NFT&rsquo;s SoulPrime</h1>
          <p>Confira nossa coleção exclusiva de artes digitais!</p>
        </div>
        <div className={styles.containerMainImage}>

          {/* {images.map((img, index) => {
            const id = index + 1;
            return (
              <div className={styles.containerImage} key={id}>
                <img src={img} alt="Images de uma NFT" />
              </div>
            );
          })} */}
        </div>
        <div className={styles.containerText}>
          <button type="button">
            <a href="https://opensea.io/collection/soulprime" target="_blank" rel="noopener noreferrer">
              Acesse nossa coleção na OpenSea
            </a>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NFTCollection;
