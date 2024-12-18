import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function MainPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login');
      return;
    }

    async function verifyTokenAndFetchData() {
      try {
        const isTokenValid = await API('/api/token/check', 'GET', null, true);
        if (!isTokenValid) {
          localStorage.removeItem('accessToken');
          navigate('/login');
          return;
        }

        const response = await API('/api/user/grade', 'GET', null, true);
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        localStorage.removeItem('accessToken');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    }

    verifyTokenAndFetchData();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>Error loading user info</div>;
  }

  return (
    <div>
      <h1>너의 앱 학점은: {userInfo.grade}</h1>
    </div>
  );
}
