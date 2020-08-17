import React from 'react';
import { useFieldArray } from 'react-hook-form';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import styles from './QuestionList.module.css';

import { defaultQuestion } from '../services';

const QuestionList = ({ control, register, watch }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'questions',
    });
    console.log(fields);
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
            <Col sm={2} className={`px-3 ${styles.scroll}`}>
                <Button
                    className="btn btn-success btn-sm btn-block my-3"
                    onClick={() =>
                        append(defaultQuestion(getMaxQuestionNum() + 1))
                    }
                >
                    <h2>
                        <strong>+</strong>
                    </h2>
                </Button>
                <Nav
                    variant="pills"
                    className={`flex-row color mx-0 ${styles.questions}`}
                >
                    {fields.map((item, index) => {
                        return (
                            <Nav.Item key={item.number} className="w-100">
                                <Nav.Link
                                    exact
                                    to="/faq"
                                    activeStyle={{
                                        fontWeight: 'bold',
                                        backgroundcolor: 'red',
                                    }}
                                    eventKey={`questions[${index}].number`}
                                    variant="success"
                                >
                                    <div className="d-flex flex-row justify-content-between align-items-center">
                                        <strong className="d-flex">
                                            <span className="d-flex d-sm-none d-lg-flex mr-1">
                                                Question
                                            </span>
                                            {item.number}
                                        </strong>

                                        <Button
                                            type="button"
                                            variant="danger"
                                            class="close float-right ml-auto"
                                            onClick={() => remove(index)}
                                        >
                                            X
                                        </Button>
                                    </div>
                                </Nav.Link>
                            </Nav.Item>
                        );
                    })}
                </Nav>
            </Col>
            <Col>
                <Tab.Content>
                    {fields.map((item, index) => {
                        return (
                            <Tab.Pane
                                key={item.number}
                                eventKey={`questions[${index}].number`}
                            >
                                <Row className="mx-0">
                                    <Form.Control
                                        className={`form-control form-control-lg ml-3 mt-3 d-none d-sm-block ${styles.questionTitle}`}
                                        type="text"
                                        name={`questions[${index}].title`}
                                        ref={register()}
                                        defaultValue={item.title}
                                        placeholder="Question..."
                                    />
                                </Row>
                                <Row className="mx-0 mt-3">
                                    <Col sm={9}>
                                        <Row className="mx-0 mb-3 justify-content-center">
                                            <div
                                                class={`${styles.main_img} p-0 mb-2 mb-sm-0 shadow`}
                                                style={{
                                                    backgroundImage: `url(${watch(
                                                        `questions[${index}].media.url`
                                                    )})`,
                                                }}
                                            ></div>
                                        </Row>
                                        <Row className="mx-0 justify-content-center">
                                            <Form.Control
                                                type="text"
                                                placeholder="Image URL..."
                                                name={`questions[${index}].media.url`}
                                                ref={register()}
                                                defaultValue={item.media.url}
                                                className={styles.urlForm}
                                            />
                                        </Row>
                                    </Col>

                                    <Col>
                                        <Form.Group controlId="timeLimit">
                                            <Form.Label>Time limit</Form.Label>
                                            <InputGroup
                                                className={styles.input}
                                            >
                                                <Form.Control
                                                    type="number"
                                                    name={`questions[${index}].timeLimit`}
                                                    ref={register()}
                                                    defaultValue={
                                                        item.timeLimit
                                                    }
                                                    aria-describedby="timeLimit"
                                                    size="lg"
                                                />
                                                <InputGroup.Append className="d-none d-xl-flex">
                                                    <InputGroup.Text id="timeLimit">
                                                        seconds
                                                    </InputGroup.Text>
                                                </InputGroup.Append>
                                            </InputGroup>
                                            <Form.Text className="text-muted">
                                                From 10 to 60 seconds.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="point">
                                            <Form.Label>
                                                Maximum points
                                            </Form.Label>
                                            <Form.Control
                                                type="number"
                                                name={`questions[${index}].point`}
                                                ref={register()}
                                                defaultValue={item.point}
                                                aria-describedby="maxPoint"
                                                className={styles.input}
                                                size="lg"
                                            />
                                            <Form.Text className="text-muted">
                                                From 100 to 10000.
                                            </Form.Text>
                                        </Form.Group>
                                        <Form.Group controlId="point">
                                            <Form.Label>
                                                Question type
                                            </Form.Label>
                                            <Form.Control
                                                as="select"
                                                className={styles.input}
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
                                            <Form.Text className="text-muted">
                                                One or more correct answers.
                                            </Form.Text>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mt-1 mt-lg-5">
                                    <Col md={6}>
                                        <Form.Group controlId="answer1">
                                            <Form.Label>
                                                <Badge
                                                    variant="success"
                                                    className={`mr-2 ${styles.badge}`}
                                                >
                                                    Answer 1
                                                </Badge>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[0].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[0].correct
                                                    }
                                                />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[0].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[0].title
                                                }
                                                placeholder="Enter 1st answer..."
                                                className={styles.answer}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="answer2">
                                            <Form.Label>
                                                <Badge
                                                    variant="danger"
                                                    className={`mr-2 ${styles.badge}`}
                                                >
                                                    Answer 2
                                                </Badge>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[1].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[1].correct
                                                    }
                                                />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[1].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[1].title
                                                }
                                                placeholder="Enter 2nd answer..."
                                                className={styles.answer}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="answer3">
                                            <Form.Label>
                                                <Badge
                                                    variant="warning"
                                                    className={`mr-2 ${styles.badge}`}
                                                >
                                                    Answer 3
                                                </Badge>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[2].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[2].correct
                                                    }
                                                />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[2].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[2].title
                                                }
                                                placeholder="Enter 3rd answer..."
                                                className={styles.answer}
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="answer3">
                                            <Form.Label>
                                                <Badge
                                                    variant="primary"
                                                    className={`mr-2 ${styles.badge}`}
                                                >
                                                    Answer 4
                                                </Badge>
                                                <input
                                                    type="checkbox"
                                                    name={`questions[${index}].answers[3].correct`}
                                                    ref={register()}
                                                    defaultChecked={
                                                        item.answers[3].correct
                                                    }
                                                />
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name={`questions[${index}].answers[3].title`}
                                                ref={register()}
                                                defaultValue={
                                                    item.answers[3].title
                                                }
                                                placeholder="Enter 4th answer..."
                                                className={styles.answer}
                                            />
                                        </Form.Group>
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
