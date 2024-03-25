import { useState } from 'react';
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import { LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import AuthFormPasswordVisibility from '../AuthFormPasswordVisibility';
import AuthFormSwitch from '../AuthFormSwitch';
import Copyright from '../Copyright';

const AuthForm = ({ isSignIn, setIsSignIn, handleSubmit }) => {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const errors = {};

    if (!email.trim()) {
      errors.email = 'Email is required';
    }
    if (!password.trim()) {
      errors.password = 'Password is required';
    }
    if (!isSignIn && !fullName.trim()) {
      errors.fullName = 'Full Name is required';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      handleSubmit({ email, fullName, password });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: '' });
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
    setErrors({ ...errors, fullName: '' });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors({ ...errors, password: '' });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignIn = () => {
    setEmail('');
    setPassword('');
    setFullName('');
    setErrors({});
    setIsSignIn();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {`Sign ${isSignIn ? 'in' : 'up'}`}
        </Typography>
        <Box component="form" onSubmit={handleSubmitForm} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
          />
          {!isSignIn && (
            <TextField
              error={!!errors.fullName}
              helperText={errors.fullName}
              autoComplete="given-name"
              name="fullName"
              required
              fullWidth
              id="fullName"
              label="Full Name"
              autoFocus
              value={fullName}
              onChange={handleFullNameChange}
            />
          )}
          <TextField
            error={!!errors.password}
            helperText={errors.password || ''}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            InputProps={{
              endAdornment: (
                <AuthFormPasswordVisibility
                  handleClickShowPassword={handleClickShowPassword}
                  handleMouseDownPassword={handleMouseDownPassword}
                  showPassword={showPassword}
                />
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <AuthFormSwitch handleSignIn={handleSignIn} isSignIn={isSignIn} />
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default AuthForm;
