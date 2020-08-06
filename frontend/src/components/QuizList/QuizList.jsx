import React, { useState, useEffect } from 'react';
import QuizItem from './QuizItem/QuizItem';
import Container from 'react-bootstrap/Container';
import Config from '../../config';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetch(`${Config.backendURL}/api/quiz`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((foundedQuizzes) => setQuizzes(foundedQuizzes));
    }, []);

    const onUpdate = (updatedQuizzes) => {
        setQuizzes(updatedQuizzes);
    };

    return (
        <Container>
            {quizzes.map((quiz) => (
                <QuizItem key={quiz._id} quiz={quiz} onUpdate={onUpdate} />
            ))}
        </Container>
    );
};

export default QuizList;
