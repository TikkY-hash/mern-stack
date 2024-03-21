import { useSelector } from 'react-redux';
import { getProjectsSelector, getProjectsLoading } from '../../store/Projects/projectsSelectors/projectsSelectors';
import AdminPanelProjectsListItem from '../AdminPanelProjectsListItem';

import './AdminPanelProjectsList.scss';
import EmptyStub from '../EmptyStub';

const AdminPanelProjectsList = ({ isEditor }) => {
  const projects = useSelector(getProjectsSelector);
  const isLoading = useSelector(getProjectsLoading);

  if (!isLoading && !projects.length) return <EmptyStub />;

  return (
    <ul className="adminPanelProjectsListWrapper">
      {projects.map((project) => (
        <AdminPanelProjectsListItem key={project._id} project={project} isEditor={isEditor} />
      ))}
    </ul>
  );
};

export default AdminPanelProjectsList;
