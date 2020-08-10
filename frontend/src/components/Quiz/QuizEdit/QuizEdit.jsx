import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import {
    getQuiz,
    postQuiz,
    editQuiz,
    responseDataToFormData,
    formDataToRequestData,
    defaultQuiz,
} from '../quizServices';
import QuestionList from './QuestionList';

const QuizEdit = () => {
    const { quizId } = useParams();
    const { register, control, handleSubmit, getValues, reset } = useForm({
        defaultValues: defaultQuiz,
    });

    const onSubmit = (data) => {
        const requestBody = formDataToRequestData(data);
        if (quizId === 'new')
            postQuiz(requestBody).then(
                () => (window.location.href = '/quizzes')
            );
        else
            editQuiz(requestBody, quizId).then(
                () => (window.location.href = '/quizzes')
            );
    };

    useEffect(() => {
        if (quizId === 'new') return;
        async function fetchData() {
            const data = await getQuiz(quizId);
            reset(responseDataToFormData(data));
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
