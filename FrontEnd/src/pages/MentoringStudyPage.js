import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Rooms_All from '../components/Rooms_All';
import Rooms_User from '../components/Rooms_User';
import API from '../services/api';
import CheckToken from '../components/TokenCheck';

export default function MentoringStudyPage() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [userRooms, setUserRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('roomList');

  useEffect(() => {
    const initialize = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }
      await fetchRooms();
    };
    initialize();
  }, [navigate]);

  const fetchRooms = async () => {
    try {
      const [response_All, response_User] = await Promise.all([
        API('/api/room/all', 'GET', null, true),
        API('/api/room/user/rooms', 'GET', null, true),
      ]);

      const allRooms = response_All?.data?.data || [];
      const userRoomList = response_User?.data?.data || [];

      const userRoomIds = userRoomList.map((room) => room.roomId);
      const availableRooms = allRooms.filter(
        (room) => !userRoomIds.includes(room.roomId)
      );

      setRooms(availableRooms);
      setUserRooms(userRoomList);
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setRooms([]);
      setUserRooms([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredRooms = (view === 'userRooms' ? userRooms : rooms).filter(
    (room) => room.name.toLowerCase().includes(searchTerm)
  );

  const toggleView = () => {
    setView((prevView) =>
      prevView === 'userRooms' ? 'roomList' : 'userRooms'
    );
    setSearchTerm('');
  };

  return (
    <div className='max-w-md mx-auto p-6 border border-gray-300 rounded-lg bg-white'>
      <h2 className='text-2xl font-bold mb-4'>멘토링 & 스터디 룸</h2>

      <div className='mb-4'>
        <Link
          to='/room/add'
          className='w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 block text-center'
        >
          룸 추가 페이지로 이동
        </Link>
      </div>

      <div className='flex justify-between mb-4'>
        <button
          onClick={toggleView}
          className={`flex-1 p-2 rounded ${
            view === 'roomList'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          룸 목록
        </button>
        <button
          onClick={toggleView}
          className={`flex-1 p-2 rounded ${
            view === 'userRooms'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-black'
          }`}
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
          className='border border-gray-300 rounded p-2 w-full'
        />
      </div>

      <div className='flex'>
        {view === 'roomList' ? (
          <div className='flex-1'>
            <h3 className='text-xl font-semibold mb-2'>룸 목록</h3>
            {filteredRooms.length > 0 ? (
              <Rooms_All rooms={filteredRooms} />
            ) : (
              <p className='text-gray-500'>룸이 없습니다.</p>
            )}
          </div>
        ) : (
          <div className='flex-1'>
            <h3 className='text-xl font-semibold mb-2'>내가 속한 룸</h3>
            {filteredRooms.length > 0 ? (
              <Rooms_User rooms={filteredRooms} />
            ) : (
              <p className='text-gray-500'>가입한 룸이 없습니다.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
