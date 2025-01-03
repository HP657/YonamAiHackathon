import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../components/TokenCheck';

export default function MakeRoomPage() {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [topic, setTopic] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const tokencheck = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }
    };
    tokencheck();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await API(
      '/api/room/create',
      'POST',
      { roomName, description, topic },
      true
    );

    if (response && response.data) {
      alert('룸이 생성되었습니다.');
      navigate('/mentoring-study');
    } else {
      console.error('Failed to create room:', response);
      alert('룸 생성에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Room Name'
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />
        <input
          type='text'
          placeholder='Topic'
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
