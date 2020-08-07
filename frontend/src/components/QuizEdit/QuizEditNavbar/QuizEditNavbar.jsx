import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const QuizEditNavbar = ({ quiz, onChange, onSubmit }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Form inline className="w-100">
                <FormControl
                    type="text"
                    value={quiz.title}
                    placeholder="Enter quiz title..."
                    className="mr-auto"
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                />
                <Button variant="outline-success" onClick={(e) => onSubmit()}>
                    Done
                </Button>
            </Form>
        </Navbar>
    );
};

export default QuizEditNavbar;
