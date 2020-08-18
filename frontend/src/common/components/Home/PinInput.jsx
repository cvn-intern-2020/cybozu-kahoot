import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';

import { validatePIN } from '../../validators';
import { redirect } from '../../utils';
import { isGameExist } from './services';
import AppAlert from '../Alert/Alert';

import styles from './PinInput.module.css';

const PinInput = () => {
    const { register, handleSubmit } = useForm();

    const [alert, setAlert] = useState({
        content: '',
        variant: '',
        dismissible: true,
        show: false,
    });

    const onSubmit = async (formData) => {
        const { error } = validatePIN(formData.pin);
        if (error)
            return setAlert({
                content: error,
                variant: 'danger',
                dismissible: true,
                show: true,
            });
        const result = await isGameExist(formData.pin);
        if (!result.error) redirect(`/join/${formData.pin}`);
        else {
            setAlert({
                content: result.error,
                variant: 'danger',
                dismissible: true,
                show: true,
            });
        }
    };

    return (
        <Card className="mb-5 shadow-lg mx-4">
            <Card.Body>
                <Form
                    className={`${styles.form} text-center px-1`}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Form.Group controlId="formPin">
                        <Form.Label className="h1 mb-1">
                            Enter your PIN
                        </Form.Label>
                        {alert.show ? (
                            <AppAlert
                                variant={alert.variant}
                                content={alert.content}
                                dismissible={alert.dismissible}
                                setShow={setAlert}
                            />
                        ) : null}
                        <Form.Control
                            type="text"
                            placeholder="PIN"
                            name="pin"
                            size="lg"
                            className={`${styles.inputPin} text-center`}
                            ref={register()}
                            autoFocus
                        />
                    </Form.Group>
                    <Button
                        variant="danger"
                        block
                        className={`${styles.form} mt-3`}
                        size="lg"
                        type="submit"
                    >
                        Let's play!
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PinInput;
