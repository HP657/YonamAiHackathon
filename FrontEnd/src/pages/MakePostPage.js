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
    <div className='min-h-screen bg-gray-50 p-6'>
      <h1 className='text-2xl font-bold text-center mb-6 text-blue-600'>
        게시물 만들기
      </h1>
      <form onSubmit={handleSubmit} className='space-y-4 max-w-2xl mx-auto'>
        <div>
          <label htmlFor='title' className='block text-gray-700 font-medium'>
            제목
          </label>
          <input
            id='title'
            type='text'
            placeholder='제목을 입력하세요'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>
        <div>
          <label
            htmlFor='description'
            className='block text-gray-700 font-medium'
          >
            내용
          </label>
          <textarea
            id='description'
            placeholder='내용을 입력하세요'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>
        <div>
          <label htmlFor='author' className='block text-gray-700 font-medium'>
            작성자
          </label>
          <input
            id='author'
            type='text'
            placeholder='작성자를 입력하세요'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
          />
        </div>
        <div>
          <label htmlFor='file' className='block text-gray-700 font-medium'>
            이미지 업로드
          </label>
          <input
            id='file'
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none'
          />
          <img
            ref={imgRef}
            alt='Uploaded'
            className='w-full h-auto mt-4'
            style={{ display: image ? 'block' : 'none' }}
          />
          {errorMessage && <p className='text-red-500 mt-2'>{errorMessage}</p>}
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 transition'
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
