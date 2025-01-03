import React, { useState, useEffect, useRef } from 'react';
import * as nsfwjs from 'nsfwjs';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import CheckToken from '../components/TokenCheck';

export default function MakePostPage() {
  const [model, setModel] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const imgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tokencheck = async () => {
      const isValidToken = await CheckToken();
      if (!isValidToken) {
        navigate('/login');
        return;
      }
    };
    tokencheck();

    const loadModel = async () => {
      const loadedModel = await nsfwjs.load();
      setModel(loadedModel);
    };
    loadModel();
  }, [navigate]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgElement = imgRef.current;
      imgElement.src = URL.createObjectURL(file);
      setImage(file);

      imgElement.onload = async () => {
        if (model) {
          const predictions = await model.classify(imgElement);
          const inappropriateCategories = ['Hentai', 'Porn', 'Sexy'];

          const isInappropriate = inappropriateCategories.includes(
            predictions[0].className
          );
          if (isInappropriate) {
            setErrorMessage(
              '이 이미지는 허용되지 않는 내용을 포함하고 있습니다. 안전한 이미지를 업로드해 주세요.'
            );
            setImage(null);
            imgElement.src = '';
          } else {
            setErrorMessage('');
          }
        }
      };
    } else {
      setImage(null);
      imgRef.current.src = '';
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('contents', description);
    formData.append('author', author);
    formData.append('postImg', image);

    await API('/api/post/create', 'POST', formData, true);
    alert('게시물이 등록되었습니다.');
    navigate('/posts');
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />
        <input
          type='text'
          placeholder='Author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className='w-full p-2 border border-gray-300 rounded'
        />
        <input
          type='file'
          accept='image/*'
          onChange={handleImageUpload}
          className='w-full p-2 border border-gray-300 rounded'
        />
        <img
          ref={imgRef}
          alt='Uploaded'
          className='w-full h-auto mt-2'
          style={{ display: image ? 'block' : 'none' }}
        />

        {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}

        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
