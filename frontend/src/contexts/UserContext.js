import React, { useState, createContext, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch('http://localhost:6969/api/auth/user', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((user) => setData(user))
      .catch((err) => setData(null));
  }, []);

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
