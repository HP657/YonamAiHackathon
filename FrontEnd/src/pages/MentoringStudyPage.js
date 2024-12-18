import React, { useState, useEffect } from 'react';
import API from '../services/api';

const MentoringStudyPage = () => {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [discription, setDiscription] = useState('');

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await API('/api/room/all', 'GET', null, true);
        console.log(response);
        setRooms(response.data);
      } catch (error) {
        console.error('룸 데이터를 가져오는 데 실패했습니다:', error);
      }
    }

    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    if (roomName.trim() === '' || discription.trim() === '') return;

    try {
      const response = await API(
        '/api/room/create',
        'POST',
        { roomName, discription },
        true
      );
      setRooms([...rooms, response.data]);
      setRoomName('');
      setDiscription('');
    } catch (error) {
      console.error('룸 추가 실패:', error);
    }
  };

  return (
    <div>
      <h2>멘토링 & 스터디 룸</h2>

      <div>
        <input
          type='text'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder='새로운 룸 이름'
        />
        <textarea
          value={discription}
          onChange={(e) => setDiscription(e.target.value)}
          placeholder='룸 설명'
        />
        <button onClick={handleAddRoom}>룸 추가</button>
      </div>

      {rooms.length > 0 ? (
        <div>
          <h3>룸 목록</h3>
          <ul>
            {rooms.map((room) => (
              <li key={room.id}>
                <strong>{room.name}</strong>: {room.description}{' '}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>룸이 없습니다.</p>
      )}
    </div>
  );
};

export default MentoringStudyPage;
