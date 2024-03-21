import { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects, addProjects } from '../../store/Projects/projectsThunk/projectsThunk';
import AdminPanelProjectsList from '../../components/AdminPanelProjectsList';
import { debounce } from '../../Core/utils';
import Button from '../../components/Button';

import './AdminPanel.scss';
import Container from '../../components/Container';
import Input from '../../components/Input';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleClick = () => dispatch(addProjects());

  const handleGetProjects = useCallback(
    debounce((value) => dispatch(getProjects({ query: value })), 500),
    [],
  );

  useEffect(() => {
    handleGetProjects(term);
  }, [term]);

  return (
    <Container>
      <div className="adminPanelContainer">
        <div className="inputWrapper">
          <Input placeholder="Enter your project" onChange={setTerm} value={term} />
        </div>
        <div>
          <AdminPanelProjectsList />
        </div>
        <Button className="addProjectButton" onClick={handleClick}>
          Add project
        </Button>
      </div>
    </Container>
  );
};

export default AdminPanel;
