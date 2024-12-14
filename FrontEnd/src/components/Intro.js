import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Intro({ onFadeComplete }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 1000);
    const completeTimer = setTimeout(() => onFadeComplete(), 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onFadeComplete]);

  return (
    <div
      className={`flex justify-center items-center h-screen bg-blue-100 transition-opacity duration-1000 ${
        isFading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <img src='/assets/logo.png' alt='Logo' className='w-40 h-auto' />
    </div>
  );
}

Intro.propTypes = {
  onFadeComplete: PropTypes.func.isRequired,
};
