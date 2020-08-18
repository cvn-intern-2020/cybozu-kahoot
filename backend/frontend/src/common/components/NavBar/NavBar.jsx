import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import styles from './NavBar.module.css';
import { UserContext } from '../../../contexts/UserContext';
import { logoutUser } from './services';
import { redirect } from '../../utils';

const NavBar = () => {
    const data = useContext(UserContext);

    const logout = () => logoutUser().then((res) => redirect('/'));

    return (
        <Navbar collapseOnSelect expand="md" className="flex-shrink-0">
            <Link to="/" className="mr-auto">
                <Navbar.Brand>
                    <img
                        height="60px"
                        src="/logo.png"
                        className="d-inline-block align-top"
                        alt="Cybozu logo"
                    />
                </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto d-flex mt-2 mt-md-0 justify-content-between text-right">
                    {!data ? null : (
                        <Link
                            to="/quizzes"
                            className={`${styles.navLink} mr-2 nav-link`}
                        >
                            Manage quizzes
                        </Link>
                    )}
                    {!data ? null : (
                        <Link
                            to="/quiz/new/edit"
                            className={`${styles.navLink} nav-link`}
                        >
                            Create quiz
                        </Link>
                    )}
                    {!data ? null : (
                        <NavDropdown
                            title={data.email}
                            alignRight
                            className={styles.navLink}
                        >
                            <NavDropdown.Item as="button">
                                <Link
                                    to="/change_password"
                                    className={styles.changePasswordLink}
                                >
                                    Change password
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logout}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    )}
                    {data ? null : (
                        <Link
                            to="/register_login"
                            className={`${styles.navLink} nav-link`}
                        >
                            Register/Login
                        </Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;
