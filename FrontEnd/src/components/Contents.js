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
import InfoPage from '../pages/InfoPage';
import PostDetailPage from '../pages/PostDetailPage';
import MakeRoomPage from '../pages/MakeRoomPage';
import MakePostPage from '../pages/MakePostPage';

export default function Contents() {
  const [userInfo, setUserInfo] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkTokenAsync = async () => {
      const response = await CheckToken();
      setUserInfo(response);
    };
    checkTokenAsync();
  }, [location]);

  return (
    <>
      {userInfo && <Header />}
      <main className='flex-1 overflow-y-auto no-scrollbar'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/mentoring-study' element={<MentoringStudyPage />} />
          <Route path='/posts' element={<PostPage />} />
          <Route path='/post/:postId' element={<PostDetailPage />} />
          <Route path='/room/:roomId' element={<RoomPage />} />
          <Route path='/info' element={<InfoPage />} />
          <Route path='/post/add' element={<MakePostPage />} />
          <Route path='/room/add' element={<MakeRoomPage />} />
        </Routes>
      </main>
      {userInfo && <Footer />}
    </>
  );
}
