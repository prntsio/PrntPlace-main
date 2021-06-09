import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
    isAuth,
    component: Component,
    extraComponent: ExtraComponent,
    account,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                console.log('account in protected route: ', account);
                if (account) {
                    if (isAuth) {
                        return <Component props={props} />;
                    } else {
                        return <ExtraComponent />;
                    }
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location },
                            }}
                        />
                    );
                }
            }}
        />
    );
};

export default ProtectedRoute;
