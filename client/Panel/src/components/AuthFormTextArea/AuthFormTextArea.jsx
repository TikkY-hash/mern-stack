import { TextField } from '@mui/material';

const InputField = ({ type, label, name, value, onChange, error, helperText, fullWidth, autoFocus }) => (
  <TextField
    error={!!error}
    helperText={helperText}
    margin="normal"
    required
    fullWidth={fullWidth}
    name={name}
    label={label}
    type={type}
    id={name}
    value={value}
    onChange={onChange}
    autoComplete={name === 'email' ? 'email' : name === 'password' ? 'current-password' : 'given-name'}
    autoFocus={autoFocus}
  />
);

export default InputField;
