import { useState, useEffect } from 'react';
import Posts from '../components/Posts';
import Rooms from '../components/Rooms_User';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import CheckToken from '../components/TokenCheck';

export default function HomePage() {
  const navigate = useNavigate();
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const tokencheck = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }

      await fetchJoinedRooms();
      await fetchRecentPosts();
    };

    const fetchJoinedRooms = async () => {
      const response = await API('/api/room/user/rooms', 'GET', null, true);
      if (response && response.data) {
        setJoinedRooms(response.data.data);
      } else {
        console.error('Failed to fetch joined rooms:', response);
        setJoinedRooms([]);
      }
    };

    const fetchRecentPosts = async () => {
      const response = await API('/api/post/all', 'GET', null, true);
      if (response && response.data) {
        setRecentPosts(response.data.data.slice(0, 3));
      } else {
        console.error('Failed to fetch recent posts:', response);
        setRecentPosts([]);
      }
    };

    tokencheck();
  }, []);

  return (
    <div className='max-w-lg mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>홈 페이지</h2>

      <section className='mb-2 flex justify-between items-center'>
        <h3 className='text-xl font-semibold'>가입한 룸</h3>
        <Link to='/mentoring-study' className='text-gray-500 '>
          더보기
        </Link>
      </section>
      <Rooms rooms={joinedRooms} />

      <section className='mt-6 mb-2 flex justify-between items-center'>
        <h3 className='text-xl font-semibold'>최근 게시물</h3>
        <Link to='/posts' className='text-gray-500 '>
          더보기
        </Link>
      </section>
      <Posts posts={recentPosts} />
    </div>
  );
}
