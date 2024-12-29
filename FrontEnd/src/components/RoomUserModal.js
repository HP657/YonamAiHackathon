import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RoomUserModal({ isOpen, onClose, usersInfo }) {
  const [selectedUser, setSelectedUser] = useState('');
  const [evaluation, setEvaluation] = useState('');

  if (!isOpen) return null;

  const handleUserChange = (event) => {
    const userEmail = event.target.value;
    setSelectedUser(userEmail);
    const user = usersInfo.find((user) => user.email === userEmail);
    setEvaluation(user ? user.evaluation || '' : '');
  };

  const handleSubmit = () => {
    console.log('Evaluation submitted for:', selectedUser, evaluation);
    setSelectedUser('');
    setEvaluation('');
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-4 max-w-sm w-full'>
        <h2 className='text-lg font-bold mb-2'>User Evaluation</h2>

        <label htmlFor='userSelect' className='block mb-1'>
          Select User
        </label>
        <select
          id='userSelect'
          value={selectedUser}
          onChange={handleUserChange}
          className='border border-gray-300 rounded p-2 w-full mb-4'
        >
          <option value='' disabled selected>
            Select a user
          </option>
          {usersInfo.map((user, index) => (
            <option key={index} value={user.email}>
              {user.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder='Enter evaluation...'
          value={evaluation}
          onChange={(e) => setEvaluation(e.target.value)}
          className='border border-gray-300 rounded p-2 w-full mb-4'
        />

        <button
          onClick={handleSubmit}
          className='mr-2 mt-2 bg-blue-500 text-white rounded p-2 hover:bg-blue-600'
        >
          유저 평가하기
        </button>
        <button
          onClick={onClose}
          className='mt-2 bg-gray-300 text-black rounded p-2 hover:bg-gray-400'
        >
          닫기
        </button>
      </div>
    </div>
  );
}

RoomUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  usersInfo: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};
