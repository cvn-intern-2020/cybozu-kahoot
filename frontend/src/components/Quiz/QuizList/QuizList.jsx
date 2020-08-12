import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { getQuizzes } from '../services';
import QuizItem from './QuizItem/QuizItem';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        getQuizzes().then((foundedQuizzes) => setQuizzes(foundedQuizzes));
    }, []);

    const onUpdate = (updatedQuizzes) => {
        setQuizzes(updatedQuizzes);
    };

    return (
        <Container className="mt-3">
            {quizzes.map((quiz) => (
                <QuizItem key={quiz._id} quiz={quiz} onUpdate={onUpdate} />
            ))}
        </Container>
    );
};

export default QuizList;
