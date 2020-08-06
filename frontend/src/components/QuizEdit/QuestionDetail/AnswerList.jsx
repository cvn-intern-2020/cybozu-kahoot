import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const AnswerList = ({ answers, correctAnswers }) => {
    return (
        <Row>
            {answers.map((answer) => (
                <Col key={answer._id}>
                    {answer.title}{' '}
                    <Form.Check
                        type="checkbox"
                        label="Correct"
                        checked={
                            correctAnswers.findIndex((a) => a === answer.id) !==
                            -1
                        }
                    />
                </Col>
            ))}
        </Row>
    );
};

export default AnswerList;
