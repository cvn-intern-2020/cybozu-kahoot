import React, { useContext, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Home from '../Home/Home';
import RegisterLogin from '../../../components/RegisterLogin/RegisterLogin';
import QuizList from '../../../components/Quiz/QuizList/QuizList';
import NavBar from '../NavBar/NavBar';
import QuizEdit from '../../../components/Quiz/QuizEdit/QuizEdit';

import ChangePassword from '../../../components/ChangePassword/ChangePassword';

import Host from '../../../components/Play/Host';
import Join from '../../../components/Play/Join';
import { UserContext } from '../../../contexts/UserContext';

const App = () => {
    const user = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof user !== 'undefined') setIsLoading(false);
    }, [user]);

    if (isLoading) return <span>loading...</span>;

    return (
        <Router>
            <Container fluid className="min-100 d-flex flex-column p-0">
                <NavBar></NavBar>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/host/:quizId" component={Host} />
                    <Route path="/join/:roomId" component={Join} />
                    {user ? (
                        <Route path="/quiz/:quizId/edit" component={QuizEdit} />
                    ) : (
                        <Redirect
                            from="/quiz/:quizId/edit"
                            to="/register_login"
                        />
                    )}
                    {user ? (
                        <Route path="/quizzes" component={QuizList} />
                    ) : (
                        <Redirect from="/quizzes" to="/register_login" />
                    )}
                    {user ? (
                        <Route
                            path="/change_password"
                            component={ChangePassword}
                        ></Route>
                    ) : (
                        <Redirect
                            from="/change_password"
                            to="/register_login"
                        />
                    )}
                    {!user ? (
                        <Route
                            path="/register_login"
                            component={RegisterLogin}
                        />
                    ) : (
                        <Redirect from="/register_login" to="/" />
                    )}
                </Switch>
            </Container>
        </Router>
    );
};

export default App;
