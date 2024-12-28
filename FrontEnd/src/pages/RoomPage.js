import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import PropTypes from 'prop-types';

export default function RoomPage({ roomId }) {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const token = localStorage.getItem('accessToken');

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
      content: messageText,
    };

    stompClient.send(
      `/app/sendMessage/${roomId}`,
      { Authorization: `Bearer ${token}` },
      JSON.stringify(message)
    );

    setMessageText('');
  };

  return (
    <div className='max-w-lg mx-auto'>
      <div>
        <h2>Room {roomId}</h2>
        <button
          onClick={connectToWebSocket}
          disabled={isConnected}
          className='connect-button'
        >
          {isConnected ? 'Connected' : 'Connect to Room'}
        </button>
        <div className='messages'>
          {messages.map((msg, index) => (
            <div key={index} className='message'>
              <strong>{msg.sender}:</strong> {msg.content}
            </div>
          ))}
        </div>
        <div className='input-group'>
          <input
            type='text'
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder='Type a message'
            className='message-input'
          />
          <button onClick={handleSendMessage} className='send-button'>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

RoomPage.propTypes = {
  roomId: PropTypes.number.isRequired,
};
