import { useContext, useEffect, useState } from 'react';
import { Avatar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import axios from "../../../interceptors/axiosConfig";
import styles from '../../../styles/Header/HeaderMain/HeaderMain.module.css';
import AppContext from '../../../Context/AppContext';
import ModalCompanySignUp from '../../Modals/Company/ModalCompanySignUp';
import ModalSuccessAssociate from '../../Modals/Company/ModalSuccessAssociate';
import ModalLoginCompany from '../../Modals/Company/Login/ModalLoginCompany';
import ModalCodeLoginCompany from '../../Modals/Company/Login/ModalCodeLoginCompany';
import ModalRecoveryPassword from '../../Modals/Company/RecoveryPassword/ModalRecoveryPassword';
import getSecureLocalStorage from '../../../helpers/getSecureLocalStorage';

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
function Company() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [open, setOpen] = useState(false);
  const [codeLogin, setCodeLogin] = useState(false);
  const [openSignUp, setSignUp] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openRecoveryPassword, setOpenRecoveryPassword] = useState(false);
  const { globalInfoUser, setUserHeader, userHeader } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseSignUpModal = () => {
    setSignUp(false);
  };

  const handleOpenSignUpModal = () => {
    setSignUp(true);
  };

  const handleCloseSuccessModal = () => {
    setOpenSuccess(false);
  };

  const handleOpenSuccessModal = () => {
    setOpenSuccess(true);
  };

  const fetchAccounts = async () => {
    const infoUser = await getSecureLocalStorage();
    if (infoUser) {
      const headers = {
        Authorization: `Bearer ${infoUser.accessToken}`,
        'Content-Type': 'application/json',
      };
      const { data } = await axios.get(`${baseUrl}/user/associated_accounts`, { headers });
      setAccounts(data);
    }
  };

  const changeMainCompany = () => {
    setUserHeader(globalInfoUser);
    return navigate('/dashboard');
  };

  const changeCompany = (account) => {
    const { user: { imagem, nickname, username }, account: id } = account;
    setUserHeader((preves) => ({
      ...preves, imagem, nickname, username, associated: true, role: "user", id,
    }));
    return navigate('/dashboard');
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <>
      <div className={styles.popoverCompany}>
        <button
          type="button"
          onClick={changeMainCompany}
          className={styles.popoverCompanyContainer}
        >
          <Avatar src={globalInfoUser.imagem} alt={`Icone da empresa ${globalInfoUser.nickname}`} />
          <span>{globalInfoUser.nickname}</span>
        </button>
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => changeCompany(account)}
            type="button"
            className={styles.popoverCompanyContainer}
            id={userHeader.id === account.account ? styles.userSelected : null}
          >
            <Avatar src={account.user.imagem} alt={`Icone da empresa ${account.user.nickname}`} />
            <span>{account.user.nickname}</span>
          </button>
        ))}
        <button onClick={handleOpenModal} type="button">{t('headerMain-popover-company')}</button>
        {/* <button type="button">{t('headerMain-popover-company')}</button> */}
      </div>
      <ModalLoginCompany
        inputs={inputs}
        setInputs={setInputs}
        open={open}
        handleClose={handleCloseModal}
        handleOpenSignUpModal={handleOpenSignUpModal}
        openCodeLogin={() => setCodeLogin(true)}
        openRecoveryPassword={() => setOpenRecoveryPassword(true)}
      />
      <ModalCodeLoginCompany setInputs={setInputs} fetchAccounts={fetchAccounts} email={inputs.email} open={codeLogin} handleClose={() => setCodeLogin(false)} />
      <ModalCompanySignUp open={openSignUp} handleClose={handleCloseSignUpModal} openSuccess={handleOpenSuccessModal} fetchAccounts={fetchAccounts} />
      <ModalSuccessAssociate open={openSuccess} handleClose={handleCloseSuccessModal} />
      <ModalRecoveryPassword open={openRecoveryPassword} handleClose={setOpenRecoveryPassword} />
    </>
  );
}

export default Company;
