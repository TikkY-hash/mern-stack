import './AdminPanelProjectsListItem.scss';

import img from '../../assets/course_program_cover.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../store/Project/projectThunk/projectThunk';

const AdminPanelProjectsListItem = ({ project, isEditor = true }) => {
  const dispatch = useDispatch();

  const backgroundImage = `url(${img || project?.img})`;

  const handleDeleteProject = (event) => {
    event.preventDefault();
    dispatch(deleteProject({ id: project._id }));
  };

  const editorPath = isEditor ? '/editor' : '';
  const pathToRedirect = `/project${editorPath}/${project._id}`;

  return (
    <Link className="adminPanelProjectsListItemWrapper" to={pathToRedirect} style={{ backgroundImage }}>
      {isEditor && (
        <div className="deleteIconWrapper" onClick={handleDeleteProject}>
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#a10808"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path d="M10 12V17" stroke="#ec1313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 12V17" stroke="#ec1313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 7H20" stroke="#ec1313" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                stroke="#ec1313"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                stroke="#ec1313"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      )}
      <div className="titleWrapper">
        <h1 className="title">{project.title}</h1>
      </div>
      <p className="projectDescription">{project.description}</p>
    </Link>
  );
};

export default AdminPanelProjectsListItem;
