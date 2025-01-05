import { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../components/TokenCheck';

export default function InfoPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await API('/api/user/info', 'GET', null, true);
      if (response && response.data) {
        setUserInfo(response.data.data);
      } else {
        console.error('사용자 정보를 불러오지 못했습니다:', response);
        setUserInfo(null);
      }
    };

    const fetchUserPosts = async () => {
      const response = await API('/api/post/user', 'GET', null, true);
      if (response && response.data) {
        setUserPosts(response.data.data);
      } else {
        console.error('사용자 게시물을 불러오지 못했습니다:', response);
        setUserPosts([]);
      }
    };

    const fetchData = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }
      await fetchUserInfo();
      await fetchUserPosts();
      setLoading(false);
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-lg text-gray-600'>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>내 정보</h2>
      <div className='mb-6'>
        <p className='text-lg mb-2'>
          <strong>이름:</strong> {userInfo ? userInfo.username : '정보 없음'}
        </p>
        <p className='text-lg'>
          <strong>평균 학점:</strong> {userInfo ? userInfo.gpa : '정보 없음'}
        </p>
      </div>
      <div>
        <h3 className='text-xl font-semibold text-gray-700 mb-4'>내 게시물</h3>
        <div className='border-t border-gray-300 pt-4'>
          {userPosts.length > 0 ? (
            <ul className='list-none space-y-2'>
              {userPosts.map((post) => (
                <li key={post.postId} className='text-gray-700'>
                  - {post.title}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-gray-500'>업로드한 게시물이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
