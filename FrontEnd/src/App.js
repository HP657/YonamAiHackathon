import { BrowserRouter } from 'react-router-dom';
import Contents from './components/Contents';
import Intro from './components/Intro';
import { useEffect, useState } from 'react';

export default function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroComplete(true);
    }, 3000);

    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
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
              <Contents />
            ) : (
              <Intro onFadeComplete={() => setIsIntroComplete(true)} />
            )}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}
