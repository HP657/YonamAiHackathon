import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 이메일과 비밀번호가 비어있는지 체크
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 이메일 유효성 검사
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    const loginFormData = { email, password };
    setError(''); // 로그인 시도 전 에러 메시지 초기화

    try {
      // API를 통해 로그인 시도
      const response = await API(
        '/api/user/login',
        'POST',
        loginFormData,
        false
      );

      // 로그인 성공 시 토큰을 로컬 스토리지에 저장
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

          {/* 에러 메시지가 있을 경우 표시 */}
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
  user: PropTypes.bool.isRequired, // user prop이 boolean 값이어야 함
};
