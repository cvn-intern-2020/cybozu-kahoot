import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import PlayerList from './PlayerList/PlayerList';
import Config from '../../config/index';

const Host = () => {
    const socketRef = useRef();
    const { quizId } = useParams();
    const [roomId, setRoomId] = useState();
    const [playerList, setPlayerList] = useState([]);

    const [scene, setScene] = useState('waiting');

    const renderSwitch = (currentScene) => {
        switch (currentScene) {
            case 'waiting':
                return <PlayerList pin={roomId} players={playerList} />;
            default:
                return null;
        }
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
            {renderSwitch(scene)}
        </div>
    );
};

export default Host;
