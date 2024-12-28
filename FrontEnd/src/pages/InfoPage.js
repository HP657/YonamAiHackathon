import { useState, useEffect } from 'react';

export default function InfoPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setUserInfo({
        name: 'John Doe',
        gpa: 3.8,
      });
    };

    const fetchUserPosts = async () => {
      const posts = [
        { id: 1, title: 'Understanding React Hooks' },
        { id: 2, title: 'JavaScript ES6 Features' },
        { id: 3, title: 'Introduction to Node.js' },
      ];
      setUserPosts(posts);
    };

    const fetchData = async () => {
      await fetchUserInfo();
      await fetchUserPosts();
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='text-2xl font-bold mb-4'>User Information</h2>
      <div className='mb-4'>
        <p className='text-lg'>
          <strong>Name:</strong> {userInfo.name}
        </p>
        <p className='text-lg'>
          <strong>GPA:</strong> {userInfo.gpa}
        </p>
      </div>
      <div>
        <h3 className='text-xl font-semibold mb-2'>Your Posts</h3>
        <ul className='list-disc pl-5'>
          {userPosts.map((post) => (
            <li key={post.id} className='mb-1'>
              {post.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
