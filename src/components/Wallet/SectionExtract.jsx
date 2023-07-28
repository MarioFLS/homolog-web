import { useEffect, useState } from 'react';
import IconMBRLCoin from '../../assets/IconMBRLCoin.svg';
import IconPRT from '../../assets/IconPRT.png';
import InputExtract from './InputExtract';
import styles from '../../styles/Wallet/SectionExtract/SectionExtract.module.css';

function SectionExtract() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const dataExtract = [
      {
        id: 1, name: 'PRT Token', value: '200', img: IconMBRLCoin,
      },
      {
        id: 2, name: 'VIEW Token', value: '659', img: IconPRT,
      },
      {
        id: 3, name: 'VIEW Token', value: '659', img: IconPRT,
      },
      {
        id: 4, name: 'PRT Token', value: '200', img: IconMBRLCoin,
      },
      {
        id: 5, name: 'VIEW Token', value: '659', img: IconPRT,
      },
      {
        id: 6, name: 'PRT Token', value: '200', img: IconMBRLCoin,
      },
      {
        id: 7, name: 'VIEW Token', value: '659', img: IconPRT,
      },
    ];
    setData(dataExtract);
  }, []);
  return (
    <section className={styles.sectionExtract}>
      <div className={styles.containerText}>
        <h2>Extrato</h2>
      </div>
      <article className={styles.articleExtract}>
        {data.map((e) => (
          <InputExtract key={e.id} data={e} />
        ))}
      </article>
    </section>
  );
}

export default SectionExtract;
