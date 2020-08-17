import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';
import RegisterLogin from '../../../components/RegisterLogin/RegisterLogin';
import QuizList from '../../../components/Quiz/QuizList/QuizList';
import NavBar from '../NavBar/NavBar';
import QuizEdit from '../../../components/Quiz/QuizEdit/QuizEdit';
import ProtectedRoute from '../Protected/ProtectedRoute';
import ChangePassword from '../../../components/ChangePassword/ChangePassword';

const Main = () => {
    return (
        <Router>
            <Container fluid className="min-100 d-flex flex-column p-0">
                <NavBar></NavBar>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <ProtectedRoute
                        path="/quiz/:quizId/edit"
                        component={QuizEdit}
                    />
                    <Route
                        path="/register_login"
                        component={RegisterLogin}
                    ></Route>
                    <ProtectedRoute
                        path="/quizzes"
                        component={QuizList}
                    ></ProtectedRoute>
                    <Route
                        path="/change_password"
                        component={ChangePassword}
                    ></Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default Main;
