import { Avatar, Popover } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import IconUser from '../../assets/Icons/IconUser.svg';
import IconProfile from '../../assets/Icons/IconProfile.svg';
import IconLock from '../../assets/Icons/IconLock.svg';
import IconKey from '../../assets/Icons/IconKey.svg';
import Logo from '../../assets/SoulPrimeLogoHorizontal.png';
import styles from '../../styles/Header/HeaderAdm/HeaderAdm.module.css';

function HeaderAdm() {
  const { t } = useTranslation();
  const [anchorElNotificação, setAnchorElConfig] = useState(null);

  const ClickConfig = (event) => {
    setAnchorElConfig(event.currentTarget);
  };

  const CloseConfig = () => {
    setAnchorElConfig(null);
  };

  const openConfig = Boolean(anchorElNotificação);
  const idConfig = openConfig ? 'popover-config' : undefined;
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo da Soulprime" />
      <h1>Controle e Gestão de Anúncios</h1>
      <button onClick={ClickConfig} type="button">
        <p>
          Adiministrador
        </p>
        <Avatar alt="Icone do Usuário" src={IconUser} />
      </button>
      <Popover
        id={idConfig}
        open={openConfig}
        anchorEl={anchorElNotificação}
        onClose={CloseConfig}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        sx={{ marginTop: '30px' }}
      >
        <div className={styles.popoverConfig}>
          <h3>Configurações</h3>
          <div>
            <button type="button">
              <img src={IconProfile} alt="Imagem de um Bonequinho de palitos" />
              <span>{t('headerMain-popover-config-account')}</span>
            </button>
            <button type="button">
              <img src={IconLock} alt="Icone de um cadeado" />
              <span>{t('headerMain-popover-config-privacy')}</span>
            </button>
            <button type="button">
              <img src={IconKey} alt="Icone de uma chave" />
              <span>{t('headerMain-popover-config-security')}</span>
            </button>
            <button type="button" className={styles.popoverConfigButton}>
              {t('headerMain-popover-config-logoff')}
            </button>
          </div>
        </div>
      </Popover>
    </header>
  );
}

export default HeaderAdm;
