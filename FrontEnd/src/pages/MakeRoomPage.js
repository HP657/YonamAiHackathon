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
    <div className='min-h-screen bg-gray-50 p-8'>
      <h1 className='text-3xl font-bold text-center mb-8 text-blue-600'>
        룸 만들기
      </h1>
      <form onSubmit={handleSubmit} className='max-w-2xl mx-auto space-y-6'>
        <div>
          <label
            htmlFor='roomName'
            className='block text-gray-700 font-medium mb-2'
          >
            룸 이름
          </label>
          <input
            id='roomName'
            type='text'
            placeholder='룸 이름을 입력하세요'
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-gray-700 font-medium mb-2'
          >
            설명
          </label>
          <textarea
            id='description'
            placeholder='룸에 대한 설명을 작성하세요'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>
        <div>
          <label
            htmlFor='topic'
            className='block text-gray-700 font-medium mb-2'
          >
            주제
          </label>
          <input
            id='topic'
            type='text'
            placeholder='룸의 주제를 입력하세요'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition'
        >
          생성하기
        </button>
      </form>
    </div>
  );
}
