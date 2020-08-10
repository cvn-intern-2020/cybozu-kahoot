import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { UserContext } from '../../contexts/UserContext';
import Home from '../Home/Home';
import RegisterLogin from '../RegisterLogin/RegisterLogin';
import QuizList from '../Quiz/QuizList/QuizList';
import NavBar from '../NavBar/NavBar';
import QuizEdit from '../Quiz/QuizEdit/QuizEdit';

const Main = () => {
    const data = useContext(UserContext);
    // would be use to secure route

    return (
        <Router>
            <Container fluid className="min-100 d-flex flex-column p-0">
                <NavBar></NavBar>
                <Route path="/quiz/:quizId/edit" component={QuizEdit} />
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route
                        path="/register_login"
                        component={RegisterLogin}
                    ></Route>
                    <Route path="/quizzes" component={QuizList}></Route>
                </Switch>
            </Container>
        </Router>
    );
};

export default Main;
