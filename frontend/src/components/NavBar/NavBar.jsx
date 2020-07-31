import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import styles from './NavBar.module.css';

const NavBar = () => {
  const data = useContext(UserContext);
  const logout = () => {
    fetch('http://localhost:6969/api/auth/logout', {
      credentials: 'include',
    }).then((res) => (window.location.href = '/'));
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Link to="/" className="mr-auto">
        <Navbar.Brand>Cybozu Kahoot</Navbar.Brand>
      </Link>
      {!data ? null : (
        <Button variant="danger" href="/#" onClick={logout}>
          Logout
        </Button>
      )}
      {data ? null : (
        <Link to="/register_login">
          <Button variant="warning">Register/Login</Button>
        </Link>
      )}
    </Navbar>
  );
};

export default NavBar;
