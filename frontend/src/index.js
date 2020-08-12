import React from 'react';
import ReactDOM from 'react-dom';
import App from './common/components/Main/App';
import UserContextProvider from './contexts/UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GlobalStyles.css';

ReactDOM.render(
    <React.StrictMode>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
