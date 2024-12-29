import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function ScheduleModal({ isOpen, onClose }) {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDescription, setMeetingDescription] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  if (!isOpen) return null;

  const handleSchedule = () => {
    console.log('Scheduled Meeting:', {
      title: meetingTitle,
      description: meetingDescription,
      date: meetingDate,
      time: meetingTime,
    });

    setMeetingTitle('');
    setMeetingDescription('');
    setMeetingDate('');
    setMeetingTime('');
    onClose();
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white rounded-lg p-4 max-w-sm w-full'>
        <h2 className='text-lg font-bold mb-2'>Schedule an Appointment</h2>
        <div className='mb-4'>
          <label htmlFor='meetingTitle' className='block mb-1'>
            Meeting Title
          </label>
          <input
            id='meetingTitle'
            type='text'
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            className='border border-gray-300 rounded p-2 w-full'
            placeholder='Enter meeting title'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='meetingDescription' className='block mb-1'>
            Description
          </label>
          <textarea
            id='meetingDescription'
            value={meetingDescription}
            onChange={(e) => setMeetingDescription(e.target.value)}
            className='border border-gray-300 rounded p-2 w-full'
            placeholder='Enter meeting description'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='meetingDate' className='block mb-1'>
            Date
          </label>
          <input
            id='meetingDate'
            type='date'
            value={meetingDate}
            onChange={(e) => setMeetingDate(e.target.value)}
            className='border border-gray-300 rounded p-2 w-full'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='meetingTime' className='block mb-1'>
            Time
          </label>
          <input
            id='meetingTime'
            type='time'
            value={meetingTime}
            onChange={(e) => setMeetingTime(e.target.value)}
            className='border border-gray-300 rounded p-2 w-full'
          />
        </div>
        <button
          onClick={handleSchedule}
          className='mr-2 mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600'
        >
          일정 정하기
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

ScheduleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
