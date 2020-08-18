import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import { keyToVariants } from '../../../common/utils';
import styles from './Result.module.css';

const Result = ({ correctAnswers, leaderboard, playerNum, onNext, isEnd }) => {
    return (
        <Container>
            <Card className={`shadow-lg mb-4`}>
                <Card.Body className="d-flex flex-column">
                    {isEnd && (
                        <Row className="justify-content-center">
                            <p class={styles.answerContainer}>
                                The quiz has ended!
                            </p>
                        </Row>
                    )}
                    <Row className={styles.answerContainer}>
                        {`Correct answer${
                            correctAnswers.length > 1 ? 's:' : ':'
                        }`}

                        {correctAnswers.map((a) => (
                            <Badge
                                variant="primary"
                                key={a.id}
                                className={`${styles.answer} mx-2 shadow-sm`}
                            >
                                {a.title}
                            </Badge>
                        ))}
                    </Row>

                    <Row className="justify-content-center mt-3">
                        <ListGroup className={`${styles.leaderboard} shadow`}>
                            {leaderboard.map((player) => (
                                <ListGroup.Item
                                    key={player.number}
                                    active={
                                        Number.isInteger(playerNum) &&
                                        playerNum === player.number
                                            ? true
                                            : null
                                    }
                                    variant={keyToVariants(player.rank)}
                                >
                                    {player.rank}: {player.nickname} (
                                    {player.score})
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Row>
                    {onNext && !isEnd ? (
                        <Button
                            variant="danger"
                            block
                            size="lg"
                            className={`${styles.button} mt-3`}
                            onClick={() => onNext()}
                        >
                            Next question
                        </Button>
                    ) : null}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Result;
