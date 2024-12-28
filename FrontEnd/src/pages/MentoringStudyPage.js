import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rooms from '../components/Rooms';

export default function MentoringStudyPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const roomData = [
        {
          id: 1,
          title: 'JavaScript Study Group',
          description: 'Learn JavaScript together.',
          leader: 'Alice Johnson',
          topic: 'JavaScript',
        },
        {
          id: 2,
          title: 'React Mentorship',
          description: 'Mentorship for React beginners.',
          leader: 'Bob Smith',
          topic: 'React',
        },
        {
          id: 3,
          title: 'Python Data Science',
          description: 'Exploring data science concepts using Python.',
          leader: 'Charlie Brown',
          topic: 'Python',
        },
      ];

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Fetched rooms:', roomData);
      setRooms(roomData);
    };

    fetchRooms();
  }, []);

  return (
    <div className='max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white'>
      <h2 className='text-2xl font-bold mb-4'>멘토링 & 스터디 룸</h2>

      <div className='mb-4'>
        <Link
          to='/add-room'
          className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 block text-center'
        >
          룸 추가 페이지로 이동
        </Link>
      </div>

      {rooms.length > 0 ? (
        <div className='room-list'>
          <h3 className='text-xl font-semibold mb-2'>룸 목록</h3>
          <ul className='list-none p-0'>
            <Rooms rooms={rooms} />
          </ul>
        </div>
      ) : (
        <p className='text-gray-500'>룸이 없습니다.</p>
      )}
    </div>
  );
}
