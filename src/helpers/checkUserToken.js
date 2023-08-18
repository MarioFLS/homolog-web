import axios from 'axios';
import jwt_decode from 'jwt-decode';
import secureLocalStorage from 'react-secure-storage';

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const getUserInformation = () => {
  const userInformation = secureLocalStorage.getItem(
    'user_information_session',
  );
  if (!userInformation) {
    throw new Error('Informações do usuário não encontradas.');
  }
  return userInformation;
};

const refreshAccessToken = async (refreshToken) => {
  try {
    const { data } = await axios.post(
      `${baseUrl}/user/refresh_token`,
      {
        refresh_token: refreshToken,
      },
      {
        headers: {
          'X-Skip-Interceptor': true,
        },
      },
    );
    return data;
  } catch (error) {
    throw new Error('Falha ao atualizar o token de acesso.');
  }
};

const updateUserInfo = (infoUser, newAccessToken, newRefreshToken) => {
  const updatedInfo = {
    ...infoUser,
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
  secureLocalStorage.setItem('user_information_session', updatedInfo);
  return newAccessToken;
};

const checkUserToken = async () => {
  try {
    const infoUser = getUserInformation();
    const decodedJwt = jwt_decode(infoUser.accessToken);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedJwt.exp < currentTime) {
      const { accessToken, refreshToken } = await refreshAccessToken(
        infoUser.refreshToken,
      );
      const token = updateUserInfo(infoUser, accessToken, refreshToken.id);
      return token;
    }


    return false;
  } catch (error) {
    secureLocalStorage.removeItem('user_information_session');
    const protectedPaths = ['dashboard', 'advertising', 'wallet'];
    if (protectedPaths.includes(window.location.pathname.split('/')[1])) {
      // window.location.href = '/';
    }
    return false;
  }
};

export default checkUserToken;
