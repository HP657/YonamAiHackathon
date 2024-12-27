import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className='bg-blue-100 h-[50px] flex items-center justify-between px-5'>
      <button
        onClick={() => navigate('/')}
        aria-label='Go to Home'
        className='bg-transparent border-none p-0 cursor-pointer flex items-center'
      >
        <img src='/assets/logo.png' alt='Logo' className='h-10' />
        <h1 className='font-bold text-2xl ml-3'>BondLink</h1>
      </button>
    </header>
  );
}
