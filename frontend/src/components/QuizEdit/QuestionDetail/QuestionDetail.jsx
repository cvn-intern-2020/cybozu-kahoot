import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import AnswerList from './AnswerList';

const QuestionDetail = ({ question }) => {
    return (
        <div>
            <Row>
                <Form className="w-100">
                    <Form.Control
                        type="text"
                        value={question.title}
                        placeholder="Enter question..."
                    />
                </Form>
            </Row>
            <Row>
                <Col sm={6}></Col>
                <Col>
                    <Row>
                        <Form className="w-100">
                            <Form.Control
                                type="number"
                                value={question.timeLimit}
                                placeholder="Enter time limit..."
                            />
                        </Form>
                    </Row>
                    <Row>
                        <Form className="w-100">
                            <Form.Control
                                type="number"
                                value={question.point}
                                placeholder="Enter quiz title..."
                            />
                        </Form>
                    </Row>
                    <Row>
                        <Form className="w-100">
                            <Form.Control as="select" value={question.type}>
                                <option value="single">Single</option>
                                <option value="multi">Multi</option>
                            </Form.Control>
                        </Form>
                    </Row>
                </Col>
            </Row>
            <AnswerList
                answers={question.answers}
                correctAnswers={question.correctAnswers}
            />
        </div>
    );
};

export default QuestionDetail;
