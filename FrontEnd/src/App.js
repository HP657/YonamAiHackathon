import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Contents from './components/Contents';
import Intro from './components/Intro';
import { useEffect, useState } from 'react';
import API from './services/api';

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [userInfo, setUserInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API('/api/token/check', 'GET', null, true);
        setUserInfo(response.data);
      } catch (error) {
        console.error('API 호출 중 에러 발생:', error);
        setUserInfo(false);
      }
    };

    fetchData();
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 3000);

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className='flex justify-center items-center bg-gray-100'>
        <div
          className='w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl xl:max-w-screen-2xl h-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col border-[1px] border-gray-300'
          style={{
            height: viewportHeight ? `${viewportHeight}px` : 'auto',
          }}
        >
          <div className='flex-1 aspect-[10/16] overflow-hidden flex flex-col'>
            {isIntroComplete ? (
              <>
                {userInfo && <Header />}
                <main className='flex-1 overflow-y-auto p-4 no-scrollbar'>
                  <Contents user={userInfo} />
                </main>
                {userInfo && <Footer />}
              </>
            ) : (
              <Intro onFadeComplete={() => setIsIntroComplete(true)} />
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
