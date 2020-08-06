import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Config from '../../../config';

const QuizItem = ({ quiz, onUpdate }) => {
    const updateQuizzes = () => {
        fetch(`${Config.backendURL}/api/quiz`, { credentials: 'include' })
            .then((res) => res.json())
            .then((updatedQuizzes) => onUpdate(updatedQuizzes));
    };

    const cloneQuiz = () => {
        fetch(`${Config.backendURL}/api/quiz/${quiz._id}/clone`, {
            credentials: 'include',
            method: 'post',
        }).then(() => updateQuizzes());
    };

    const deleteQuiz = () => {
        fetch(`${Config.backendURL}/api/quiz/${quiz._id}`, {
            credentials: 'include',
            method: 'delete',
        }).then(() => updateQuizzes());
    };

    return (
        <Card className="text-center mb-4 shadow">
            <Card.Body>
                <Card.Title className="p-2">
                    <h2>{quiz.title}</h2>
                </Card.Title>
                <Row>
                    <Col sm className="mt-2 mt-sm-0">
                        <Button variant="primary" block>
                            Host
                        </Button>
                    </Col>
                    <Col sm className="mt-2 mt-sm-0">
                        <Button variant="success" block>
                            Edit
                        </Button>
                    </Col>
                    <Col sm className="mt-2 mt-sm-0">
                        <Button variant="info" block onClick={cloneQuiz}>
                            Clone
                        </Button>
                    </Col>
                    <Col sm className="mt-2 mt-sm-0">
                        <Button variant="danger" block onClick={deleteQuiz}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default QuizItem;
