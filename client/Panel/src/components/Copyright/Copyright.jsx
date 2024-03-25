import { Typography } from '@mui/material';

const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © Mern '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default Copyright;
