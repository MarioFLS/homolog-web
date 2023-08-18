/* eslint-disable no-underscore-dangle */
// import { ethers } from 'ethers';
// import sdk from 'stellar-sdk';

import { useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';
import HeaderMain from '../components/Headers/HeaderMain';
import SectionBalance from '../components/Wallet/SectionBalance';
import SectionCompany from '../components/Wallet/SectionCompany';
import styles from '../styles/Wallet/Wallet.module.css';
// import erc20ABI from '../contract/erc20ABI.json';
import erc721ABI from '../contract/erc721ABI.json';
import SectionNfts from '../components/Wallet/SectionNfts';
import AppContext from '../Context/AppContext';
import getInfoUser from '../helpers/getInfoUser';
import getSecureLocalStorage from '../helpers/getSecureLocalStorage';

function Wallet() {
  const {
    setGlobalInfoUser, globalInfoUser,
  } = useContext(AppContext);
  const { t } = useTranslation();
  const [imgNft, setImgNft] = useState([]);

  const fetchUser = async () => {
    const infoUser = await getSecureLocalStorage();
    if (infoUser) {
      const { data } = await getInfoUser(globalInfoUser);
      setGlobalInfoUser(data);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!globalInfoUser?.id) {
          return await fetchUser();
        }
      } catch (error) {
        return error;
      }
    };
    fetchData();
  }, [globalInfoUser]);
  async function getBalanceEhter() {
    const web3Provider = new ethers.providers.JsonRpcProvider('https://polygon-mainnet.g.alchemy.com/v2/guTQ9wHBaJDSnRVDjgo1nL6SSqYLpVWb');
    const walletEther = new ethers.Wallet('e5fd061958ebf2f3e691ee4c6553b664cc34813b8533d5da28d186c54e08ec3e');

    const connectedWallet = walletEther.connect(web3Provider);

    const contractNft = new ethers.Contract('0xdE8Fd70261269F38BD8455553AB0a93199a33B4C', erc721ABI, web3Provider);
    const contractSignerNFT = contractNft.connect(connectedWallet);
    const owner = await contractSignerNFT.name();

    const address = globalInfoUser?.address?.find((nft_address) => nft_address);
    if (address?.address) {
      const numbersNft = await contractSignerNFT.tokensOfOwner(address?.address);

      let urlToken = '';

      if (numbersNft) {
        const nfts = await Promise.all(numbersNft.map(async (e) => {
          const token = await contractSignerNFT.tokenURI(e);

          if (token.startsWith('ipfs://')) {
            urlToken = `https://ipfs.io/ipfs/${token.split('ipfs://')[1]}`;
          }
          const tokenInfo = await (await fetch(urlToken)).json();
          const image = `https://ipfs.io/ipfs/${tokenInfo.image.split('ipfs://')[1]}`;
          return { ...tokenInfo, image, owner };
        }));
        setImgNft(nfts);
      } else {
        setImgNft([]);
      }

      // const contract = new ethers.Contract('0xdE8Fd70261269F38BD8455553AB0a93199a33B4C', erc20ABI, web3Provider);
      // const contractSigner = contract.connect(connectedWallet);
      // const name = await contractSigner.name();
      // const value = ethers.utils.formatEther(await contractSigner.balanceOf(address));

      // const urlProvider = 'https://polygon-mainnet.g.alchemy.com/v2/guTQ9wHBaJDSnRVDjgo1nL6SSqYLpVWb';
      /* const provider = new ethers.providers.JsonRpcProvider(
        urlProvider,
      ); */

      // const balance = await provider.getBalance(address);

      // Valor do Saldo
      // const formatBalance = ethers.utils.formatEther(balance);
    }
  }
  useEffect(() => {
    getBalanceEhter();
  }, [globalInfoUser]);

  return (
    <>
      <HeaderMain />
      <main className={styles.mainWallet}>
        <div className={styles.containerTextMain}>
          <h1>{t("wallet-title")}</h1>
        </div>
        <div className={styles.containerWallet}>
          <SectionCompany />
          <section className={styles.sectionWallet}>
            <SectionBalance />
            <SectionNfts data={imgNft} />
          </section>

        </div>
      </main>
    </>
  );
}

export default Wallet;
