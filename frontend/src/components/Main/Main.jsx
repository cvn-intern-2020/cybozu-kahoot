import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import Home from '../Home/Home';
import RegisterLogin from '../RegisterLogin/RegisterLogin';
import NavBar from '../NavBar/NavBar';

const Main = () => {
  const data = useContext(UserContext);
  // would be use to secure route

  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/register_login" component={RegisterLogin}></Route>
      </Switch>
    </Router>
  );
};

export default Main;
