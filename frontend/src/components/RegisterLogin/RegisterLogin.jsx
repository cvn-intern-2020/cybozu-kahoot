import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './RegisterLogin.module.css';

import AppAlert from '../Alert/Alert';

const AUTH_ENDPOINT = 'http://localhost:6969/api/auth/register_login';

const RegisterLogin = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [alert, setAlert] = useState({
    content: '',
    variant: '',
    dismissible: true,
    show: false,
  });

  const authenticate = async (e) => {
    e.preventDefault();
    const result = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
      credentials: 'include',
    }).then((res) => res.json());
    if (result.success) return (window.location.href = '/');
    if (result.errors) {
      setAlert({
        content: result.errors,
        variant: 'danger',
        dismissible: true,
        show: true,
      });
    }
  };
  return (
    <Card className={`${styles.authFormContainer} shadow p-3`}>
      <Card.Body>
        <Card.Title className="text-center mb-4">
          <h3>Register/Login</h3>
        </Card.Title>
        {alert.show ? (
          <AppAlert
            variant={alert.variant}
            content={alert.content}
            dismissible={alert.dismissible}
            setShow={setAlert}
          />
        ) : null}
        <Form onSubmit={authenticate}>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmailValue(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordValue(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button
            variant="primary"
            onClick={(e) => authenticate(e)}
            block
            className="mt-4"
            type="submit"
          >
            Register/Login
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default RegisterLogin;
