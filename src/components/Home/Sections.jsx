import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import HappyDreamyWoman from '../../assets/HappyDreamyWoman.png';
import WomanSittingCafe from '../../assets/WomanSittingCafe.png';
import GroupFriends from '../../assets/GroupFriends.png';

import styles from '../../styles/Home/Home.module.css';

function Sections() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <section className={styles.sectionChange}>
        <img src={HappyDreamyWoman} alt="Imagem de uma mulher sorridente segundo seu telefone." />
        <article className={styles.sectionChangeText}>
          <div>
            <h1>
              {' '}
              {t('article-conversion-text-h1')}
            </h1>
            <div style={{ width: '132px' }} className={styles.bordText} />
          </div>
          <h2>{t('article-conversion-text-h2')}</h2>
          <p>
            {' '}
            {t('article-conversion-text')}
          </p>
        </article>
      </section>
      <section className={styles.sectionChange}>
        <article className={styles.sectionChangeText}>
          <div>
            <h1>{t('article-performance-text-h1')}</h1>
            <div style={{ width: '155px' }} className={styles.bordText} />
          </div>
          <h2>{t('article-performance-text-h2')}</h2>
          <p>{t('article-performance-text')}</p>
        </article>
        <img src={WomanSittingCafe} alt="Mulher sentada café bebendo café trabalhando computador." />
      </section>
      <section className={styles.sectionChange}>
        <img src={GroupFriends} alt="Grupo de pessoas mexendo em seus telefones" />
        <article className={styles.sectionChangeText}>
          <div>
            <h1>{t('article-adverts-text-h1')}</h1>
            <div style={{ width: '120px' }} className={styles.bordText} />
          </div>
          <h2>{t('article-adverts-text-h2')}</h2>
          <p>{t('article-adverts-text')}</p>
          <button onClick={() => navigate('/signUp')} type="button">
            {t('article-adverts-button')}
          </button>
        </article>

      </section>
    </>
  );
}

export default Sections;
