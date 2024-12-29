import { Link } from 'react-router-dom';
import Posts from '../components/Posts';

export default function PostListPage() {
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
    {
      id: 3,
      title: 'JavaScript Fundamentals',
      description: 'A comprehensive overview of JavaScript basics.',
      author: 'Bob Johnson',
      date: '2023-10-03',
    },
    {
      id: 4,
      title: 'Advanced React Concepts',
      description: 'Exploring advanced topics in React.',
      author: 'Alice Brown',
      date: '2023-10-04',
    },
    {
      id: 5,
      title: 'Web Development Trends',
      description: 'The latest trends and innovations in web development.',
      author: 'Charlie Davis',
      date: '2023-10-05',
    },
    {
      id: 6,
      title: 'Frontend Security Best Practices',
      description: 'Securing your frontend applications with best practices.',
      author: 'Emily Taylor',
      date: '2023-10-06',
    },
  ];

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>게시물 목록</h1>
      <Link
        to='/add_post'
        className='inline-block mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
      >
        Add New Post
      </Link>
      <ul>
        <Posts posts={posts} />
      </ul>
    </div>
  );
}
