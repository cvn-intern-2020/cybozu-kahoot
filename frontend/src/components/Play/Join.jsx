import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';

import Config from '../../config/index';
import NicknameInput from './NicknameInput/NicknameInput';
import PlayerList from './PlayerList/PlayerList';
import Countdown from './Countdown/Countdown';
import Question from './Question/Question';
import Result from './Result/Result';

const Join = () => {
    const { roomId } = useParams();

    const socketRef = useRef();

    const [scene, setScene] = useState('naming');
    const [nickname, setNickname] = useState('No name');
    const [playerList, setPlayerList] = useState([]);
    const [score, setScore] = useState(0);
    const [nextQuestionTime, setNextQuestionTime] = useState();
    const [currentQuestion, setCurrentQuestion] = useState();
    const [leaderboard, setLeaderboard] = useState();
    const [correctAnswers, setCorrectAnswers] = useState();
    const [playerNum, setPlayerNum] = useState();

    const handleAnswer = (answerId) => {
        socketRef.current.emit('submitAnswer', { id: answerId });
    };

    useEffect(() => {
        socketRef.current = io(Config.backendURL);

        socketRef.current.emit('playerJoin', { roomId });

        socketRef.current.on('nextQuestion', (question) => {
            const timeTillQuestion = question.startTime - Date.now();
            setCurrentQuestion(question.question);
            setNextQuestionTime(question.startTime);
            if (timeTillQuestion > 0) setScene('counting');
            setTimeout(() => setScene('answering'), timeTillQuestion);
        });

        socketRef.current.on('playerList', (playerNameList) => {
            setPlayerList(playerNameList);
        });

        socketRef.current.on('result', ({ correctAnswers, leaderboard }) => {
            setCorrectAnswers(correctAnswers);
            setLeaderboard(leaderboard);
            setScene('result');
        });

        socketRef.current.on('playerNum', ({ number }) => {
            setPlayerNum(number);
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
            case 'counting':
                return <Countdown time={nextQuestionTime} />;
            case 'answering':
                return (
                    <Question
                        question={currentQuestion}
                        startTime={nextQuestionTime}
                        onAnswer={handleAnswer}
                    />
                );
            case 'result':
                return (
                    <Result
                        correctAnswers={correctAnswers}
                        leaderboard={leaderboard}
                        playerNum={playerNum}
                    />
                );
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
