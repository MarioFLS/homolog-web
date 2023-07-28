import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import AppContext from '../Context/AppContext';
import getInfoUser from '../helpers/getInfoUser';
import getSecureLocalStorage from '../helpers/getSecureLocalStorage';

function AuthUser({ children }) {
  const { setGlobalInfoUser, globalInfoUser, setUserHeader } = useContext(AppContext);
  const navigate = useNavigate();

  const authUser = async () => {
    const infoUser = await getSecureLocalStorage();
    const codeRegistration = JSON.parse(localStorage.getItem("code_registration"));
    if (infoUser) {
      const user = await getInfoUser(globalInfoUser);
      if (user?.data?.address?.length === 0 && !codeRegistration && globalInfoUser.address?.length === 0) {
        localStorage.clear();
        return navigate("/advertiser/code");
      }
      setUserHeader(user?.data);
      return setGlobalInfoUser(user?.data);
    }
  };

  useState(() => {
    authUser();
  }, []);
  return (
    <div>
      {children}
    </div>
  );
}

export default AuthUser;

AuthUser.propTypes = {
  children: PropTypes.node.isRequired,
};
