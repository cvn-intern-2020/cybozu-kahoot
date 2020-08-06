import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizEditNavbar from './QuizEditNavbar/QuizEditNavbar';
import Config from '../../config';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const QuizEdit = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState({ title: '', questions: [] });
    const [currentQuestion, setCurrentQuestion] = useState({
        number: 0,
        title: '',
        type: 'single',
        timeLimit: 20,
        point: 2000,
        answers: [],
        correctAnswers: [],
    });

    useEffect(() => {
        fetch(`${Config.backendURL}/api/quiz/${quizId}`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((foundedQuiz) => {
                setQuiz(foundedQuiz);
                setCurrentQuestion(foundedQuiz.questions[0]);
            });
    }, []);

    return (
        <div>
            <QuizEditNavbar
                quiz={quiz}
                onChange={(title) => {
                    let updatedQuiz = quiz;
                    updatedQuiz.title = title;
                    setQuiz(updatedQuiz);
                }}
            />
            <Row>
                <Col sm={2} md={3} lg={1}>
                    <Button block>Add question</Button>
                    <ListGroup>
                        {quiz.questions.map((question) => (
                            <ListGroup.Item
                                action
                                key={question.number}
                                onClick={() =>
                                    setCurrentQuestion(
                                        quiz.questions.find(
                                            (q) => q.number === question.number
                                        )
                                    )
                                }
                            >
                                Question {question.number}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <Row>
                        <Form className="w-100">
                            <Form.Control
                                type="text"
                                value={currentQuestion.title}
                                placeholder="Enter quiz title..."
                            />
                        </Form>
                    </Row>
                    <Row>
                        <Col sm={6}></Col>
                        <Col>
                            <Row>
                                <Form className="w-100">
                                    <Form.Control
                                        type="number"
                                        value={currentQuestion.timeLimit}
                                        placeholder="Enter quiz title..."
                                    />
                                </Form>
                            </Row>
                            <Row>
                                <Form className="w-100">
                                    <Form.Control
                                        type="number"
                                        value={currentQuestion.point}
                                        placeholder="Enter quiz title..."
                                    />
                                </Form>
                            </Row>
                            <Row>
                                <Form className="w-100">
                                    <Form.Control
                                        as="select"
                                        value={currentQuestion.type}
                                    >
                                        <option value="single">Single</option>
                                        <option value="multi">Multi</option>
                                    </Form.Control>
                                </Form>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        {currentQuestion.answers.map((answer) => (
                            <Col key={answer._id}>
                                {answer.title}{' '}
                                <Form.Check
                                    type="checkbox"
                                    label="Correct"
                                    checked={
                                        currentQuestion.correctAnswers.findIndex(
                                            (a) => a === answer.id
                                        ) !== -1
                                    }
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default QuizEdit;
