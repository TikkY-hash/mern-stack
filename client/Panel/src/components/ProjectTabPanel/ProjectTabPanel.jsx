import { useSelector } from 'react-redux';
import { getProjectSelector , getProjectLoadingSelector } from '../../store/Project/projectSelector/projectSelector';
import ProjectTabTasks from '../ProjectTabTasks';
import ProjectTabPanelDescription from '../ProjectTabPanelDescription';
import ProjectTabPanelTitle from '../ProjectTabPanelTitle';
import { CircularProgress } from '@mui/material';
import './ProjectTabPanel.scss'

const ProjectTabPanel = () => {
  const project = useSelector(getProjectSelector);
  const isLoading = useSelector(getProjectLoadingSelector)

  if(isLoading) return (
    <div className='projectLoadingWrapper'>
      <CircularProgress />
    </div>
  )

  return (
    <div
      className='projectContainer'
    >
      <ProjectTabPanelDescription description={project.description} />
      <ProjectTabPanelTitle projectId={project._id} />
      <ProjectTabTasks projectId={project._id} />
    </div>
  );
};

export default ProjectTabPanel;
