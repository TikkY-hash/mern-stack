import { useSelector } from 'react-redux';
import { getProjectsSelector } from '../../store/Projects/projectsSelectors/projectsSelectors';
import AdminPanelProjectsListItem from '../AdminPanelProjectsListItem';

import './AdminPanelProjectsList.scss';

const AdminPanelProjectsList = ({ isEditor, term }) => {
  const projects = useSelector(getProjectsSelector);

  const filteredProjects = term ? 
  projects.filter(project =>
    project.title.toLowerCase().includes(term.toLowerCase())
  ) : projects;

  return (
    <ul className="adminPanelProjectsListWrapper">
      {filteredProjects.map((project) => (
        <AdminPanelProjectsListItem key={project._id} project={project} isEditor={isEditor} />
      ))}
    </ul>
  );
}

export default AdminPanelProjectsList;
