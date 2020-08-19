import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Countdown from '../Countdown/Countdown';
import { keyToVariants } from '../../../common/utils';
import styles from './Question.module.css';

const Question = ({ question, startTime, onAnswer }) => {
    const [chosenAnswer, setChosenAnswer] = useState();

    return (
        <Container>
            <Card className={`shadow-lg mb-4`}>
                <Card.Body className="d-flex flex-column">
                    <Card.Title className={styles.title}>
                        <Badge
                            variant="danger"
                            className={`${styles.badge} mr-2`}
                        >
                            {question.number}
                        </Badge>
                        <span className="mr-2">{question.title}</span>
                    </Card.Title>
                    {question.media ? (
                        <Row className={`my-1 my-lg-3 p-0 ${styles.media}`}>
                            <Col className="p-0 d-none d-sm-block"></Col>
                            <Col
                                sm={7}
                                className={`${styles.image} p-0 mb-2 mb-sm-0`}
                                style={{
                                    backgroundImage: `url(${question.media.url})`,
                                }}
                            ></Col>
                            <Col
                                sm
                                className="p-0 d-flex align-items-center justify-content-end pr-3"
                            >
                                <Countdown
                                    time={question.timeLimit * 1000 + startTime}
                                />
                            </Col>
                        </Row>
                    ) : (
                        <Row className="my-1 my-lg-3 p-0">
                            <Col
                                sm
                                className="p-0 d-flex align-items-center justify-content-end pr-3"
                            >
                                <Countdown
                                    time={question.timeLimit * 1000 + startTime}
                                />
                            </Col>
                        </Row>
                    )}
                    <Row>
                        {question.answers.map((answer) => (
                            <Col md={6}>
                                <Button
                                    key={answer.id}
                                    disabled={
                                        !onAnswer ||
                                        (chosenAnswer &&
                                            chosenAnswer !== answer.id)
                                            ? true
                                            : false
                                    }
                                    onClick={() => {
                                        if (chosenAnswer !== undefined) return;
                                        setChosenAnswer(answer.id);
                                        if (onAnswer) onAnswer(answer.id);
                                    }}
                                    block
                                    className={`${styles.answer} mt-3 shadow`}
                                    variant={keyToVariants(answer.id + 1)}
                                >
                                    {answer.title}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Question;
