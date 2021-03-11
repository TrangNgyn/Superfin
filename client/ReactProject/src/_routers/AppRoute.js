import React from "react";
import { Redirect, Route } from "react-router-dom";
 
import {store} from "../_helpers/store";


const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
    // check if user is authenticated
    const {isAuthenticated} = store.getState().authReducer;
    
    return (
    <>
        {console.log({AppRoute: isAuthenticated})}
        <Route
            path={path}
            render={props =>
                // Make sure user is authenticated before accessing private routes
                !Boolean(isAuthenticated) ? (
                    <Redirect
                        to={{ pathname: "/login", state: {from: props.location} }}
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