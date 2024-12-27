import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MentoringStudyPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API or JSON file
    const fetchRooms = async () => {
      const roomData = [
        {
          id: 1,
          name: 'JavaScript Study Group',
          description: 'A group for learning and discussing JavaScript.',
        },
        {
          id: 2,
          name: 'React Mentorship',
          description: 'Mentorship sessions for React beginners.',
        },
        {
          id: 3,
          name: 'Python Data Science',
          description: 'Exploring data science concepts using Python.',
        },
      ];

      // Simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update the state with the fetched data
      setRooms(roomData);
    };

    fetchRooms();
  }, []); // Empty dependency array means this runs once when the component mounts

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
            {rooms.map((room) => (
              <li key={room.id} className='p-2 border-b border-gray-200'>
                <strong className='block text-lg'>{room.name}</strong>
                <span>{room.description}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className='text-gray-500'>룸이 없습니다.</p>
      )}
    </div>
  );
}
