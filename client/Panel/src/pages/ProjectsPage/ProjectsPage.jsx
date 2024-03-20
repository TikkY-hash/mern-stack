import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../store/Projects/projectsThunk/projectsThunk';
import Input from '../../components/Input';
import { resetToken } from '../../store/Users/authSlice/authSlice';

import AdminPanelProjectsList from '../../components/AdminPanelProjectsList';

import Container from '../../components/Container';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(resetToken());
  };

  return (
    <Container>
      <div className="inputWrapper">
        <Input placeholder="Enter your project" onChange={setTerm} value={term} />
        <button className="button" onClick={handleLogout}>
          Exit
        </button>
      </div>
      <div className="adminPanelContainer">
        <AdminPanelProjectsList isEditor={false} term={term} />
      </div>
    </Container>
  );
};

export default ProjectsPage;
