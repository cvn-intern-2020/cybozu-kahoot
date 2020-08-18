import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';

import { getQuizzes } from '../services';
import QuizItem from './QuizItem/QuizItem';
import styles from './QuizList.module.css';

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
            {quizzes.length === 0 && (
                <div className={`text-white ${styles.text}`}>
                    <p>Wow, such empty!</p>
                    <h2>It seems that you haven't created any quiz yet.</h2>
                </div>
            )}
            {quizzes.map((quiz) => (
                <QuizItem key={quiz._id} quiz={quiz} onUpdate={onUpdate} />
            ))}
        </Container>
    );
};

export default QuizList;
