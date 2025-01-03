import API from '../services/api';

export default async function CheckToken() {
  try {
    const response = await API('/api/token/check', 'GET', null, true);
    if (response) {
      return response.data;
    } else {
      console.error('Token check failed:', response);
      return false;
    }
  } catch (error) {
    console.error(
      'API 호출 중 에러 발생:',
      error.response ? error.response.data : error
    );
    return false;
  }
}
