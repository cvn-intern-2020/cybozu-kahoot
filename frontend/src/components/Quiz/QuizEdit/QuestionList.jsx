import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import { defaultQuestion } from '../services';

const QuestionList = ({ control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });

    const getMaxQuestionNum = () => {
        let maxQuestionNumber = 1;
        fields.forEach((question) => {
            if (question.number > maxQuestionNumber)
                maxQuestionNumber = question.number;
        });
        return maxQuestionNumber;
    };

    return (
        <Tab.Container defaultActiveKey="questions[0].number">
            <Col sm={2}>
                <Button
                    onClick={() =>
                        append(defaultQuestion(getMaxQuestionNum() + 1))
                    }
                >
                    Add question
                </Button>
                <Nav variant="pills" className="flex-column">
                    {fields.map((item, index) => {
                        return (
                            <Nav.Item key={item.number}>
                                <Row>
                                    <Nav.Link
                                        eventKey={`questions[${index}].number`}
                                    >
                                        Question {item.number}
                                    </Nav.Link>
                                    <Button
                                        type="button"
                                        variant="danger"
                                        onClick={() => remove(index)}
                                    >
                                        X
                                    </Button>
                                </Row>
                            </Nav.Item>
                        );
                    })}
                </Nav>
            </Col>
            <Col sm={10}>
                <Tab.Content>
                    {fields.map((item, index) => {
                        return (
                            <Tab.Pane
                                key={item.number}
                                eventKey={`questions[${index}].number`}
                            >
                                <Row>
                                    <Form.Control
                                        type="text"
                                        name={`questions[${index}].title`}
                                        ref={register()}
                                        defaultValue={item.title}
                                        placeholder="Enter quiz title..."
                                    />
                                </Row>
                                <Row>
                                    <Col sm={6}></Col>
                                    <Col>
                                        <Row>
                                            <Form.Control
                                                type="number"
                                                name={`questions[${index}].timeLimit`}
                                                ref={register()}
                                                defaultValue={item.timeLimit}
                                                placeholder="Enter time limit..."
                                            />
                                        </Row>
                                        <Row>
                                            <Form.Control
                                                type="number"
                                                name={`questions[${index}].point`}
                                                ref={register()}
                                                defaultValue={item.point}
                                                placeholder="Enter question max points..."
                                            />
                                        </Row>
                                        <Row>
                                            <Form.Control
                                                as="select"
                                                name={`questions[${index}].type`}
                                                ref={register()}
                                                defaultValue={item.point}
                                            >
                                                <option value="single">
                                                    Single
                                                </option>
                                                <option value="multi">
                                                    Multi
                                                </option>
                                            </Form.Control>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[0].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[0].title
                                                }
                                                placeholder="Enter 1st answer..."
                                            />
                                            <InputGroup.Append>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[0].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[0].correct
                                                    }
                                                />
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[1].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[1].title
                                                }
                                                placeholder="Enter 2nd answer..."
                                            />
                                            <InputGroup.Append>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[1].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[1].correct
                                                    }
                                                />
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[2].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[2].title
                                                }
                                                placeholder="Enter 3rd answer..."
                                            />
                                            <InputGroup.Append>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[2].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[2].correct
                                                    }
                                                />
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[3].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[3].title
                                                }
                                                placeholder="Enter 4th answer..."
                                            />
                                            <InputGroup.Append>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[3].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[3].correct
                                                    }
                                                />
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                        );
                    })}
                </Tab.Content>
            </Col>
        </Tab.Container>
    );
};

export default QuestionList;
