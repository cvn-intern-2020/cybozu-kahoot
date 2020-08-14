import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Countdown from '../Countdown/Countdown';

const Question = ({ question, startTime, onAnswer }) => {
    return (
        <Container>
            <Card className={`shadow-lg mb-4`}>
                <Card.Body className="d-flex flex-column">
                    <p className={`text-center`}>{question.title}</p>
                    <Countdown time={question.timeLimit * 1000 + startTime} />
                    {question.answers.map((answer) => (
                        <Button
                            key={answer.id}
                            disabled={!onAnswer ? true : false}
                            onClick={() =>
                                onAnswer ? onAnswer(answer.id) : null
                            }
                        >
                            {answer.title}
                        </Button>
                    ))}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Question;
