import { useDispatch, useSelector } from 'react-redux';
import { getProjectsSelector } from '../../store/Projects/projectsSelectors/projectsSelectors';
import { addProjects, deleteProject, updateProject } from '../../store/Projects/projectsThunk/projectsThunk';
import { getProject } from '../../store/Project/projectThunk/projectThunk';
import ProjectListTitle from '../ProjectListTitle';
import { useState } from 'react';
import ProjectTabPanel from '../ProjectTabPanel';
import ProjectModal from '../ProjectModal';
import ProjectsListTabs from '../ProjectsListTabs';
import ProjectListButton from '../ProjectListButton';
import './ProjectsList.scss';
import EmptyStub from '../EmptyStub';
import { deleteCurrentProject } from '../../store/Project/projectSlice/projectSlice';

const ProjectsList = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const [showModal, handleShowModal] = useState({ show: false, projectId: null });

  const projects = useSelector(getProjectsSelector);

  const handleChange = (_, newValue) => {
    const id = projects[newValue]._id;
    dispatch(getProject({ id }));
    setValue(newValue);
  };

  const handleAddProjects = (projectValue) => {
    if (!showModal.projectId) {
      dispatch(addProjects({ projectData: projectValue, selectedTab: value }));
    } else {
      dispatch(updateProject({ ...projectValue, id: showModal.projectId }));
    }

    handleShowModal({ show: false, projectId: null });
  };

  const handleDeleteProject = (event, id) => {
    event.stopPropagation();

    if (value) {
      setValue((prevValue) => prevValue - 1);
      handleChange('', value - 1);
    }

    dispatch(deleteCurrentProject())
    dispatch(deleteProject({ id }));
  };

  return (
    <div className="rootTabs">
      <div className="projectTabs">
        <ProjectListTitle />
        <ProjectsListTabs
          handleChange={handleChange}
          handleDeleteProject={handleDeleteProject}
          handleShowModal={handleShowModal}
          projects={projects}
          value={value}
        />
        <ProjectListButton handleShowModal={handleShowModal} />
      </div>
      {projects.length ? <ProjectTabPanel /> : <EmptyStub />}
      <ProjectModal
        handleCloseModal={() => handleShowModal({ show: false, projectId: null })}
        isShowModal={showModal.show}
        handleClick={handleAddProjects}
        project={projects.find((project) => project._id === showModal.projectId)}
      />
    </div>
  );
};

export default ProjectsList;
