import { useState, useEffect } from 'react';

export default function HomePage() {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchJoinedRooms = async () => {
      const rooms = [
        {
          id: 1,
          name: 'JavaScript Study Group',
          description: 'Learn JavaScript together.',
        },
        {
          id: 2,
          name: 'React Mentorship',
          description: 'Mentorship for React beginners.',
        },
      ];
      setJoinedRooms(rooms);
    };

    const fetchRecentPosts = async () => {
      const posts = [
        { id: 1, title: 'Understanding Closures in JavaScript', roomId: 1 },
        { id: 2, title: 'React Hooks: A Comprehensive Guide', roomId: 2 },
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
        <ul className='list-none p-0'>
          {joinedRooms.map((room) => (
            <li key={room.id} className='p-2 border-b border-gray-200'>
              <strong className='block text-lg'>{room.name}</strong>
              <span>{room.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className='text-xl font-semibold mb-2'>최근 게시물</h3>
        <ul className='list-none p-0'>
          {recentPosts.map((post) => (
            <li key={post.id} className='p-2 border-b border-gray-200'>
              <strong className='block text-lg'>{post.title}</strong>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
