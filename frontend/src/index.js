import React from 'react';
import ReactDOM from 'react-dom';
import Main from './common/components/Main/Main';
import UserContextProvider from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GlobalStyles.css';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <Main />
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
