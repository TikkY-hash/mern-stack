import './ProjectEditorHeader.scss';
import img from '../../assets/course_program_cover.png';
import { Link } from 'react-router-dom';
import TextArea from '../TextArea';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from '../../Core/utils';
import { updateProject } from '../../store/Project/projectThunk/projectThunk';
import { updateProjectField } from '../../store/Project/projectSlice/projectSlice';

const ProjectEditorHeader = ({ project }) => {
  const dispatch = useDispatch();

  const backgroundImage = `url(${img})`;

  const handleUsersSearchUpdate = useCallback(
    debounce((value, fieldName) => dispatch(updateProject({ id: project._id, [fieldName]: value })), 500),
    [],
  );

  const handleUsersSearch = (value) => {
    dispatch(updateProjectField({ fieldName: 'title', fieldValue: value }));

    handleUsersSearchUpdate(value, 'title');
  };


  return (
    <div className="header" style={{ backgroundImage }}>
      <Link to="/admin">
        <svg
          className="headerIcon"
          fill="white"
          width="16px"
          height="16px"
          viewBox="0 0 52 52"
          data-name="Layer 1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M50,24H6.83L27.41,3.41a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0l-24,24a1.79,1.79,0,0,0-.25.31A1.19,1.19,0,0,0,.25,25c0,.07-.07.13-.1.2l-.06.2a.84.84,0,0,0,0,.17,2,2,0,0,0,0,.78.84.84,0,0,0,0,.17l.06.2c0,.07.07.13.1.2a1.19,1.19,0,0,0,.09.15,1.79,1.79,0,0,0,.25.31l24,24a2,2,0,1,0,2.82-2.82L6.83,28H50a2,2,0,0,0,0-4Z" />
        </svg>
      </Link>
      <TextArea
        className="projectEditorHeaderTextArea"
        onChange={handleUsersSearch}
        value={project.title}
        placeholder="Enter your project description"
      />
    </div>
  );
};

export default ProjectEditorHeader;
