import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ProjectTabPanelDescription = ({ description }) => (
  <>
    <Box>
      <Typography variant="h5" gutterBottom>
        Description
      </Typography>
    </Box>
    <Typography variant="body1" gutterBottom>
      {description}
    </Typography>
  </>
);

export default ProjectTabPanelDescription;
