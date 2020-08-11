import React, { useState, createContext, useEffect } from 'react';

import { getUser } from './services';

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [data, setData] = useState({ email: '' });

    useEffect(() => {
        async function fetchUser() {
            try {
                const user = await getUser();
                setData(user);
            } catch {
                setData(null);
            }
        }
        fetchUser();
    }, [props]);

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
