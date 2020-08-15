import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import Countdown from './Countdown/Countdown';
import PlayerList from './PlayerList/PlayerList';
import Question from './Question/Question';
import Config from '../../config/index';
import Result from './Result/Result';

const Host = () => {
    const socketRef = useRef();
    const { quizId } = useParams();
    const [roomId, setRoomId] = useState();
    const [playerList, setPlayerList] = useState([]);
    const [nextQuestionTime, setNextQuestionTime] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();
    const [leaderboard, setLeaderboard] = useState();
    const [correctAnswers, setCorrectAnswers] = useState();
    const [currentCorrectAnswers, setCurrentCorrectAnswers] = useState();
    const [isEnd, setIsEnd] = useState(false);

    const [scene, setScene] = useState('waiting');

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

        socketRef.current.on('nextQuestion', (question) => {
            const timeTillQuestion = question.startTime - Date.now();
            setCurrentQuestion(question.question);
            setNextQuestionTime(question.startTime);
            if (timeTillQuestion > 0) setScene('counting');
            setTimeout(() => setScene('answering'), timeTillQuestion);
        });

        socketRef.current.on('currentCorrectAnswers', (currentCorrectAnswers) =>
            setCurrentCorrectAnswers(currentCorrectAnswers)
        );

        socketRef.current.on(
            'result',
            ({ correctAnswers, leaderboard, isEnd }) => {
                setCorrectAnswers(correctAnswers);
                setLeaderboard(leaderboard);
                setIsEnd(isEnd);
                setScene('result');
            }
        );

        return () => socketRef.current.close();
    }, []);

    const renderSwitch = (currentScene) => {
        switch (currentScene) {
            case 'waiting':
                return (
                    <PlayerList
                        pin={roomId}
                        players={playerList}
                        onStart={onNext}
                    />
                );
            case 'counting':
                return <Countdown time={nextQuestionTime} />;
            case 'answering':
                return (
                    <Question
                        question={currentQuestion}
                        startTime={nextQuestionTime}
                    />
                );
            case 'result':
                return (
                    <Result
                        correctAnswers={correctAnswers}
                        leaderboard={leaderboard}
                        onNext={onNext}
                        isEnd={isEnd}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
            {renderSwitch(scene)}
        </div>
    );
};

export default Host;
