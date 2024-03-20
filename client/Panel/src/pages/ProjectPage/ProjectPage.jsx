import { useDispatch, useSelector } from 'react-redux';
import { useIdFromUrl } from '../../Core/utils';
import { getProjectSelector, getProjectLoadingSelector } from '../../store/Project/projectSelector/projectSelector';
import { useEffect } from 'react';
import { getProject } from '../../store/Project/projectThunk/projectThunk';
import ProjectPageHeader from '../../components/ProjectPageHeader';
import ProjectDescription from '../../components/ProjectDescription';
import ProjectPageTasksList from '../../components/ProjectPageTasksList';

import './ProjectPage.scss';
import Container from '../../components/Container';

const ProjectPage = () => {
  const dispatch = useDispatch();
  const id = useIdFromUrl();

  const project = useSelector(getProjectSelector);
  const isLoading = useSelector(getProjectLoadingSelector);

  useEffect(() => {
    dispatch(getProject({ id }));
  }, []);

  if (isLoading) return null;

  return (
    <Container>
      <div className="projectPageWrapper">
        <ProjectPageHeader project={project} />
        {project.description && <ProjectDescription project={project} />}
        <ProjectPageTasksList projectId={project._id} />
      </div>
    </Container>
  );
};

export default ProjectPage;
