/* eslint-disable react/prop-types */

import styles from '../../styles/Adm/HeaderTable/HeaderTable.module.css';

function HeaderTable({ setTypeAds, typeAds }) {
  // const [typeAds, setTypeAds] = useState(1);
  return (
    <header className={styles.headerAdm}>
      <nav>
        <button
          onClick={() => setTypeAds(1)}
          type="button"
          className={typeAds === 1 ? styles.adsSelected : null}
        >
          <div className={styles.adsSelectedContainer}>
            <h2>Todos</h2>
            {/* <p>4</p> */}
          </div>
          <div className={styles.adsSelectedDiv} />
        </button>
        <button
          onClick={() => setTypeAds(2)}
          type="button"
          className={typeAds === 2 ? styles.adsSelected : null}
        >
          <div className={styles.adsSelectedContainer}>
            <h2>Aprovados</h2>
            {/*             <p>4</p> */}
          </div>
          <div className={styles.adsSelectedDiv} />
        </button>
        <button
          onClick={() => setTypeAds(3)}
          type="button"
          className={typeAds === 3 ? styles.adsSelected : null}
        >
          <div className={styles.adsSelectedContainer}>
            <h2>Reprovados</h2>
            {/* <p>2</p> */}
          </div>
          <div className={styles.adsSelectedDiv} />
        </button>
      </nav>
    </header>
  );
}

export default HeaderTable;
