import { useDispatch } from 'react-redux';
import { resetToken } from '../../store/Users/authSlice/authSlice';
import './Header.scss';
import Button from '../Button';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => dispatch(resetToken());

  return (
    <header className="rootHeader">
      <ul className="headerWrapper">
        <li className="headerLink">
          <NavLink to="/admin">Admin panel</NavLink>
        </li>
        <li className="headerLink">
          <NavLink to="/projects">Projects</NavLink>
        </li>
      </ul>
      <Button onClick={handleLogout} className="headerLogoutButton">
        Logout
      </Button>
    </header>
  );
};

export default Header;
