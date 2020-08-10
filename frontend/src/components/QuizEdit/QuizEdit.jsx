import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Config from '../../config';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import QuestionList from './QuestionList';

const QuizEdit = () => {
    const { quizId } = useParams();
    const { register, control, handleSubmit, getValues, reset } = useForm({
        defaultValues: {
            title: '',
            questions: [
                {
                    number: 1,
                    title: '',
                    type: 'single',
                    timeLimit: 15,
                    point: 2000,
                    answers: [
                        {
                            id: 1,
                            title: '',
                            correct: true,
                        },
                        {
                            id: 2,
                            title: '',
                            correct: false,
                        },
                        {
                            id: 3,
                            title: '',
                            correct: false,
                        },
                        {
                            id: 4,
                            title: '',
                            correct: false,
                        },
                    ],
                },
            ],
        },
    });

    const onSubmit = (data) => {
        for (let i = 0; i < data.questions.length; i++) {
            data.questions[i].number = i + 1;
            data.questions[i].correctAnswers = [];
            for (let j = 0; j < data.questions[i].answers.length; j++) {
                data.questions[i].answers[j].id = j + 1;
                if (data.questions[i].answers[j].correct)
                    data.questions[i].correctAnswers.push(j + 1);
            }
        }
        fetch(`${Config.backendURL}/api/quiz/${quizId}`, {
            credentials: 'include',
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    };

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(
                `${Config.backendURL}/api/quiz/${quizId}`,
                {
                    credentials: 'include',
                }
            ).then((res) => res.json());
            for (let i = 0; i < data.questions.length; i++) {
                for (let j = 0; j < data.questions[i].answers.length; j++) {
                    if (
                        data.questions[i].correctAnswers.findIndex(
                            (a) => a === data.questions[i].answers[j].id
                        ) !== -1
                    )
                        data.questions[i].answers[j].correct = true;
                    else data.questions[i].answers[j].correct = false;
                }
            }
            reset(data);
        }
        fetchData();
    }, [reset]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Row>
                <Col xs={10}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Quiz Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="Quiz title"
                            name="title"
                            ref={register({ required: true })}
                        />
                    </InputGroup>
                </Col>
                <Col>
                    <Button variant="primary" block type="submit">
                        Done
                    </Button>
                </Col>
            </Form.Row>
            <Form.Row>
                <QuestionList {...{ control, register, getValues }} />
            </Form.Row>
        </Form>
    );
};

export default QuizEdit;
