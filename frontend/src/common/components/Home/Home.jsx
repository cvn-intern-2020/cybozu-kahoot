import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';

const Home = () => {
    const data = useContext(UserContext);
    return (
        <div>
            <h1>Home</h1>
            {data ? <p>Welcome back, {data.email}.</p> : null}
        </div>
    );
};

export default Home;
