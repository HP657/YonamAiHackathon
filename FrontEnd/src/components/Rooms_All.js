import PropTypes from 'prop-types';
import API from '../services/api';

export default function Rooms_All({ rooms }) {
  const onClick = async (roomId) => {
    await API(`/api/room/${roomId}/request`, 'POST', null, true);
    alert('요청 성공');
  };

  return (
    <ul>
      {rooms.map((room, index) => (
        <li key={room.roomId}>
          <button
            onClick={() => onClick(room.roomId)}
            className='w-full text-left cursor-pointer bg-transparent'
            style={{ border: 'none', padding: '0', margin: '0' }}
          >
            <h3 className='text-xl font-semibold'>
              {room.name} | {room.topic}
            </h3>
            <p className='text-gray-700'>{room.description}</p>
            <div className='text-sm text-gray-500 mt-2'>
              <span>방장: {room.owner?.username || '정보 없음'}</span>
            </div>
          </button>
          {index < rooms.length - 1 && <hr className='my-4 border-gray-300' />}
        </li>
      ))}
    </ul>
  );
}

Rooms_All.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        userId: PropTypes.number,
        email: PropTypes.string,
        username: PropTypes.string,
        studentId: PropTypes.number,
        gpa: PropTypes.number,
      }),
      topic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
