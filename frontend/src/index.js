import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main/Main';
import UserContextProvider from './contexts/UserContext';
import './GlobalStyles.css';

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
