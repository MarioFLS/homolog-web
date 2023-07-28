import secureLocalStorage from 'react-secure-storage';
import axios from '../interceptors/axiosConfig';
const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const getAdsOfUser = async (userHeader, setAds, _t) => {
  try {
    const infoUser = secureLocalStorage.getItem('user_information_session');
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    const params = {
      account: userHeader.id,
    };

    if (userHeader?.associated) {
      const response = await axios.get(`${baseUrl}/ads/associate/of_user`, {
        headers,
        params,
      });
      setAds(response.data);
      return response;
    }

    const response = await axios.get(`${baseUrl}/ads/of_user`, { headers });
    setAds(response.data);
    return response;
  } catch (error) {
    return { error: 'notFound' };
  }
};

const getAdsOfUserById = async (userHeader, setAd, id, _t) => {
  try {
    const infoUser = secureLocalStorage.getItem('user_information_session');
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    const params = {
      account: userHeader.id,
      ad_id: id,
    };

    if (userHeader?.associated) {
      const response = await axios.get(
        `${baseUrl}/ads/associate/of_user_by_id`,
        { headers, params }
      );
      setAd(response.data);
      return response;
    }

    const response = await axios.get(
      `${baseUrl}/ads/of_user_by_id?ad_id=${id}`,
      { headers }
    );
    setAd(response.data);
    return response;
  } catch (error) {
    /* Swal.fire({
      icon: 'error',
      title:
        t(error?.response?.data?.error) ||
        'Opa, tivemos um erro interno, tente novamente mais tarde!',
    }); */
    return;
  }
};

export { getAdsOfUser, getAdsOfUserById };
