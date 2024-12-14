import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword || !userName || !studentId) {
      setError('All fields must be filled out.');
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (isNaN(studentId)) {
      setError('학번 (Student ID) must be a number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    const registerFormData = {
      email,
      password,
      userName,
      studentId,
    };

    console.log('User registered:', registerFormData);
    navigate('/');
  };

  const handleEmailVerification = () => {
    if (!email) {
      setError('Please enter your email first.');
      return;
    }

    console.log(`Sending verification email to ${email}...`);

    // 이메일 전송 성공했다고 가정
    setIsEmailSent(true);
    alert(`A verification email has been sent to ${email}`);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-96'>
        <h2 className='text-2xl font-semibold font-bold text-center mb-6'>
          회원가입
        </h2>

        <form onSubmit={handleSubmit}>
          <div className='mb-4 items-center'>
            <label htmlFor='email' className='block text-gray-700 font-bold'>
              이메일
            </label>
            <div className='flex '>
              <input
                type='email'
                id='email'
                className='w-full h-[48px] p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={email}
                placeholder='email@yc.ac.kr'
                onChange={(e) => setEmail(e.target.value)}
              />
              {isEmailSent ? (
                <button
                  type='button'
                  disabled
                  className='text-xs mt-2 ml-4 py-2 px-4 bg-gray-400 text-white font-semibold rounded-md cursor-not-allowed h-full'
                >
                  인증 완료
                </button>
              ) : (
                <button
                  type='button'
                  onClick={handleEmailVerification}
                  className='text-xs mt-2 ml-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 h-full'
                >
                  이메일 인증
                </button>
              )}
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
              placeholder='password'
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
              placeholder='password 확인'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className='mb-6'>
            <label htmlFor='name' className='block text-gray-700 font-bold'>
              이름
            </label>
            <input
              type='text'
              id='name'
              className='w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={userName}
              placeholder='홍길동'
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className='mb-4'>
            <label
              htmlFor='studentId'
              className='block text-gray-700 font-bold'
            >
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
      </div>
    </div>
  );
}
