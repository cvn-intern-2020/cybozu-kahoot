import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from '../../../contexts/UserContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const user = useContext(UserContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/register_login' }} />
                )
            }
        />
    );
};

export default ProtectedRoute;
