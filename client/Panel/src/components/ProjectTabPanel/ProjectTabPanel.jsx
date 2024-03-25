import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { getProjectSelector } from '../../store/Project/projectSelector/projectSelector';
import ProjectTabTasks from '../ProjectTabTasks';
import ProjectTabPanelDescription from '../ProjectTabPanelDescription';
import ProjectTabPanelTitle from '../ProjectTabPanelTitle';

const ProjectTabPanel = () => {
  const project = useSelector(getProjectSelector);

  return (
    <Box
      sx={{
        marginTop: '12px',
        marginLeft: '30px',
      }}
    >
      <ProjectTabPanelDescription description={project.description} />
      <ProjectTabPanelTitle projectId={project._id} />
      <ProjectTabTasks projectId={project._id} />
    </Box>
  );
};

export default ProjectTabPanel;
