import React, { useState, createContext, useEffect } from 'react';
import Config from '../config';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`${Config.backendURL}/api/auth/user`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((user) => setData(user))
            .catch((err) => setData(null));
    }, []);

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
