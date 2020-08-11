import React, { useState, createContext, useEffect } from 'react';

import { getUser } from './services';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [data, setData] = useState();

    useEffect(
        () =>
            getUser()
                .then((user) => setData(user))
                .catch((err) => setData(null)),
        []
    );

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
