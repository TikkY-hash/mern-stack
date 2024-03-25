import './AuthPage.scss';
import AuthForm from '../../components/AuthForm';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthError } from '../../store/Users/authSelectors/authSelector';
import { authLogin, authRegister } from '../../store/Users/authThunk/authThunk';

const AuthPage = () => {
  const dispatch = useDispatch();
  const isError = useSelector(getAuthError);
  const [isSignIn, setIsSign] = useState(true);

  const handleSubmit = (value) => {
    if (isSignIn) {
      dispatch(authLogin(value));
    } else {
      dispatch(authRegister(value));
    }
  };

  return (
    <div className="root">
      <AuthForm
        isSignIn={isSignIn}
        setIsSignIn={() => setIsSign(!isSignIn)}
        handleSubmit={handleSubmit}
        isError={isError}
      />
    </div>
  );
};

export default AuthPage;
