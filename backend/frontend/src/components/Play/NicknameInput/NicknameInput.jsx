import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AppAlert from '../../../common/components/Alert/Alert';
import { validateUsername } from '../../../common/validators';
import styles from './NicknameInput.module.css';

const NicknameInput = ({ onNicknameSet }) => {
    const { register, handleSubmit } = useForm();
    const [alert, setAlert] = useState({
        content: '',
        variant: '',
        dismissible: true,
        show: false,
    });

    const onSubmit = (formData) => {
        const { error } = validateUsername(formData.nickname);
        if (error)
            return setAlert({
                content: error,
                variant: 'danger',
                dismissible: true,
                show: true,
            });
        onNicknameSet(formData.nickname);
    };

    return (
        <Card className="mb-5 shadow-lg mx-4">
            <Card.Body>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`${styles.form} text-center`}
                >
                    {alert.show && (
                        <AppAlert
                            variant={alert.variant}
                            content={alert.content}
                            dismissible={alert.dismissible}
                            setShow={setAlert}
                        />
                    )}
                    <Form.Group controlId="formNickname">
                        <Form.Label className="h3 mb-1">
                            What's your nickname?
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter nickname"
                            ref={register()}
                            name="nickname"
                            size="lg"
                            className={`${styles.inputNickname} text-center`}
                            autoFocus
                        ></Form.Control>
                    </Form.Group>
                    <Button
                        variant="danger"
                        block
                        type="submit"
                        size="lg"
                        className={`${styles.form} mt-3`}
                    >
                        Join
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default NicknameInput;
