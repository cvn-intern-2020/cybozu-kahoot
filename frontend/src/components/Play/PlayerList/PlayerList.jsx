import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import styles from './PlayerList.module.css';

const PlayerList = ({ pin, players, onStart }) => {
    return (
        <Container>
            <Card className={`${styles.card} shadow-lg mb-4`}>
                <Card.Body className="d-flex flex-column">
                    <p className={`${styles.title} text-center`}>PIN: {pin}</p>
                    <Card.Text className={styles.text}>
                        Players: {players.length}
                        {players.length > 0 ? (
                            <ListGroup horizontal="lg" className="my-2">
                                {players.map((player) => (
                                    <ListGroup.Item>{player}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : null}
                    </Card.Text>
                    {pin ? (
                        <Button
                            variant="danger"
                            block
                            size="lg"
                            className={`${styles.button} mt-auto`}
                        >
                            Start
                        </Button>
                    ) : null}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default PlayerList;
