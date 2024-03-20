import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AuthPage from '../AuthPage';
import AdminPanel from '../AdminPanel';
import { getAuthToken } from '../../store/Users/authSelectors/authSelector';
import { useEffect } from 'react';
import AdminPanelProjectEditor from '../AdminPanelProjectEditor';
import ProjectsPage from '../ProjectsPage';
import ProjectPage from '../ProjectPage';

const GlobalPage = () => {
  const token = useSelector(getAuthToken);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      if (location.pathname === '/') {
        navigate('/projects');
      }
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/project/editor/:id" element={<AdminPanelProjectEditor />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/project/:id" element={<ProjectPage />} />
    </Routes>
  );
};

export default GlobalPage;
