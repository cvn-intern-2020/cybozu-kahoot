import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Countdown from '../../common/components/Countdown/Countdown';

import Config from '../../config/index';

const Join = () => {
    const { roomId } = useParams();

    const socketRef = useRef();

    const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();
    const [isCountdown, setIsCountdown] = useState(false);
    const [isAnswer, setIsAnswer] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (formData) => {
        socketRef.current.emit('registerNickname', {
            nickname: formData.nickname,
        });
    };

    useEffect(() => {
        socketRef.current = io(Config.backendURL);

        socketRef.current.emit('playerJoin', { roomId });

        socketRef.current.on('nextQuestion', (question) => {
            setCurrentQuestion(question.question);
            const now = new Date();
            setCurrentQuestionStartTime(question.startTime);
            if (now < currentQuestionStartTime) setIsCountdown(true);
        });
    }, []);

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formNickname">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter nickname"
                        ref={register()}
                        name="nickname"
                        size="lg"
                    ></Form.Control>
                </Form.Group>
                <Button variant="danger" block type="submit" size="lg">
                    Submit
                </Button>
            </Form>
            {isCountdown ? <Countdown time={currentQuestionStartTime} /> : null}
        </div>
    );
};

export default Join;
