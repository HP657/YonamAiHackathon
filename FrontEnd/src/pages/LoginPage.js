import { useState } from 'react';
import API from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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

    const loginFormData = { email, password };
    setError('');

    try {
      const response = await API(
        '/api/user/login',
        'POST',
        loginFormData,
        false
      );
      const token = response?.data?.data?.token;
      if (token) {
        localStorage.setItem('accessToken', token);
        navigate('/');
      } else {
        setError('로그인 실패: 토큰을 받지 못했습니다.');
      }
    } catch (error) {
      console.error('로그인 중 오류가 발생했습니다:', error);
      setError('로그인 실패: 잘못된 이메일 또는 비밀번호입니다.');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-blue-100'>
      <div className='flex justify-center mb-6'>
        <img src='/assets/logo.png' alt='Logo' className='h-16' />
      </div>
      <h2 className='text-2xl font-semibold text-center mb-6'>로그인</h2>

      <form onSubmit={handleSubmit} className='w-full max-w-sm px-4'>
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
            placeholder='email@st.yc.ac.kr'
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
            placeholder='비밀번호 입력'
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
      <p className='mt-4 text-gray-500'>
        아직 회원이 아니시라면{' '}
        <Link to='/register' className='text-blue-600 font-bold'>
          회원가입
        </Link>{' '}
        하기
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  user: PropTypes.bool.isRequired,
};
