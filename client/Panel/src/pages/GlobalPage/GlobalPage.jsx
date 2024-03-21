import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AuthPage from '../AuthPage';
import AdminPanel from '../AdminPanel';
import { getAuthToken } from '../../store/Users/authSelectors/authSelector';
import { useEffect } from 'react';
import AdminPanelProjectEditor from '../AdminPanelProjectEditor';
import ProjectsPage from '../ProjectsPage';
import ProjectPage from '../ProjectPage';
import Header from '../../components/Header';
import NotFoundPage from '../../components/NotFoundPage';

const GlobalPage = () => {
  const token = useSelector(getAuthToken);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuth = location.pathname === '/';
  const isShowHeader = location.pathname !== '/';

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
      {isShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/project/editor/:id" element={<AdminPanelProjectEditor />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default GlobalPage;
