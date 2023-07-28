import getSecureLocalStorage from "./getSecureLocalStorage";
import axios from "../interceptors/axiosConfig";

const uploadImage = async (file) => {
  const baseBucket = import.meta.env.VITE_APP_BASE_BUCKET;
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  const infoUser = await getSecureLocalStorage();
  const { data: { url } } = await axios.get(`${baseUrl}/auth/get_presigned_url`, {
    headers: { Authorization: `Bearer ${infoUser.accessToken}` },
  });

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  const imageUrl = url.split("?")[0];

  const imageSplitsTotal = imageUrl.split("/");
  const key = imageSplitsTotal[imageSplitsTotal.length - 1];
  const link = `${baseBucket}/${key}`;
  return link;
};

export default uploadImage;
