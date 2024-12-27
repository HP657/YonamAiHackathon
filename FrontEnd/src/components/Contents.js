import { Route, Routes, useLocation } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MentoringStudyPage from '../pages/MentoringStudyPage';
import Footer from './Footer';
import Header from './Header';
import { useEffect, useState } from 'react';
import PostPage from '../pages/PostPage';
import RoomPage from '../pages/RoomPage';
import CheckToken from './TokenCheck';

export default function Contents() {
  const [userInfo, setUserInfo] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setUserInfo(CheckToken());
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
          <Route path='room' element={<RoomPage />} />
        </Routes>
      </main>
      {userInfo && <Footer />}
    </>
  );
}
