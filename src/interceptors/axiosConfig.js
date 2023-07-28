/* eslint-disable no-param-reassign */
import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';
import checkUserToken from '../helpers/checkUserToken';

const baseURL = import.meta.env.VITE_APP_BASE_URL_API;
const instance = axios.create({
  baseURL,
  timeout: 5000,
});


// Intercepta a requisição antes de ser enviada
instance.interceptors.request.use(async (config) => {
  const accessToken = await checkUserToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const userInfo = secureLocalStorage.getItem('user_information_session');

    if (error.response && error.response.status === 403) {
      const response = await instance.post(
        `${import.meta.env.VITE_APP_BASE_URL_API}/user/refresh_token`,
        {
          refresh_token: userInfo.refreshToken,
        },
      );

      const {
        email,
        accessToken,
        refreshToken: { id, user_id: userId },
      } = response.data;

      secureLocalStorage.clear();
      secureLocalStorage.setItem('user_information_session', {
        email,
        accessToken,
        refreshToken: id,
        userId,
      });
    }

    // Forward the error to the calling code
    return Promise.reject(error);
  },
);

instance.interceptors.response.use((config) => config);
export default instance;
