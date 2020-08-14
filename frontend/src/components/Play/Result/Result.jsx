import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Result = ({ correctAnswers, leaderboard, playerNum, onNext, isEnd }) => {
    return (
        <Container>
            <Card className={`shadow-lg mb-4`}>
                <Card.Body className="d-flex flex-column">
                    <p className={`text-center`}>
                        {correctAnswers.map((a) => (
                            <span key={a.id}>{a.title}</span>
                        ))}
                    </p>
                    <Card.Text>
                        {leaderboard.map((player) => (
                            <p
                                key={player.number}
                                className={
                                    playerNum && playerNum === player.number
                                        ? 'lead'
                                        : null
                                }
                            >
                                Rank {player.rank}: {player.nickname} (
                                {player.score})
                            </p>
                        ))}
                    </Card.Text>
                    {onNext && !isEnd ? (
                        <Button
                            variant="danger"
                            block
                            size="lg"
                            className={`mt-auto`}
                            onClick={() => onNext()}
                        >
                            Next
                        </Button>
                    ) : null}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Result;
