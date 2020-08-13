import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import Config from '../../config/index';

const Join = () => {
    const { roomId } = useParams();

    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io(Config.backendURL);

        socketRef.current.emit('playerJoin', { roomId });
    }, []);

    return <div>a</div>;
};

export default Join;
