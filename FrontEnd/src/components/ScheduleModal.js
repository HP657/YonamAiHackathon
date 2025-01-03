import React, { useState } from 'react';
import PropTypes from 'prop-types';
import API from '../services/api';

export default function ScheduleModal({
  roomId,
  isOpen,
  onClose,
  onScheduleUpdated,
}) {
  const [meetingTitle, setMeetingTitle] = useState('');
  const [meetingDate, setMeetingDate] = useState('');
  const [meetingTime, setMeetingTime] = useState('');

  if (!isOpen) return null;

  const handleSchedule = async () => {
    try {
      const response = await API(
        `/api/schedules/room/${roomId}`,
        'POST',
        {
          title: meetingTitle,
          date: meetingDate,
          time: meetingTime,
        },
        true
      );

      const newSchedule = response.data.data;
      onScheduleUpdated(newSchedule);
      setMeetingTitle('');
      setMeetingDate('');
      setMeetingTime('');
      onClose();
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
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
  roomId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onScheduleUpdated: PropTypes.func.isRequired,
};
