import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import Config from '../../config/index';
import NicknameInput from './NicknameInput/NicknameInput';
import PlayerList from './PlayerList/PlayerList';

const Join = () => {
    const { roomId } = useParams();

    const socketRef = useRef();

    const [scene, setScene] = useState('naming');
    const [nickname, setNickname] = useState('No name');
    const [playerList, setPlayerList] = useState([]);

    useEffect(() => {
        socketRef.current = io(Config.backendURL);

        socketRef.current.emit('playerJoin', { roomId });

        socketRef.current.on('nextQuestion', (question) => {
            console.log(question);
        });

        socketRef.current.on('playerList', (playerNameList) => {
            setPlayerList(playerNameList);
        });
    }, []);

    const renderSwitch = (currentScene) => {
        switch (currentScene) {
            case 'naming':
                return (
                    <NicknameInput
                        onNicknameSet={(name) => {
                            setScene('waiting');
                            setNickname(name);
                        }}
                    />
                );
            case 'waiting':
                return <PlayerList pin={roomId} players={playerList} />;
            default:
                return null;
        }
    };

    useEffect(() => {
        socketRef.current.emit('registerNickname', { nickname });
    }, [nickname]);

    return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
            {renderSwitch(scene)}
        </div>
    );
};

export default Join;
