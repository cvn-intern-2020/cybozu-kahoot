import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
            <NavBar></NavBar>
            <Route path="/quiz/:quizId/edit" component={QuizEdit} />
            <Row className="h-75 justify-content-center align-items-center m-0 p-0">
                <Col>
                    <Switch>
                        <Route path="/" exact component={Home}></Route>
                        <Route
                            path="/register_login"
                            component={RegisterLogin}
                        ></Route>
                        <Route path="/quizzes" component={QuizList}></Route>
                    </Switch>
                </Col>
            </Row>
        </Router>
    );
};

export default Main;
