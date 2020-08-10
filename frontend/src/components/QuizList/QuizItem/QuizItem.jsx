import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { getQuizzes, cloneQuiz, deleteQuiz } from '../quizServices';

const QuizItem = ({ quiz, onUpdate }) => {
    const updateQuizzes = () =>
        getQuizzes().then((updatedQuizzes) => onUpdate(updatedQuizzes));

    const onCloneQuiz = () => cloneQuiz(quiz._id).then(() => updateQuizzes());

    const onDeleteQuiz = () => deleteQuiz(quiz._id).then(() => updateQuizzes());

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
                        <Link
                            to={`/quiz/${quiz._id}/edit`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button variant="success" block>
                                Edit
                            </Button>
                        </Link>
                    </Col>
                    <Col sm className="mt-2 mt-sm-0">
                        <Button variant="info" block onClick={onCloneQuiz}>
                            Clone
                        </Button>
                    </Col>
                    <Col sm className="mt-2 mt-sm-0">
                        <Button variant="danger" block onClick={onDeleteQuiz}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default QuizItem;
