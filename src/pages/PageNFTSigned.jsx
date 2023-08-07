import HeaderAccountManagement from '../components/Headers/HeaderAccountManagement';
import RewardLearnAndEarnFooter from '../components/RewardLearnAndEarn/RewardLearnAndEarnFooter';
import styles from '../styles/PageNftSigned/PageNftSigned.module.css';

import SignedNFTIlustration from "../assets/signed-nft.png";
import IncomeImageSrc from "../assets/income-card.png";

import Number01Img from "../assets/numbers/tabler-icon-hexagon-1-filled.png";
import Number02Img from "../assets/numbers/tabler-icon-hexagon-2-filled.png";
import Number03Img from "../assets/numbers/tabler-icon-hexagon-3-filled.png";
import Number04Img from "../assets/numbers/tabler-icon-hexagon-4-filled.png";

import SeeYourNFT01Img from "../assets/see-your-nft-01-img.png";
import SeeYourNFT02Img from "../assets/see-your-nft-02-img.png";
import SeeYourNFT03Img from "../assets/see-your-nft-03-img.png";

import PlayStoreImg from "../assets/play-store.svg";
import AppleStoreImg from "../assets/apple-store.svg";

import MbNftIlustration from "../assets/mb-nft-ilustration.png";

function PageNFTSigned() {
  return (
    <div className={styles.container}>
      <HeaderAccountManagement />
      <div className={styles.contentContainer}>
        <main className={styles.main}>
          <div className={styles.mainContentContainer}>
            <div className={styles.mainInfoContainer}>
              <h1>
                Eba! Você garantiu seu
                <span className={styles.mainGradient}> NFT Exclusivo</span>
              </h1>
              <p>Com ele você terá um rendimento de 3% do valor de receita da SoulPrime. Para visualizar seu NFT, baixe o aplicativo no seu celular, ele está disponível para iOS e Android.</p>
              <div className={styles.mainInfoContainerButtons}>
                <a href="https://apps.apple.com/br/app/soul-prime/id1634272325" className={styles.storeButton}>
                  <img src={AppleStoreImg} alt="A button with text 'Get it on Apple Store'" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.soulprime.app" className={styles.storeButton}>
                  <img src={PlayStoreImg} alt="A button with text 'Get it on Play Store'" />
                </a>
              </div>
            </div>
            <div className={styles.mainImageContainer}>
              <img src={SignedNFTIlustration} alt="A ilustration" />
            </div>
          </div>
        </main>

        <section className={styles.howWorksNFTIncome}>
          <div className={styles.howWorksNFTIncomeContainer}>
            <div className={styles.howWorksNFTIncomeInfoContainer}>
              <h2>Como funciona o rendimento do NFT</h2>

              <ul className={styles.numbersCards}>
                <li className={styles.numberCardContainer}>
                  <div className={styles.numberBlockContainer}>
                    <div className={styles.numberPinkCard}>
                      <img src={Number01Img} alt="A hexagonal figure with the number 1 in the middle painted in white and with a pink background" />
                    </div>
                  </div>
                  <div className={styles.numberCardTextContainer}>
                    <h3>Aquisição e Bloqueio</h3>
                    <p>Você já adquiriu o seu NFT, ele ficará bloqueado por 3 meses. Isso garante que você receba sua parte dos 3% dos lucros gerados pelas propagandas no app.</p>
                  </div>
                </li>

                <li className={styles.numberCardContainer}>
                  <div className={styles.numberBlockContainer}>
                    <div className={styles.numberPinkCard}>
                      <img src={Number02Img} alt="A hexagonal figure with the number 2 in the middle painted in white and with a pink background" />
                    </div>
                  </div>
                  <div className={styles.numberCardTextContainer}>
                    <h3>Recompensas garantidas</h3>
                    <p>Durante esses 3 meses, sua recompensa está segura. Independentemente das flutuações do mercado, você recebe sua parcela das receitas de publicidade.</p>
                  </div>
                </li>

                <li className={styles.numberCardContainer}>
                  <div className={styles.numberBlockContainer}>
                    <div className={styles.numberPinkCard}>
                      <img src={Number03Img} alt="A hexagonal figure with the number 3 in the middle painted in white and with a pink background" />
                    </div>
                  </div>
                  <div className={styles.numberCardTextContainer}>
                    <h3>Escolha e continuidade</h3>
                    <p>Após o período de bloqueio, você pode retirar seu NFT ou mante-lo ativo, seguindo alguns passos para continuar ganhando 3% das receitas de publicidade.</p>
                  </div>
                </li>

                <li className={styles.numberCardContainer}>
                  <div className={styles.numberBlockContainer}>
                    <div className={styles.numberPinkCard}>
                      <img src={Number04Img} alt="A hexagonal figure with the number 4 in the middle painted in white and with a pink background" />
                    </div>
                  </div>
                  <div className={styles.numberCardTextContainer}>
                    <h3>Ativação simples</h3>
                    <p>Para acionar seus ganhos, basta baixar o app SoulPrime e visualizar seu NFT. Assim, você entra no circuito de receitas e começa a acumular ganhos.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.seeYourNFTContainer}>
          <h2>Visualize seu NFT</h2>
          <ul className={styles.seeYourNFTCardsContainer}>
            <li className={styles.seeYourNFTCard}>
              <div className={styles.cardHeader}>
                <img src={SeeYourNFT01Img} alt="An celphone icon" />
                <h4>Logue no App da Soul</h4>
              </div>
              <p>
                Agora que você já fez o seu cadastro na SoulPrime e baixou o aplicativo, entre com o seu
                e-mail e senha
              </p>
            </li>

            <li className={styles.seeYourNFTCard}>
              <div className={styles.cardHeader}>
                <img src={SeeYourNFT02Img} alt="An celphone icon" />
                <h4>Visualize seu NFT</h4>
              </div>
              <p>
                Na barra fixada na parte inferior do App você consegue acessar a aba de NFT e visualizar seu NFT
              </p>
            </li>

            <li className={styles.seeYourNFTCard}>
              <div className={styles.cardHeader}>
                <img src={SeeYourNFT03Img} alt="An celphone icon" />
                <h4>Vitrine NFT</h4>
              </div>
              <p>
                Na Soul você também consegue mostrar para seus amigos seus NFTs como uma vitrine e conhecer os NFTs dos seus amigos também
              </p>
            </li>
          </ul>
        </section>

        <section className={styles.downloadTheAppNow}>
          <div className={styles.downloadTheAppNowContainer}>
            <div className={styles.donwloadTheAppInfoContainer}>
              <h2>Baixe agora o app</h2>
              <p>
                Nosso NFT é sua conexão direta com a prosperidade. Entre no mundo dos ganhos passivos de forma simples e eficaz! Ative seu benefício baixando o aplicativo nas lojas e aproveite o poder do seu NFT.
                <br />
                <br />

                <b>Você já garantiu 3% de toda a receita de publicidade daSoulPrime! </b>
              </p>
              <div className={styles.mainInfoContainerButtons}>
                <a href="https://apps.apple.com/br/app/soul-prime/id1634272325" className={styles.storeButton}>
                  <img src={AppleStoreImg} alt="A button with text 'Get it on Apple Store'" />
                </a>
                <a href="https://play.google.com/store/apps/details?id=com.soulprime.app" className={styles.storeButton}>
                  <img src={PlayStoreImg} alt="A button with text 'Get it on Play Store'" />
                </a>
              </div>
            </div>
            <div className={styles.downloadTheAppNowImageContainer}>
              <img src={MbNftIlustration} alt="bla" />
            </div>
          </div>
        </section>
      </div>
      <RewardLearnAndEarnFooter />
    </div>
  );
}

export default PageNFTSigned;
