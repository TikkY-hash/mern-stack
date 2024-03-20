import { useEffect, useState  } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects, addProjects } from '../../store/Projects/projectsThunk/projectsThunk';
import AdminPanelProjectsList from '../../components/AdminPanelProjectsList';

import './AdminPanel.scss';
import Container from '../../components/Container';
import Input from '../../components/Input';
import { resetToken } from '../../store/Users/authSlice/authSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('')

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleClick = () => dispatch(addProjects());

  const handleLogout = () => {
    dispatch(resetToken())
  }

  return (
    <Container>
      <div className="adminPanelContainer">
       <div className='inputWrapper'>
         <Input placeholder='Enter your project'onChange={setTerm} value={term}/>
         <button className='button' onClick={handleLogout}>Exit</button>
       </div>
        <div>
          <AdminPanelProjectsList term={term}/>
        </div>
        <button className="addProjectButton" onClick={handleClick}>
          Add project
        </button>
      </div>
    </Container>
  );
};

export default AdminPanel;
