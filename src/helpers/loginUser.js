import secureLocalStorage from 'react-secure-storage';
import getUserInformation from './getUserInformation';

const loginUser = async (inputs, axios, pathname, setCpf, setDisabledButton, setErrorLogin) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

  try {
    const response = await axios.post(`${baseUrl}/user/auth`, {
      email: inputs.email,
      password: inputs.passoword,
    });

    const {
      email,
      accessToken,
      refreshToken: { id, user_id: userId },
    } = response.data;

    const userInfo = await getUserInformation(accessToken, axios);
    secureLocalStorage.setItem('user_information_session', {
      email,
      accessToken,
      refreshToken: id,
      userId,
    });
    setCpf(inputs.cpf?.replace(/\D/g, '').trim());
    return userInfo;
  } catch (error) {
    setDisabledButton(false);
    setErrorLogin(true);
  }
};


export default loginUser;
