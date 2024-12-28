import React, { useState, useEffect } from 'react';
import * as nsfwjs from 'nsfwjs';

export default function MakeRoomPage() {
  const [predictions, setPredictions] = useState([]);
  const [model, setModel] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    // Load the model once when the component mounts
    const loadModel = async () => {
      const loadedModel = await nsfwjs.load();
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imgElement = document.getElementById('img');
    imgElement.src = URL.createObjectURL(file);
    // Add an onload event to classify the image once it's fully loaded
    imgElement.onload = async () => {
      if (model) {
        const predictions = await model.classify(imgElement);
        console.log('Predictions: ', predictions);
        setPredictions(predictions);
      }
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the title, description, and author
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Author:', author);
    // You can also handle the image and predictions as needed
  };

  return (
    <div className='max-w-md mx-auto p-4'>
      <form onSubmit={handleSubmit} className='space-y-4'>
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
          required
          className='w-full p-2 border border-gray-300 rounded'
        />
        <img id='img' alt='Uploaded' className='w-full h-auto mt-2' />
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
        >
          Submit
        </button>
      </form>
      <div className='mt-4'>
        <h3 className='text-lg font-semibold'>Predictions:</h3>
        <ul className='list-disc pl-5'>
          {predictions.map((prediction, index) => (
            <li key={index}>
              {prediction.className}: {prediction.probability.toFixed(4)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
