import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../store/Projects/projectsThunk/projectsThunk';
import Input from '../../components/Input';
import { debounce } from '../../Core/utils';
import './ProjectsPage.scss';

import AdminPanelProjectsList from '../../components/AdminPanelProjectsList';

import Container from '../../components/Container';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleGetProjects = useCallback(
    debounce((value) => dispatch(getProjects({ query: value })), 500),
    [],
  );

  useEffect(() => {
    handleGetProjects(term);
  }, [term]);

  return (
    <Container>
      <div className="inputWrapper">
        <Input placeholder="Enter your project" onChange={setTerm} value={term} />
      </div>
      <div className="adminPanelContainer">
        <AdminPanelProjectsList isEditor={false} />
      </div>
    </Container>
  );
};

export default ProjectsPage;
