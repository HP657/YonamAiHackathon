import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PropTypes from 'prop-types';
import MentoringStudyPage from '../pages/MentoringStudyPage';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useState } from 'react';
import API from '../services/api';
import PostPage from '../pages/PostPage';

export default function Contents() {
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  const fetchUserData = async () => {
    try {
      const response = await API('/api/token/check', 'GET', null, true);
      setUserInfo(response.data);
      console.log(response);
    } catch (error) {
      console.error('API 호출 중 에러 발생:', error);
      setUserInfo(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [location]);

  return (
    <>
      {userInfo && <Header />}
      <main className='flex-1 overflow-y-auto p-4 no-scrollbar'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/mentoring-study' element={<MentoringStudyPage />} />
          <Route path='/posts' element={<PostPage />} />
        </Routes>
      </main>
      {userInfo && <Footer />}
    </>
  );
}

Contents.propTypes = {
  user: PropTypes.bool.isRequired,
};
