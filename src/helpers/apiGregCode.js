import axios from "../interceptors/axiosConfig";

const gregCode = import.meta.env.VITE_APP_GREG_CODE;
const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
const config = {
  headers: { Authorization: `Bearer ${gregCode}` },
};

const sendGregCode = async (email) => axios.post(
  "https://greg-api.blocklize.io/auth/requestLogin",
  { email },
  config,
);

export const getGregAddress = async (code, email, infoUser, setGlobalInfoUser) => {
  const headers = {
    Authorization: `Bearer ${infoUser.accessToken}`,
    'Content-Type': 'application/json',
  };
  const response = await axios.post(
    "https://greg-api.blocklize.io/auth/login",
    { email, tokenId: code },
    config,
  );

  const addresses = [
    {
      address: response.data.usuarioInfo.walletAddress,
      mb_address: false,
      currency: "ETHEREUM",
      nft_address: true,
    },
  ];
  await axios.post(`${baseUrl}/user/address`, { addresses, user_id: infoUser.userId }, { headers });
  return setGlobalInfoUser((preves) => ({ ...preves, address: addresses }));
};

export default sendGregCode;

