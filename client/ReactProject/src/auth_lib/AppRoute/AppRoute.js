import React from "react";
import { Redirect, Route } from "react-router-dom";
 
import { useAuthState } from '../Context'
 
const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
 
    const userDetails = useAuthState();
    return (
    <>
        {console.log(userDetails.isAuthenticated)}
        <Route
            path={path}
            render={props =>
                // Make sure user is authenticated before accessing private routes
                isPrivate && !Boolean(userDetails.isAuthenticated) ? (
                    <Redirect
                        to={{ pathname: "/login" }}
                    />
                ) : (
                        <Component {...props} />
                    )
            }
            {...rest}
        />
    </>
    )
}
 
export default AppRoutes