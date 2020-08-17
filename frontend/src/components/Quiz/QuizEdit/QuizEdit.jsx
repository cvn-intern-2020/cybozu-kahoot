import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import {
    getQuiz,
    postQuiz,
    editQuiz,
    responseDataToFormData,
    formDataToRequestData,
    defaultQuiz,
} from '../services';
import { redirect } from '../../../common/utils';
import QuestionList from './QuestionList';
import styles from './QuizEdit.module.css';

const QuizEdit = () => {
    const { quizId } = useParams();
    const {
        register,
        control,
        handleSubmit,
        getValues,
        reset,
        watch,
        setValue,
    } = useForm({
        defaultValues: defaultQuiz,
    });

    const onSubmit = (data) => {
        const requestBody = formDataToRequestData(data);
        if (quizId === 'new')
            postQuiz(requestBody).then(() => redirect('/quizzes'));
        else editQuiz(requestBody, quizId).then(() => redirect('/quizzes'));
    };

    useEffect(() => {
        if (quizId === 'new') return;
        async function fetchData() {
            const data = await getQuiz(quizId);
            reset(responseDataToFormData(data));
        }
        fetchData();
    }, [quizId, reset]);

    return (
        <Container fluid className="d-flex justify-content-center flex-grow-1">
            <Card className={`w-100 py-4 px-3 mb-3 shadow ${styles.card}`}>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-100 d-flex flex-column"
                >
                    <Form.Row className={`flex-shrink-0 ${styles.form}`}>
                        <Col xs={8} lg={10} className="px-3">
                            <InputGroup>
                                <FormControl
                                    placeholder="Quiz title"
                                    name="title"
                                    ref={register({ required: true })}
                                    className={`${styles.quizTitle} h-100`}
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={4} lg={2}>
                            <Button
                                variant="danger"
                                block
                                type="submit"
                                className={`${styles.button} h-100`}
                            >
                                Done
                            </Button>
                        </Col>
                    </Form.Row>
                    <Form.Row className="d-flex justify-content-center flex-grow-1">
                        <QuestionList
                            {...{
                                control,
                                register,
                                getValues,
                                watch,
                                setValue,
                            }}
                        />
                    </Form.Row>
                </Form>
            </Card>
        </Container>
    );
};

export default QuizEdit;
