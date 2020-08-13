import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import Config from '../../config/index';

const Host = () => {
    const socketRef = useRef();
    const { quizId } = useParams();
    const [roomId, setRoomId] = useState();
    const [playerList, setPlayerList] = useState([]);

    const onNext = () => {
        socketRef.current.emit('nextQuestion');
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
        <div>
            PIN: {roomId}. Players: {playerList.join(',')}
            {roomId ? (
                <Button variant="danger" block size="lg" onClick={onNext}>
                    Next
                </Button>
            ) : null}
        </div>
    );
};

export default Host;
