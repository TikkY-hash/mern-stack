import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './TabLabel.scss';

const TabLabel = ({ project, handleShowModal, handleDeleteProject }) => (
  <div className="tabWrapper">
    <span className="projectTabTitle">{project.title}</span>
    <div className="iconButton" onClick={() => handleShowModal({ show: true, projectId: project._id })}>
      <EditIcon fontSize="small" color="primary" sx={{ marginLeft: '12px' }}/>
    </div>
    <div className="iconButton" onClick={(event) => handleDeleteProject(event, project._id)}>
      <DeleteIcon fontSize="small" color="error" sx={{ marginLeft: '12px' }} className="iconButton" />
    </div>
  </div>
);

export default TabLabel;
