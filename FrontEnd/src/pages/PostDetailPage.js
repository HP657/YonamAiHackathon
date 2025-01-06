import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import API from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import CheckToken from '../components/TokenCheck';

export default function PostDetailPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokencheck = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }
      fetchPost();
    };
    tokencheck();
  }, [postId, navigate]);

  const fetchPost = async () => {
    const response = await API(`/api/post/${postId}`, 'GET', null, true);
    if (response) {
      setPost(response.data.data);
    } else {
      console.error('Failed to fetch post:', response);
      setPost(null);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='font-sans p-6'>
      <h2 className='text-2xl font-bold'>{post.title}</h2>
      <div className='text-sm text-gray-500 mb-4'>
        <span>
          {post.author} | {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>
      <p className='text-gray-700'>{post.contents}</p>
      {post.postImgUrl && (
        <div className='mt-4'>
          <img
            src={post.postImgUrl}
            alt='Post content'
            className='w-full h-auto rounded-md'
          />
        </div>
      )}
    </div>
  );
}

PostDetailPage.propTypes = {
  postId: PropTypes.number.isRequired,
};
