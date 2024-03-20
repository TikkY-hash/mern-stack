import { useState } from 'react';
import cn from 'classnames';
import './AuthForm.scss';

const AuthForm = ({ isSignIn = true, setIsSignIn, handleSubmitForm, isError }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      email,
      password,
      ...(!isSignIn && { fullName: username }),
    };

    handleSubmitForm(formData);
  };

  const handleChangeSign = (value) => {
    setUsername('');
    setEmail('');
    setPassword('');
    setIsSignIn(value);
  };

  return (
    <div className="login">
      <h2
        className={cn('active', {
          nonactive: !isSignIn,
        })}
        onClick={() => handleChangeSign(true)}
      >
        Sign in
      </h2>
      <h2
        className={cn('active', {
          nonactive: isSignIn,
        })}
        onClick={() => handleChangeSign(false)}
      >
        Sign up
      </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="text" name="email" value={email} onChange={handleEmailChange} />
        <span>email</span>
        <br />
        <br />
        {!isSignIn && (
          <>
            <input type="text" className="text" name="username" value={username} onChange={handleUsernameChange} />
            <span>username</span>
            <br />
            <br />
          </>
        )}
        <input type="password" className="text" name="password" value={password} onChange={handlePasswordChange} />
        <span>password</span>
        <br />
        <br />
        <button type="submit" className="signin">
          {`Sign ${isSignIn ? 'in' : 'up'}`}
        </button>
        {isError && <span className="errorSpan">Something going wrong</span>}
      </form>
    </div>
  );
};

export default AuthForm;
