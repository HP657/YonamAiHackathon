import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import PropTypes from 'prop-types';

export default function Contents({ user }) {
  return (
    <Routes>
      <Route path='/' element={<MainPage user={user} />} />
      <Route path='/login' element={<LoginPage user={user} />} />
      <Route path='/register' element={<RegisterPage user={user} />} />
    </Routes>
  );
}
Contents.propTypes = {
  user: PropTypes.bool.isRequired,
};
