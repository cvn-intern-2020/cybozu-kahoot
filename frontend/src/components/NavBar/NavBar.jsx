import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import styles from './NavBar.module.css';

const NavBar = () => {
  const data = useContext(UserContext);
  const logout = () => {
    fetch('http://localhost:6969/api/auth/logout', {
      credentials: 'include',
    }).then((res) => (window.location.href = '/'));
  };

  return (
    <nav className={styles.NavBar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!data ? null : (
          <li>
            <a href="/#" onClick={logout}>
              Logout
            </a>
          </li>
        )}
        {data ? null : (
          <li>
            <Link to="/register_login">Register/Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
