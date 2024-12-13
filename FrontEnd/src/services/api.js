import axios from 'axios';

export default async function API(
  endpoint,
  method,
  body,
  requireToken = false
) {
  const API_URL = process.env.REACT_APP_API_URL;
  let headers = {};
  if (requireToken) {
    const token = await localStorage.getItem('accessToken');
    try {
      await axios.get(`${API_URL}/api/token/check`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Token check error: ', error);
      return null;
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const url = `${API_URL}${endpoint}`;
  if (body instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return axios({
    method,
    url,
    data: body,
    headers,
  });
}
