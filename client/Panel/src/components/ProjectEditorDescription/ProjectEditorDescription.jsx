import { useDispatch } from 'react-redux';
import { debounce } from '../../Core/utils';
import { useCallback } from 'react';
import { updateProject } from '../../store/Project/projectThunk/projectThunk';
import { updateProjectField } from '../../store/Project/projectSlice/projectSlice';
import TextArea from '../TextArea';

import './ProjectEditorDescription.scss';

const ProjectEditorDescription = ({ project }) => {
  const dispatch = useDispatch();

  const handleUsersSearchUpdate = useCallback(
    debounce((value, fieldName) => dispatch(updateProject({ id: project._id, [fieldName]: value })), 500),
    [],
  );

  const handleUsersSearch = (value) => {
    dispatch(updateProjectField({ fieldName: 'description', fieldValue: value }));

    handleUsersSearchUpdate(value, 'description');
  };

  return (
    <div className="projectDescriptionWrapper">
      <h1 className="projectDescriptionWrapperTitle">Description</h1>
      <TextArea
        className="textareaDescriptionWrapper"
        onChange={handleUsersSearch}
        value={project.description}
        placeholder="Enter your project description"
      />
    </div>
  );
};

export default ProjectEditorDescription;
