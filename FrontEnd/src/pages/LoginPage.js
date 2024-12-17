import { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LoginPage({ user }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    const loginFormData = {
      email,
      password,
    };
    setError('');
    const response = await API('/api/user/login', 'POST', loginFormData, false);
    console.log(response.data.data.token);
    localStorage.removeItem('accessToken');
    localStorage.setItem('accessToken', response.data.data.token);
    navigate('/');
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-semibold text-center mb-6'>로그인</h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 font-bold'>
              이메일
            </label>
            <input
              type='email'
              id='email'
              className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='email@yc.ac.kr'
            />
          </div>

          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 font-bold'>
              비밀번호
            </label>
            <input
              type='password'
              id='password'
              className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='비밀번호'
            />
          </div>

          {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

          <button
            type='submit'
            className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  user: PropTypes.bool.isRequired,
};
