import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './RegisterLogin.module.css';
import { authUser } from './services';
import AppAlert from '../Alert/Alert';

const RegisterLogin = () => {
    const [alert, setAlert] = useState({
        content: '',
        variant: '',
        dismissible: true,
        show: false,
    });
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (formData) => {
        const result = await authUser(formData);

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

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            setAlert({
                content: errors[Object.keys(errors)[0]].message,
                variant: 'danger',
                dismissible: true,
                show: true,
            });
        }
    }, [errors]);

    return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <Card className={`${styles.authFormContainer} shadow-lg mb-5`}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">
                        <h2 className={styles.label}>Register/Login</h2>
                    </Card.Title>
                    {alert.show ? (
                        <AppAlert
                            variant={alert.variant}
                            content={alert.content}
                            dismissible={alert.dismissible}
                            setShow={setAlert}
                        />
                    ) : null}
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Email cannot be empty.',
                                    },
                                })}
                                name="email"
                                size="lg"
                                className={styles.input}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                ref={register({
                                    required: {
                                        value: true,
                                        message: 'Password cannot be empty.',
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            'Password must contain at least 6 characters.',
                                    },
                                })}
                                name="password"
                                size="lg"
                                className={styles.input}
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            variant="danger"
                            block
                            className={`${styles.button} mt-4`}
                            type="submit"
                            size="lg"
                        >
                            Register/Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default RegisterLogin;
