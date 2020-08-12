import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';
import RegisterLogin from '../../../components/RegisterLogin/RegisterLogin';
import QuizList from '../../../components/Quiz/QuizList/QuizList';
import NavBar from '../NavBar/NavBar';
import QuizEdit from '../../../components/Quiz/QuizEdit/QuizEdit';
import { UserContext } from '../../../contexts/UserContext';

const Main = () => {
    const user = useContext(UserContext);

    return (
        <Router>
            <Container fluid className="min-100 d-flex flex-column p-0">
                <NavBar></NavBar>
                <Switch>
                    <Route path="/" exact component={Home} />
                    {user ? (
                        <Route path="/quiz/:quizId/edit" component={QuizEdit} />
                    ) : null}
                    {user ? (
                        <Route path="/quizzes" component={QuizList} />
                    ) : null}
                    {!user ? (
                        <Route
                            path="/register_login"
                            component={RegisterLogin}
                        />
                    ) : null}
                </Switch>
            </Container>
        </Router>
    );
};

export default Main;
