import { useEffect, useState, useCallback } from 'react';
import API from '../services/api';
import PropTypes from 'prop-types';

export default function RoomRequestModal({ roomId, isOpen, onClose }) {
  const [pendingRequests, setPendingRequests] = useState([]);

  const fetchPendingRequests = useCallback(async () => {
    try {
      const response = await API(
        `/api/room/${roomId}/requests/pending`,
        'GET',
        null,
        true
      );
      setPendingRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    }
  }, [roomId]);

  useEffect(() => {
    if (isOpen) {
      fetchPendingRequests();
    }
  }, [isOpen, fetchPendingRequests]);

  const handleAcceptRequest = async (requestId) => {
    try {
      await API(`/api/room/request/${requestId}/approve`, 'POST', null, true);
      fetchPendingRequests();
    } catch (error) {
      console.error('Error accepting request:', error);
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      await API(`/api/room/request/${requestId}/reject`, 'POST', null, true);
      fetchPendingRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-4 max-w-md w-full'>
        <h2 className='text-xl font-bold mb-4'>Pending Requests</h2>
        <ul>
          {pendingRequests.map((request) => (
            <li
              key={request.requestId}
              className='flex justify-between items-center mb-2'
            >
              <span>
                {request.user.username} / {request.user.studentId}
                {'학번'} / {request.user.gpa}
                {'학점'}
              </span>
              <div>
                <button
                  onClick={() => handleAcceptRequest(request.requestId)}
                  className='bg-green-500 text-white rounded p-1 mr-2'
                >
                  승인
                </button>
                <button
                  onClick={() => handleRejectRequest(request.requestId)}
                  className='bg-red-500 text-white rounded p-1'
                >
                  거절
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className='bg-blue-500 text-white rounded p-2 mt-4'
        >
          Close
        </button>
      </div>
    </div>
  );
}

RoomRequestModal.propTypes = {
  roomId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
