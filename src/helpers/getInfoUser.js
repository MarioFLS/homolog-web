import axios from 'axios';
import secureLocalStorage from 'react-secure-storage';

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const getInfoUser = async (globalInfoUser) => {
  try {
    const infoUser = secureLocalStorage.getItem('user_information_session');
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    if (!globalInfoUser?.id) {
      if (Object.keys(globalInfoUser).length === 0) {
        return await axios.get(`${baseUrl}/user/info`, { headers });
      }
    }
    return { data: globalInfoUser };
  } catch (error) {
    const infoUser = secureLocalStorage.getItem('user_information_session');
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    if (!globalInfoUser?.id) {
      if (Object.keys(globalInfoUser).length === 0) {
        return axios.get(`${baseUrl}/user/info`, { headers });
      }
    }
    return { data: globalInfoUser };
  }
};

export default getInfoUser;
