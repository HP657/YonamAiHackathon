import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, []);
  return (
    <div>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
      <p>Test</p>
    </div>
  );
}
