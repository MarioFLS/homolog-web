import secureLocalStorage from 'react-secure-storage';
import axios from '../interceptors/axiosConfig';
import Swal from 'sweetalert2';
const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const getGraphicsOfUser = async (
  url,
  urlAssociate,
  userHeader,
  setGraphic,
  t
) => {
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
      const response = await axios.get(baseUrl + urlAssociate, {
        headers,
        params,
      });
      setGraphic(response.data);
      return response;
    }
    const response = await axios.get(baseUrl + url, { headers });
    setGraphic(response.data);
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

const getGraphicsById = async (
  url,
  urlAssociate,
  userHeader,
  setGraphic,
  id,
  t
) => {
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
      const response = await axios.get(baseUrl + urlAssociate, {
        headers,
        params,
      });
      setGraphic(response.data);
      return response;
    }

    const response = await axios.get(baseUrl + url, { headers });
    setGraphic(response.data);
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

export { getGraphicsOfUser, getGraphicsById };
