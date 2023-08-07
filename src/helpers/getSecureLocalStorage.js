import secureLocalStorage from "react-secure-storage";
import checkUserToken from "./checkUserToken";

const getSecureLocalStorage = async () => {
  await checkUserToken();
  const infoUser = secureLocalStorage.getItem("user_information_session");
  return infoUser;
};

export default await getSecureLocalStorage;
