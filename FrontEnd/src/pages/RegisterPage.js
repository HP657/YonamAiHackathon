import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUserName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleEmailVerification = async () => {
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    const response = await API(
      '/api/user/email/send',
      'POST',
      { email },
      false
    );
    console.log(response);
    setIsEmailSent(true);
    if (response.status === 200) {
      setError('');
    } else {
      setError('이메일 인증 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleVerificationCodeSubmit = async () => {
    if (!verificationCode) {
      setError('인증번호를 입력해주세요.');
      return;
    }

    const response = await API(
      '/api/user/email/verification',
      'POST',
      { email, code: verificationCode },
      false
    );
    console.log(response);
    if (response.status === 200) {
      setIsVerified(true);
      setError('');
    } else {
      setError('잘못된 인증번호입니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !username ||
      !studentId ||
      !isVerified
    ) {
      setError('모든 항목을 작성하고 이메일 인증을 완료해주세요.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      if (!email.endsWith('@st.yc.ac.kr'))
        setError('유효한 이메일을 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    const registerFormData = {
      email,
      password,
      username,
      studentId,
    };

    const response = await API(
      '/api/user/register',
      'POST',
      registerFormData,
      false
    );
    console.log(response);
    if (response.data.status === 200) {
      navigate('/login');
    } else {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className='flex justify-center mb-6'>
        <img src='/assets/logo.png' alt='Logo' className='h-16' />
      </div>
      <h2 className='text-2xl font-semibold text-center mb-6'>회원가입</h2>

      <form onSubmit={handleSubmit} className='w-full max-w-sm px-4'>
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-bold'>
            이메일
          </label>
          <div className='flex items-center'>
            <input
              type='email'
              id='email'
              className={`w-full h-[48px] p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isVerified ? 'bg-gray-300' : ''
              }`}
              value={email}
              placeholder='email@st.yc.ac.kr'
              onChange={(e) => setEmail(e.target.value)}
              disabled={isVerified}
            />
            <button
              type='button'
              onClick={handleEmailVerification}
              className={`mt-2 text-xs ml-4 py-2 px-4 ${
                isEmailSent
                  ? 'bg-gray-400 '
                  : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              } text-white font-semibold rounded-md`}
              disabled={isVerified}
            >
              {isEmailSent ? '재요청하기' : '이메일 인증'}
            </button>
          </div>
        </div>

        <div className='mb-4'>
          <label
            htmlFor='verificationCode'
            className='block text-gray-700 font-bold'
          >
            인증번호
          </label>
          <div className='flex items-center'>
            <input
              type='text'
              id='verificationCode'
              className={` w-full h-[48px] p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isVerified ? 'bg-gray-300 ' : ''
              }`}
              value={verificationCode}
              placeholder='인증번호 입력'
              onChange={(e) => setVerificationCode(e.target.value)}
              disabled={isVerified}
            />
            <button
              type='button'
              onClick={handleVerificationCodeSubmit}
              className={`mt-2 text-xs ml-4 py-2 px-4 ${
                isVerified
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 focus:ring-green-500'
              } text-white font-semibold rounded-md`}
              disabled={isVerified}
            >
              {isVerified ? '인증 완료' : '인증하기'}
            </button>
          </div>
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
            placeholder='비밀번호 입력'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label
            htmlFor='confirmPassword'
            className='block text-gray-700 font-bold'
          >
            비밀번호 확인
          </label>
          <input
            type='password'
            id='confirmPassword'
            className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={confirmPassword}
            placeholder='비밀번호 재입력'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-bold'>
            이름
          </label>
          <input
            type='text'
            id='name'
            className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={username}
            placeholder='홍길동'
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='studentId' className='block text-gray-700 font-bold'>
            학번 (입학년도)
          </label>
          <input
            type='number'
            id='studentId'
            className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={studentId}
            placeholder='학번 (예: 25)'
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

        <button
          type='submit'
          className='w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          회원가입
        </button>
      </form>
      <p className='mt-4 text-gray-500'>
        이미 회원이 이시라면{' '}
        <Link to='/login' className='text-blue-600 font-bold'>
          로그인
        </Link>{' '}
        하기
      </p>
    </div>
  );
}
