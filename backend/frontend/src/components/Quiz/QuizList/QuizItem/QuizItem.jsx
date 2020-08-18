import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import styles from './QuizItem.module.css';
import { getQuizzes, cloneQuiz, deleteQuiz } from '../../services';

const QuizItem = ({ quiz, onUpdate }) => {
    const updateQuizzes = () =>
        getQuizzes().then((updatedQuizzes) => onUpdate(updatedQuizzes));

    const onCloneQuiz = () => cloneQuiz(quiz._id).then(() => updateQuizzes());

    const onDeleteQuiz = () => deleteQuiz(quiz._id).then(() => updateQuizzes());

    return (
        <Card className={`text-center mb-4 shadow ${styles.card}`}>
            <Card.Body>
                <Row>
                    <Col
                        lg
                        style={{
                            backgroundImage: `url(${
                                quiz.thumb ? quiz.thumb : '/thumb.png'
                            })`,
                        }}
                        className={`${styles.thumb} p-2 d-none d-lg-inline ml-4`}
                    ></Col>
                    <Col
                        lg={10}
                        className="d-flex flex-column justify-content-between"
                    >
                        <Row className="justify-content-center test">
                            <p className={`p-2 ${styles.title}`}>
                                {quiz.title}
                            </p>
                        </Row>

                        <Row className="px-2 px-lg-5 mb-3">
                            <Col lg className="mt-2 mt-lg-0">
                                <Link
                                    to={`/host/${quiz._id}`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        variant="warning"
                                        block
                                        className={`${styles.button} text-white shadow`}
                                    >
                                        Host
                                    </Button>
                                </Link>
                            </Col>
                            <Col lg className="mt-2 mt-lg-0">
                                <Link
                                    to={`/quiz/${quiz._id}/edit`}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <Button
                                        variant="success"
                                        block
                                        className={`${styles.button} shadow`}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                            </Col>
                            <Col lg className="mt-2 mt-lg-0">
                                <Button
                                    variant="info"
                                    block
                                    onClick={onCloneQuiz}
                                    className={`${styles.button} shadow`}
                                >
                                    Clone
                                </Button>
                            </Col>
                            <Col lg className="mt-2 mt-lg-0">
                                <Button
                                    variant="danger"
                                    block
                                    onClick={onDeleteQuiz}
                                    className={`${styles.button} shadow`}
                                >
                                    Delete
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default QuizItem;
