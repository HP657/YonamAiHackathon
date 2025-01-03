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
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('No access token found');
      return null;
    }
    headers.Authorization = `Bearer ${token}`;
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
