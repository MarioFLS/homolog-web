const getUserInformation = async (token, axios) => {
  const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
  if (token) {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
    const { data } = await axios.get(`${baseUrl}/user/info`, { headers });
    return data;
  }
};

export default getUserInformation;
