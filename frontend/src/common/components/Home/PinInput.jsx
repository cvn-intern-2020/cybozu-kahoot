import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import styles from './PinInput.module.css';

const PinInput = () => {
    return (
        <Card className=" mb-5 shadow-lg mx-4">
            <Card.Body>
                <Form className={`${styles.form} text-center px-1`}>
                    <Form.Group controlId="formPin">
                        <Form.Label className="h1 mb-1">
                            Enter your PIN
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="PIN"
                            name="pin"
                            size="lg"
                            className={`${styles.inputPin} text-center`}
                        />
                    </Form.Group>
                    <Button
                        variant="danger"
                        block
                        className={`${styles.form} mt-3`}
                        size="lg"
                    >
                        Let's play!
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default PinInput;
