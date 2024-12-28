import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function PostDetailPage({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const dummyPost = {
      title: 'Understanding React Hooks',
      author: 'Jane Doe',
      date: '2023-10-01T12:00:00Z',
      content:
        'React Hooks are functions that let you use state and other React features without writing a class. They are a powerful addition to React that allows for more functional programming patterns.',
    };

    const fetchPost = () => {
      setPost(dummyPost);
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div></div>;
  }

  return (
    <div className='font-sans p-6'>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <div className='text-sm text-gray-500 mb-4'>
        <span>
          {post.author} | {new Date(post.date).toLocaleString()}
        </span>
      </div>
      <p className='text-gray-700'>{post.content}</p>
    </div>
  );
}

PostDetailPage.propTypes = {
  postId: PropTypes.number.isRequired,
};
