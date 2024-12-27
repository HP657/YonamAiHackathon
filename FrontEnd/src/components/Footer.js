import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-gray-200 h-16 p-2 text-center'>
      <div className='flex justify-center items-center h-full space-x-[50px]'>
        <Link to='/' className='flex flex-col items-center hover:no-underline'>
          <img src='/assets/home.png' alt='Home' className='h-6' />
          <span className='text-xs font-bold'>HOME</span>
        </Link>
        <Link
          to='/mentoring-study'
          className='flex flex-col items-center hover:no-underline'
        >
          <img src='/assets/lens.png' alt='Room' className='h-6' />
          <span className='text-xs font-bold'>ROOM</span>
        </Link>
        <Link
          to='/posts'
          className='flex flex-col items-center hover:no-underline'
        >
          <img src='/assets/add_post.png' alt='Add Post' className='h-6' />
          <span className='text-xs font-bold'>POST</span>
        </Link>
        <Link
          to='/posts'
          className='flex flex-col items-center hover:no-underline'
        >
          <img src='/assets/person.png' alt='My Info' className='h-6' />
          <span className='text-xs font-bold'>MY</span>
        </Link>
      </div>
    </footer>
  );
}
