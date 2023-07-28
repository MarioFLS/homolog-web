/* eslint-disable react/prop-types */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/Wallet/SectionNfts/SectionNfts.module.css';
import IconTablerListDetails from '../../assets/Icons/IconTablerListDetails.svg';
import IconTablerLayoutGrid from '../../assets/Icons/IconTablerLayoutGrid.svg';
import TableListNfts from './TableListNfts';
import TableGridNfts from './TableGridNfts';

function SectionNfts({ data }) {
  const { t } = useTranslation();
  const [typeList, setTypeList] = useState('list');

  return (
    <section className={styles.sectionNft}>
      <div className={styles.containerText}>
        <h2>{t("wallet-nfts")}</h2>
        <div>
          <button
            onClick={() => setTypeList("list")}
            type="button"
          >
            <img id={typeList === "list" ? styles.selectedTypeList : null} src={IconTablerListDetails} alt="Icone de visualização em lista" />
          </button>
          <button
            onClick={() => setTypeList("grid")}
            type="button"
          >
            <img id={typeList === "grid" ? styles.selectedTypeList : null} src={IconTablerLayoutGrid} alt="Icone de visualização em grade" />
          </button>
        </div>
      </div>
      {typeList === "list" ? (
        <article className={styles.articleListNfts}>
          {data.map((nft) => (
            <TableListNfts key={nft.dna} nft={nft} />
          ))}
        </article>
      )
        : (
          <article className={styles.articleGridNfts}>
            {data.map((nft) => (
              <TableGridNfts key={nft.dna} nft={nft} />
            ))}
          </article>
        )}
    </section>
  );
}

export default SectionNfts;
