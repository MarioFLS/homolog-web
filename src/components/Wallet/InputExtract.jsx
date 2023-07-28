import PropTypes from 'prop-types';
import { useState } from 'react';
import EyeViewsPink from '../../assets/EyeViewsPink.svg';
import styles from '../../styles/Wallet/InputExtract/InputExtract.module.css';

function InputExtract({ data }) {
  const {
    img, name, value,
  } = data;

  const [isPassword, setIsPassword] = useState(true);

  return (
    <div className={styles.containerMain}>
      <div className={styles.containerText}>
        <img src={img} alt={`Icone do ${name}`} />
        <p>{name}</p>
      </div>
      <div className={styles.containerInput}>
        <input type={isPassword ? 'password' : 'text'} value={value} readOnly />
        <button type="button" onClick={() => setIsPassword(!isPassword)}>
          <img src={EyeViewsPink} alt="Icone de Visualização do Valor" />
        </button>

      </div>
    </div>
  );
}

InputExtract.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default InputExtract;
