import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStatusSnackbarSelector,
  getVisibilitySnackbarSelector,
} from '../../store/Snackbar/snackbarSelectors/snackbarSelectors';
import { updateStatusAndVisibility } from '../../store/Snackbar/snackbarSlice/snackbarSlice';
import { useState } from 'react';

const SnackbarWrapper = () => {
  const dispatch = useDispatch();
  const [isExited, setIsExited] = useState(true);

  const isShow = useSelector(getVisibilitySnackbarSelector);
  const status = useSelector(getStatusSnackbarSelector);

  const isErrorStatus = status === 'error';

  const handleClose = () => {
    setIsExited(false);
  };

  const handleExited = () => {
    setIsExited(true);
    dispatch(updateStatusAndVisibility({ status: null, isShow: false }));
  };

  const alertIcon = isErrorStatus ? 'error' : 'success';
  const alertTitle = isErrorStatus ? 'Something going wrong' : 'Success';

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isShow && isExited}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionProps={{ onExited: handleExited }}
      message="Note archived"
    >
      <Alert severity={alertIcon}>{alertTitle}</Alert>
    </Snackbar>
  );
};

export default SnackbarWrapper;
