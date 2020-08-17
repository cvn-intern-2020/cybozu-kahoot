import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from './ChangePassword.module.css';
import { changePassword } from './services';
import AppAlert from '../../common/components/Alert/Alert';

const ChangePassword = () => {
    const [alert, setAlert] = useState({
        content: '',
        variant: '',
        dismissible: true,
        show: false,
    });
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (formData) => {
        const result = await changePassword(formData);

        if (result.errors) {
            setAlert({
                content: result.errors,
                variant: 'danger',
                dismissible: true,
                show: true,
            });
        } else {
            setAlert({
                content: 'Password successfully changed.',
                variant: 'success',
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
                            <Form.Label>Current password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Current password"
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
                                name="oldPassword"
                                size="lg"
                                className={styles.input}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="New Password"
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
                                name="newPassword"
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
                            Change password
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ChangePassword;
