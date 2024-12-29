import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rooms_All from '../components/Rooms_All';
import Rooms_User from '../components/Rooms_User';

export default function MentoringStudyPage() {
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('roomList');

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
        {
          id: 4,
          title: 'Advanced JavaScript',
          description: 'Deep dive into JavaScript concepts.',
          leader: 'David Wilson',
          topic: 'JavaScript',
        },
        {
          id: 5,
          title: 'Data Science with Python',
          description: 'Learn data science using Python.',
          leader: 'Eve Davis',
          topic: 'Python',
        },
      ];

      setRooms(roomData);
      setFilteredRooms(roomData);

      const userRoomData = [
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
      ];
      setUserRooms(userRoomData);
    };

    fetchRooms();
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filtered = view === 'userRooms' ? userRooms : rooms;
    const filteredResults = filtered.filter((room) =>
      room.title.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredRooms(filteredResults);
  };

  const toggleView = () => {
    setView((prevView) =>
      prevView === 'userRooms' ? 'roomList' : 'userRooms'
    );
    setSearchTerm('');
    setFilteredRooms(view === 'userRooms' ? rooms : userRooms);
  };

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

      <div className='flex justify-between mb-4'>
        <button
          onClick={toggleView}
          className={`flex-1 p-2 rounded ${view === 'roomList' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          룸 목록
        </button>
        <button
          onClick={toggleView}
          className={`flex-1 p-2 rounded ${view === 'userRooms' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
        >
          내가 속한 룸
        </button>
      </div>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search rooms...'
          value={searchTerm}
          onChange={handleSearch}
          className='border border-gray-300 rounded p-2 w-full mb-2'
        />
      </div>

      <div className='flex'>
        {view === 'roomList' && (
          <div className='flex-1'>
            <h3 className='text-xl font-semibold mb-2'>룸 목록</h3>
            {rooms.length > 0 ? (
              <ul className='list-none p-0'>
                <Rooms_All
                  rooms={filteredRooms.length > 0 ? filteredRooms : rooms}
                />
              </ul>
            ) : (
              <p className='text-gray-500'>룸이 없습니다.</p>
            )}
          </div>
        )}

        {view === 'userRooms' && (
          <div className='flex-1'>
            <h3 className='text-xl font-semibold mb-2'>내가 속한 룸</h3>
            {userRooms.length > 0 ? (
              <ul className='list-none p-0 mb-4'>
                <Rooms_User
                  rooms={filteredRooms.length > 0 ? filteredRooms : userRooms}
                />
              </ul>
            ) : (
              <p className='text-gray-500'>가입한 룸이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
