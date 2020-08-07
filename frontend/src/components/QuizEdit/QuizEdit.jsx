import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import QuizEditNavbar from './QuizEditNavbar/QuizEditNavbar';
import QuestionList from './QuestionList/QuestionList';
import QuestionDetail from './QuestionDetail/QuestionDetail';
import Config from '../../config';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const QuizEdit = () => {
    const { quizId } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState({
        number: 1,
        title: '',
        type: 'single',
        timeLimit: 20,
        point: 2000,
        answers: [],
        correctAnswers: [],
    });
    const [quiz, setQuiz] = useState({
        title: '',
        questions: [currentQuestion],
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

    const changeQuestionNumber = (questionNumber) => {
        setCurrentQuestion(
            quiz.questions.find((q) => q.number === questionNumber)
        );
    };
    const changeQuizTitle = (quizTitle) =>
        setQuiz({ ...quiz, title: quizTitle });
    const removeQuestion = (questionNumber) => {
        if (currentQuestion.number === questionNumber) changeQuestionNumber(1);
        let { questions } = quiz;
        const questionIndex = questions.findIndex(
            (q) => q.number === questionNumber
        );
        questions.splice(questionIndex, 1);
        setQuiz({ ...quiz, questions });
    };
    const updateQuiz = () => {
        fetch(`${Config.backendURL}/api/quiz/${quizId}`, {
            credentials: 'include',
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(quiz),
        });
    };

    return (
        <div>
            <QuizEditNavbar
                quiz={quiz}
                onChange={changeQuizTitle}
                onSubmit={updateQuiz}
            />
            <Row>
                <Col md={3} lg={2}>
                    <Button variant="success" block>
                        Add question
                    </Button>
                    <QuestionList
                        questions={quiz.questions}
                        changeQuestionNumber={changeQuestionNumber}
                        activeQuestionNumber={currentQuestion.number}
                        removeQuestion={removeQuestion}
                    ></QuestionList>
                </Col>
                <Col>
                    <QuestionDetail question={currentQuestion} />
                </Col>
            </Row>
        </div>
    );
};

export default QuizEdit;
