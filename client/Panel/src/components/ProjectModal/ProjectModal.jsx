import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {style} from './ProjectModalConstants'


const ProjectModal = ({ isShowModal, handleCloseModal, handleClick, project }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  const handleAddProject = () => {
    handleClick({ title, description });
    setTitle('');
    setDescription('');
  };

  useEffect(() => {
    setTitle(project?.title || '');
    setDescription(project?.description || '');
  }, [project]);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isShowModal}
      onClose={handleCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      sx={{
        margin: '48px',
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isShowModal}>
        <Box style={style} bgcolor="white">
          <TextField
            id="title"
            label="Title"
            fullWidth
            margin="normal"
            onChange={(event) => setTitle(event.target.value)}
            value={title}
          />
          <TextField
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" color="primary" disabled={!isFormValid} onClick={handleAddProject}>
              {project ? 'Edit project' : 'Add project'}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProjectModal;
