import axios from "../interceptors/axiosConfig";
import getSecureLocalStorage from "./getSecureLocalStorage";

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
const baseBucket = import.meta.env.VITE_APP_BASE_BUCKET;

const createAds = async (newAds, userHeader, Swal, t, setSend) => {
  const infoUser = await getSecureLocalStorage();
  try {
    const { file } = newAds;
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
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    const body = {
      purpose: 1,
      title: newAds.adsTitle,
      author: userHeader.id,
      payment_in_brl: newAds.price,
      payment_amount: newAds.priceInDollar,
      link: newAds.link,
      content: link,
      category: newAds.adsCategory,
      account: userHeader.id,
      adult_only: newAds.adultOnly,
      button_type: newAds.buttonType,
    };
    if (userHeader?.associated) {
      return await axios.post(`${baseUrl}/ads/associate/create`, body, { headers });
    }
    return await axios.post(`${baseUrl}/ads/create`, body, { headers });
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: t("alert-error-transaction-title"),
      text: t("alert-error-transaction-text"),
      confirmButtonText: t("alert-error-transaction-button"),
    });
    setSend(true);
    return { error: true };
  }
};

export default createAds;
