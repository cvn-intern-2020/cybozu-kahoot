import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { UserContext } from '../../contexts/UserContext';
import { logoutUser } from './navbarServices';

const NavBar = () => {
    const data = useContext(UserContext);

    const logout = () =>
        logoutUser().then((res) => (window.location.href = '/'));

    return (
        <Navbar bg="dark" variant="dark">
            <Link to="/" className="mr-auto">
                <Navbar.Brand>Cybozu Kahoot</Navbar.Brand>
            </Link>
            {!data ? null : (
                <Link to="/quizzes">
                    <Button className="mr-2" variant="primary">
                        Manage quizzes
                    </Button>
                </Link>
            )}
            {!data ? null : (
                <Link to="/quiz/new/edit">
                    <Button className="mr-2" variant="success">
                        Create quiz
                    </Button>
                </Link>
            )}
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
