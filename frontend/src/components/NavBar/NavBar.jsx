import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Config from '../../config';

const NavBar = () => {
    const data = useContext(UserContext);
    const logout = () => {
        fetch(`${Config.backendURL}/api/auth/logout`, {
            credentials: 'include',
        }).then((res) => (window.location.href = '/'));
    };

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
                <Button className="mr-2" variant="success" href="/#">
                    Create quiz
                </Button>
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
