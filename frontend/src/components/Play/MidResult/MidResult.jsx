import React from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

const MidResult = ({ correctAnswers, leaderboard }) => {
    console.log(correctAnswers);
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
                            <p key={player.number}>
                                Rank {player.rank}: {player.nickname} (
                                {player.score})
                            </p>
                        ))}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MidResult;
