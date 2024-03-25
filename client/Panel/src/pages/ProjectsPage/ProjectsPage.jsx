import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProjects } from '../../store/Projects/projectsThunk/projectsThunk';
import ProjectsList from '../../components/ProjectsList';
import ProjectsHeader from '../../components/ProjectsHeader';

const ProjectsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  return (
    <div>
      <ProjectsHeader />
      <ProjectsList />
    </div>
  );
};

export default ProjectsPage;
