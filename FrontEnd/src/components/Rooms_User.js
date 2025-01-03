import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Rooms_User({ rooms }) {
  return (
    <>
      {rooms.length > 0 ? (
        <ul>
          {rooms.map((room, index) => (
            <li key={room.roomId}>
              <Link to={`/room/${room.roomId}`}>
                <h3 className='text-xl font-semibold'>
                  {room.name} | {room.topic}
                </h3>
                <p className='text-gray-700'>{room.description}</p>
                <div className='text-sm text-gray-500 mt-2'>
                  <span>방장: {room.owner.username}</span>
                </div>
              </Link>
              {index < rooms.length - 1 && (
                <hr className='my-4 border-gray-300' />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>가입한 스터디가 없습니다.</p>
      )}
    </>
  );
}

Rooms_User.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      roomId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
