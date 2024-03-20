import { useDispatch, useSelector } from 'react-redux';
import { useIdFromUrl } from '../../Core/utils';
import { useEffect } from 'react';
import { getProject } from '../../store/Project/projectThunk/projectThunk';
import { getProjectSelector, getProjectLoadingSelector } from '../../store/Project/projectSelector/projectSelector';
import Container from '../../components/Container';
import ProjectEditorHeader from '../../components/ProjectEditorHeader';
import ProjectEditorDescription from '../../components/ProjectEditorDescription';
import ProjectEditorTasks from '../../components/ProjectEditorTasks';
import './AdminPanelProjectEditor.scss';

const AdminPanelProjectEditor = () => {
  const dispatch = useDispatch();
  const id = useIdFromUrl();

  const project = useSelector(getProjectSelector);
  const isLoading = useSelector(getProjectLoadingSelector);

  useEffect(() => {
    dispatch(getProject({ id }));
  }, []);

  if (isLoading) return null;

  return (
    <Container className="projectEditorContainer">
      <ProjectEditorHeader project={project} />
      <ProjectEditorDescription project={project} />
      <ProjectEditorTasks projectId={project._id} />
    </Container>
  );
};

export default AdminPanelProjectEditor;
