import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

import styles from './Host.module.css';
import Config from '../../config/index';

const Host = () => {
    const socketRef = useRef();
    const { quizId } = useParams();
    const [roomId, setRoomId] = useState();
    const [playerList, setPlayerList] = useState([]);

    const onNext = () => {
        socketRef.current.emit('nextQuestion');
    };

    const getRandomVariant = () => {
        const random = Math.floor(Math.random() * 7);
        const variants = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
        ];
        return variants[random];
    };

    useEffect(() => {
        socketRef.current = io(Config.backendURL);

        socketRef.current.emit('hostJoin', { quizId });

        socketRef.current.on('roomCreated', ({ id, quiz }) => {
            console.log(quiz);
            setRoomId(id);
        });

        socketRef.current.on('playerJoin', () => {
            console.log('a player has joined');
        });

        socketRef.current.on('playerList', (playerNameList) => {
            setPlayerList(playerNameList);
        });
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <Container>
                <Card className={`${styles.card} shadow-lg mb-4`}>
                    <Card.Body className="d-flex flex-column">
                        <p className={`${styles.title} text-center`}>
                            PIN: {roomId}
                        </p>
                        <Card.Text className={styles.text}>
                            Players: {playerList.length}
                            {playerList.length > 0 ? (
                                <ListGroup horizontal="lg" className="my-2">
                                    {playerList.map((player) => (
                                        <ListGroup.Item
                                            variant={getRandomVariant()}
                                        >
                                            {player}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            ) : null}
                        </Card.Text>
                        {roomId ? (
                            <Button
                                variant="danger"
                                block
                                size="lg"
                                onClick={onNext}
                                className={`${styles.button} mt-auto`}
                            >
                                Start
                            </Button>
                        ) : null}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default Host;
