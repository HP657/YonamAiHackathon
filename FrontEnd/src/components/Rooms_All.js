import PropTypes from 'prop-types';

export default function Rooms_All({ rooms }) {
  const onClick = (roomTitle) => {
    alert(`You clicked on: ${roomTitle}`);
  };

  return (
    <ul>
      {rooms.map((room, index) => (
        <li key={room.id}>
          <button
            onClick={() => onClick(room.title)}
            className='w-full text-left cursor-pointer bg-transparent'
            style={{ border: 'none', padding: '0', margin: '0' }}
          >
            <h3 className='text-xl font-semibold'>
              {room.title} | {room.topic}
            </h3>
            <p className='text-gray-700'>{room.description}</p>
            <div className='text-sm text-gray-500 mt-2'>
              <span>방장: {room.leader}</span>
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
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      leader: PropTypes.string.isRequired,
      topic: PropTypes.string.isRequired,
    })
  ).isRequired,
};
