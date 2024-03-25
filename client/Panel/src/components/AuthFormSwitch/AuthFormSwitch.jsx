import { Grid, Button, Typography } from '@mui/material';

const AuthFormSwitch = ({ isSignIn, handleSignIn }) => (
  <Grid container>
    <Grid item>
      <Button style={{ textTransform: 'none' }} onClick={handleSignIn}>
        <Typography variant="body2">
          {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign in'}
        </Typography>
      </Button>
    </Grid>
  </Grid>
);

export default AuthFormSwitch;
