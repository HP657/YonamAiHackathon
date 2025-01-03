import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import PropTypes from 'prop-types';
import RoomUserModal from '../components/RoomUserModal';
import ScheduleModal from '../components/ScheduleModal';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import CheckToken from '../components/TokenCheck';
import RoomRequestModal from '../components/RoomRequestModal';

export default function RoomPage() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null);
  const [roomInfo, setRoomInfo] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [usersInfo, setUsersInfo] = useState([]);
  const [myInfo, setMyInfo] = useState(null);
  const [isRoomRequestModalOpen, setIsRoomRequestModalOpen] = useState(false);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const tokencheck = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }
      fetchRoomInfo();
      connectToWebSocket();
    };
    tokencheck();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
        setIsConnected(false);
      }
    };
  }, []);

  const fetchRoomInfo = async () => {
    try {
      const [
        roomResponse,
        messageResponse,
        userResponse,
        userInfoResponse,
        scheduleResponse,
      ] = await Promise.all([
        API(`/api/room/${roomId}`, 'GET', null, true),
        API(`/api/chat/${roomId}/messages`, 'GET', null, true),
        API(`/api/room/${roomId}/users`, 'GET', null, true),
        API(`/api/user/info`, 'GET', null, true),
        API(`/api/schedules/room/${roomId}`, 'GET', null, true),
      ]);

      setMessages(messageResponse.data.data);
      setRoomInfo(roomResponse.data.data);
      setUsersInfo(
        userResponse.data.data.filter(
          (user) => user.userId !== roomResponse.data.data.owner.userId
        )
      );
      setMyInfo(userInfoResponse.data.data);
      setSchedule(scheduleResponse.data.data || null);
    } catch (error) {
      console.error('Error fetching room info:', error);
    }
  };

  const fetchSchedule = async () => {
    try {
      const scheduleResponse = await API(
        `/api/schedules/room/${roomId}`,
        'GET',
        null,
        true
      );
      setSchedule(scheduleResponse.data.data || null);
    } catch (error) {
      console.error('Error fetching schedule:', error);
    }
  };

  const connectToWebSocket = () => {
    if (isConnected) return;

    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);
    const token = localStorage.getItem('accessToken');

    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
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

        client.subscribe(
          `/topic/room/${roomId}/schedules`,
          { Authorization: `Bearer ${token}` },
          fetchSchedule
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
      user: { username: `${myInfo.username}` },
      content: messageText,
    };

    setMessages((prevMessages) => [...prevMessages, message]);

    stompClient.send(
      `/app/sendMessage/${roomId}`,
      { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
      JSON.stringify(message)
    );

    setMessageText('');
  };

  const handleScheduleUpdated = (newSchedule) => {
    setSchedule(newSchedule);
  };

  if (!roomInfo) return <></>;

  const renderRoomInfo = () => (
    <div className='bg-gray-100 p-4 rounded-lg mb-4'>
      <h3 className='font-semibold'>{roomInfo.name}</h3>
      <p>{roomInfo.description}</p>
      <p className='text-sm text-gray-600'>By {roomInfo.owner.username}</p>
    </div>
  );

  const renderSchedule = () => (
    <div className='bg-yellow-100 p-4 rounded-lg mb-4'>
      <h3 className='font-semibold'>Scheduled Meetings</h3>
      {schedule ? (
        <ul>
          <li key={schedule.scheduleId} className='mb-2'>
            <strong>{schedule.title}</strong> - {schedule.date} {schedule.time}
          </li>
        </ul>
      ) : (
        <p>스케줄이 없습니다.</p>
      )}
    </div>
  );

  const renderMessages = () => (
    <div className='flex-1 overflow-y-auto border border-gray-300 rounded-lg p-4 mb-4 max-h-96 no-scrollbar'>
      <div className='messages'>
        {messages.map((msg, index) => (
          <div key={index} className='message mb-2'>
            <strong>{msg.user?.username || msg.room?.owner?.username}:</strong>{' '}
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );

  const renderActionButtons = () => (
    <div className='flex-1 flex justify-between mb-2'>
      {myInfo && roomInfo.owner.userId === myInfo.userId && (
        <>
          <button
            onClick={() => setIsUserModalOpen(true)}
            className='bg-blue-500 text-white rounded p-2 hover:bg-blue-600 flex-1 mr-2'
          >
            유저 정보 보기
          </button>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className='bg-green-500 text-white rounded p-2 hover:bg-green-600 flex-1 ml-2'
          >
            일정잡기
          </button>
        </>
      )}
    </div>
  );

  const renderMessageInput = () => (
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
  );

  return (
    <div className='flex flex-col max-w-lg mx-auto p-4'>
      <div className='flex items-center mb-4 justify-between'>
        <h2 className='text-xl font-bold'>Room {roomId}</h2>
        {myInfo && roomInfo.owner.userId === myInfo.userId && (
          <button
            onClick={() => setIsRoomRequestModalOpen(true)}
            className='text-black'
          >
            룸 요청
          </button>
        )}
      </div>

      {renderRoomInfo()}
      {renderSchedule()}
      {renderMessages()}
      {renderActionButtons()}
      {renderMessageInput()}

      <RoomUserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        usersInfo={usersInfo}
      />
      <ScheduleModal
        roomId={roomId}
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onScheduleUpdated={handleScheduleUpdated}
      />
      <RoomRequestModal
        roomId={roomId}
        isOpen={isRoomRequestModalOpen}
        onClose={() => setIsRoomRequestModalOpen(false)}
      />
    </div>
  );
}

RoomPage.propTypes = {
  roomId: PropTypes.number.isRequired,
};
