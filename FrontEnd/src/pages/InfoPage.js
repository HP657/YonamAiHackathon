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
        console.error('Failed to fetch user info:', response);
        setUserInfo(null);
      }
    };

    const fetchUserPosts = async () => {
      const response = await API('/api/post/user', 'GET', null, true);
      if (response && response.data) {
        setUserPosts(response.data.data);
      } else {
        console.error('Failed to fetch user posts:', response);
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
    return <div>Loading...</div>;
  }

  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>User Information</h2>
      <div className='mb-4'>
        <p className='text-lg'>
          <strong>Name:</strong> {userInfo ? userInfo.username : 'N/A'}
        </p>
        <p className='text-lg'>
          <strong>GPA:</strong> {userInfo ? userInfo.gpa : 'N/A'}
        </p>
      </div>
      <div>
        <h3 className='text-xl font-semibold mb-2'>Your Posts</h3>
        <ul className='list-disc pl-5'>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <li key={post.postId} className='mb-1'>
                {post.title}
              </li>
            ))
          ) : (
            <li className='mb-1'>No posts available.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
