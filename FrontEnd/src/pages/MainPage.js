import { useState, useEffect } from 'react';
import Posts from '../components/Posts';
import Rooms from '../components/Rooms';

export default function HomePage() {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchJoinedRooms = async () => {
      const rooms = [
        {
          id: 1,
          title: 'JavaScript Study Group',
          description: 'Learn JavaScript together.',
          leader: 'Alice Johnson',
          topic: 'JavaScript',
        },
        {
          id: 2,
          title: 'React Mentorship',
          description: 'Mentorship for React beginners.',
          leader: 'Bob Smith',
          topic: 'React',
        },
      ];
      setJoinedRooms(rooms);
    };

    const fetchRecentPosts = async () => {
      const posts = [
        {
          id: 1,
          title: 'Understanding Closures in JavaScript',
          description: 'A deep dive into closures in JavaScript.',
          author: 'John Doe',
          date: '2024-12-27',
        },
        {
          id: 2,
          title: 'React Hooks: A Comprehensive Guide',
          description: 'Everything you need to know about React Hooks.',
          author: 'Jane Smith',
          date: '2023-10-02',
        },
      ];
      setRecentPosts(posts);
    };

    fetchJoinedRooms();
    fetchRecentPosts();
  }, []);

  return (
    <div className='max-w-lg mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>홈 페이지</h2>

      <section className='mb-6'>
        <h3 className='text-xl font-semibold mb-2'>가입한 룸</h3>
        <Rooms rooms={joinedRooms} />
      </section>

      <section>
        <h3 className='text-xl font-semibold mb-2'>최근 게시물</h3>
        <Posts posts={recentPosts} />
      </section>
    </div>
  );
}
