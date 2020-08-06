import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const QuestionList = ({
    questions,
    changeQuestionNumber,
    activeQuestionNumber,
}) => {
    return (
        <ListGroup>
            {questions.map((question) => (
                <ListGroup.Item
                    action
                    key={question.number}
                    onClick={(e) => changeQuestionNumber(question.number)}
                    active={
                        question.number === activeQuestionNumber ? true : false
                    }
                >
                    Question {question.number}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default QuestionList;
