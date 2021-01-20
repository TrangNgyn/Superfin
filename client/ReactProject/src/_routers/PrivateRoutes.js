import { Route, Redirect } from 'react-router-dom';

// '/admin' is the path to admin homepage, '/' is the path to the customer homepage


//These will be replaced by real API calls
function isAdmin(){
    return false;
}

function isMember(){
    return true;
}

function isGuest(){
    return false;
}

//checks if guest or memeber
function isCustomer(){
    if(isMember || isGuest) return true;
}


//Use this for any admin page router paths
export const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isAdmin() ? 
                <Component {...props} /> 
                : <Redirect to="/" />
        )} />
    );
};

//Use this for exclusively guest pages, ie. Login
export const GuestRoute = ({component: Component, ...rest}) => {

    const redirectPath = null;
    if(isAdmin) redirectPath = "/admin"
    else if(isMember)redirectPath = "/";

    return (
        <Route {...rest} render={props => (
            isGuest() ? 
                <Component {...props} /> 
                : <Redirect to={redirectPath} />
        )} />
    );
};

//Use this for exclusively memeber pages, ie. Account Profile
export const MemberRoute = ({component: Component, ...rest}) => {

    const redirectPath = null;
    if(isAdmin) redirectPath = "/admin"
    else if(isGuest)redirectPath = "/";

    return (
        <Route {...rest} render={props => (
            isMember ? 
                <Component {...props} /> 
                : <Redirect to={redirectPath} />
        )} />
    );
};

//Use this for pages that are accessed by both Members and Guests, but NOT Admin ie. Contact us
export const CustomerRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isCustomer ? 
                <Component {...props} /> 
                : <Redirect to="/admin" />
        )} />
    );
};







