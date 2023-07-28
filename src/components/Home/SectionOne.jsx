import { useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import PhoneImage from '../../assets/PhoneImage.png';
import styles from '../../styles/Home/Home.module.css';

function SectionsOne() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [text] = useTypewriter({
    words: ['Web3'],
    loop: true,
  });
  return (
    <section className={styles.sectionPhone}>
      <article className={styles.sectionPhoneText}>
        <h2>
          {t('section-title')}
          {' '}
          <span className={styles.typeWrite}>
            {text}
          </span>
          {/* <Cursor cursorColor="#ff8a91" className={styles.type} /> */}
        </h2>
        <p>
          {' '}
          {t('section-paragraph')}
        </p>
        <button onClick={() => navigate('/signUp')} type="button">
          {' '}
          {t('section-button')}
        </button>
      </article>
      <img src={PhoneImage} alt="Imagem de um telefone com o símbulo da Soulprime na tela. Embaixo do símbolo um gráfico de crescimento." />
    </section>
  );
}

export default SectionsOne;
