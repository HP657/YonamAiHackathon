import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import PropTypes from 'prop-types';
import RoomUserModal from '../components/RoomUserModal';
import ScheduleModal from '../components/ScheduleModal';

export default function RoomPage({ roomId }) {
  const [stompClient, setStompClient] = useState(null);
  const [roomInfo, setRoomInfo] = useState({
    id: 5,
    title: 'Web Development Trends',
    description: 'The latest trends and innovations in web development.',
    author: 'Charlie Davis',
    date: '2023-10-05',
  });
  const [messages, setMessages] = useState([
    { sender: 'User1', content: 'Hello everyone!' },
    { sender: 'User2', content: 'Hi User1!' },
    { sender: 'User3', content: 'How are you all?' },
    { sender: 'User1', content: 'I am good, thanks!' },
    { sender: 'User2', content: 'What about you?' },
    { sender: 'User3', content: 'Doing well, just busy with work.' },
    { sender: 'User1', content: 'Same here!' },
    { sender: 'User2', content: 'Let’s catch up later.' },
    { sender: 'User3', content: 'Sounds good!' },
  ]);
  const [messageText, setMessageText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    connectToWebSocket();
    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  const connectToWebSocket = () => {
    if (isConnected) return;

    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('Connected to WebSocket');
        setIsConnected(true);

        client.subscribe(
          `/topic/room/${roomId}/messages`,
          { Authorization: `Bearer ${token}` },
          (messageOutput) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              JSON.parse(messageOutput.body),
            ]);
          }
        );

        setStompClient(client);
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
  };

  const handleSendMessage = () => {
    if (messageText.trim() === '' || !stompClient || !stompClient.connected) {
      return;
    }

    const message = {
      sender: 'You',
      content: messageText,
    };

    setMessages((prevMessages) => [...prevMessages, message]);

    stompClient.send(
      `/app/sendMessage/${roomId}`,
      { Authorization: `Bearer ${token}` },
      JSON.stringify(message)
    );

    setMessageText('');
  };

  const usersInfo = [
    { name: 'Charlie Davis', email: 'charlie.davis@example.com' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { name: 'Bob Smith', email: 'bob.smith@example.com' },
  ];

  return (
    <div className='flex flex-col max-w-lg mx-auto p-4'>
      <h2 className='text-xl font-bold mb-4'>Room {roomId}</h2>

      <div className='bg-gray-100 p-4 rounded-lg mb-4'>
        <h3 className='font-semibold'>{roomInfo.title}</h3>
        <p>{roomInfo.description}</p>
        <p className='text-sm text-gray-600'>
          By {roomInfo.author} on {roomInfo.date}
        </p>
      </div>

      <div className='flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 max-h-96 no-scrollbar'>
        <div className='messages'>
          {messages.map((msg, index) => (
            <div key={index} className='message mb-2'>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
      </div>
      <div className='flex-1 flex justify-between mb-2'>
        <button
          onClick={() => setIsUserModalOpen(true)}
          className='bg-blue-500 text-white rounded p-2 hover:bg-blue-600 flex-1 mr-2'
        >
          유저 정보 보기{' '}
        </button>
        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className='bg-green-500 text-white rounded p-2 hover:bg-green-600 flex-1 ml-2'
        >
          일정잡기{' '}
        </button>
      </div>

      <div className='input-group flex items-center mb-4'>
        <input
          type='text'
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder='Type a message'
          className='flex-1 border border-gray-300 rounded-l-lg p-2'
        />
        <button
          onClick={handleSendMessage}
          className='bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600'
        >
          Send
        </button>
      </div>

      <RoomUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        usersInfo={usersInfo}
      />
      <ScheduleModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </div>
  );
}

RoomPage.propTypes = {
  roomId: PropTypes.number.isRequired,
};
