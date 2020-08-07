import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const QuestionList = ({
    questions,
    changeQuestionNumber,
    activeQuestionNumber,
    removeQuestion,
}) => {
    return (
        <ListGroup>
            {questions.map((question) => (
                <ListGroup.Item
                    key={question.number}
                    active={
                        question.number === activeQuestionNumber ? true : false
                    }
                >
                    <Button
                        onClick={(e) => changeQuestionNumber(question.number)}
                    >
                        Question {question.number}
                    </Button>

                    <Button
                        className="ml-auto"
                        onClick={(e) => {
                            e.preventDefault();
                            removeQuestion(question.number);
                        }}
                    >
                        X
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default QuestionList;
