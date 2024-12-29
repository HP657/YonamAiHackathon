import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Rooms_User({ rooms }) {
  return (
    <ul>
      {rooms.map((room, index) => (
        <li key={room.id}>
          <Link to={`/room/${room.id}`}>
            <h3 className='text-xl font-semibold'>
              {room.title} | {room.topic}
            </h3>
            <p className='text-gray-700'>{room.description}</p>
            <div className='text-sm text-gray-500 mt-2'>
              <span>방장: {room.leader}</span>
            </div>
          </Link>
          {index < rooms.length - 1 && <hr className='my-4 border-gray-300' />}
        </li>
      ))}
    </ul>
  );
}

Rooms_User.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      leader: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
