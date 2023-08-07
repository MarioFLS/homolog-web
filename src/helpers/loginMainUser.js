import secureLocalStorage from "react-secure-storage";
import Swal from "sweetalert2";
import axios from "axios";
import getUserInformation from "./getUserInformation";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

const loginMainUser = async (email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/user/auth`, {
      email,
      password,
    });

    const {
      email: emailData,
      accessToken,
      refreshToken: { id, user_id: userId },
    } = response.data;

    const userInfo = await getUserInformation(accessToken, axios);
    secureLocalStorage.setItem('user_information_session', {
      email: emailData,
      accessToken,
      refreshToken: id,
      userId,
    });
    return userInfo;
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }
};

export default loginMainUser;
