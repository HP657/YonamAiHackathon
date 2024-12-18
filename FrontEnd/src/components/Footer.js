import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-gray-200 h-12 p-2 text-center'>
      <div className='flex justify-center space-x-8'>
        <Link to='/' className='text-blue-600 hover:underline'>
          HOME
        </Link>
        <Link to='/mentoring-study' className='text-blue-600 hover:underline'>
          ROOM
        </Link>
        <Link to='/posts' className='text-blue-600 hover:underline'>
          POSTS
        </Link>
      </div>
    </footer>
  );
}
