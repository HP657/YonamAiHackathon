import { useEffect } from 'react';
import API from './services/api';

export default function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API('/', 'GET', null, true);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='h-full w-auto aspect-[9/16] bg-white rounded-lg shadow-lg overflow-hidden'></div>
    </div>
  );
}
