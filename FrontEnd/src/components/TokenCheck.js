// import API from '../services/api';

// export default async function CheckToken() {
//   try {
//     const response = await API('/api/token/check', 'GET', null, true);
//     return response.data;
//   } catch (error) {
//     console.error('API 호출 중 에러 발생:', error);
//     return false;
//   }
// }

export default async function CheckToken() {
  return true;
}
