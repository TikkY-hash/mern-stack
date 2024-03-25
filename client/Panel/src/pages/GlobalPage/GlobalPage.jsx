import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AuthPage from '../AuthPage';
import { getAuthToken } from '../../store/Users/authSelectors/authSelector';
import { useEffect } from 'react';
import ProjectsPage from '../ProjectsPage';
import NotFoundPage from '../../components/NotFoundPage';
import SnackbarWrapper from '../../components/SnackbarWrapper';

const GlobalPage = () => {
  const token = useSelector(getAuthToken);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = location.pathname === '/';

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      if (isAuth) {
        navigate('/projects');
      }
    }
  }, [token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SnackbarWrapper />
    </>
  );
};

export default GlobalPage;
