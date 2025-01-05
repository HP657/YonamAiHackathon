import { Link, useNavigate } from 'react-router-dom';
import Posts from '../components/Posts';
import API from '../services/api';
import { useEffect, useState } from 'react';
import CheckToken from '../components/TokenCheck';

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tokencheck = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }

      await fetchPosts();
    };
    tokencheck();

    const fetchPosts = async () => {
      const response = await API('/api/post/all', 'GET', null, true);
      if (response && response.data) {
        setPosts(response.data.data);
      } else {
        console.error('Failed to fetch posts:', response);
        setPosts([]);
      }
    };
  }, []);

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4 flex justify-between items-center'>
        <span>게시물 목록</span>
        <Link to='/post/add' className='text-black text-lg'>
          작성하기
        </Link>
      </h2>
      <ul>
        <Posts posts={posts} />
      </ul>
    </div>
  );
}
