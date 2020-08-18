import React from 'react';
import ReactDOM from 'react-dom';
import App from './common/components/Main/App';
import UserContextProvider from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GlobalStyles.css';

ReactDOM.render(
    <UserContextProvider>
        <App />
    </UserContextProvider>,
    document.getElementById('root')
);
