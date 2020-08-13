import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import Config from '../../config/index';

const Host = () => {
    const { roomId } = useParams();
    const [yourId, setYourId] = useState();

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(`${Config.backendURL}/host`);

        socketRef.current.emit('hostJoin', { roomId });

        socketRef.current.on('playerJoin', () => {
            console.log('a player has joined');
        });
    }, []);

    return <div>a</div>;
};

export default Host;
