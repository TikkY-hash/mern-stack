import { Button } from '@mui/material';

import './ProjectListButton.scss';

const ProjectListButton = ({ handleShowModal }) => (
  <div className="buttonWrapper">
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{ color: 'white', margin: '24px 0px' }}
      onClick={() => handleShowModal({ show: true, projectId: null })}
    >
      Add project
    </Button>
  </div>
);

export default ProjectListButton;
