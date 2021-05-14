// import React, { useEffect, useState } from "react";
// import { Redirect, Route } from "react-router-dom";
// import {Auth} from 'aws-amplify';
// import {store} from "../_helpers/store";
// import {history} from '../_helpers/history';
// import { useDispatch } from "react-redux";
// import { checkLogInStatus } from "../_actions/authActions";


// const AppRoutes = ({ component: Component, path, isPrivate, ...rest }) => {
//     // check if user is authenticated
//     // const {isAuthenticated} = store.getState().authReducer;
//     const [authState, setAuthState] = useState(null);
//     useEffect(() => {
//         setAuthState(Auth.currentSession()
//             .then(session => {
//                 if(session.isValid()){
//                     setAuthState(true)
//                 }else{
//                     history.pushState("/login");
//                 }
//             })
//             .catch(error => setAuthState(false)));
//     }, []);

//     return (
//     <>
//         {console.log({AppRoute: authState})}
//         {/* <Route
//             path={path}
//             render={props =>
//                 // Make sure user is authenticated before accessing private routes
//                 !Boolean(authState) ? (
//                     <Redirect
//                         to={{ pathname: "/login", state: {from: props.location} }}
//                     />
//                 ) : (
//                         <Component {...props} />
//                     )
//             }
//             {...rest}
//         /> */}

//         {authState === null ? (
//             <div>Loading ...</div>
//         ) : authState === false ? (
//             <Route
//                 path={path}
//                 render={ props => 
//                     <Redirect
//                         to={{ pathname: "/login", state: {from: props.location} }}
//                     />
//                 }
//                 {...rest}
//             />
//         ) : (
//             <Route
//                 path={path}
//                 render={props => <Component {...props} />}
//                 {...rest}
//             />
//         )}
//     </>
//     )
// }
 
// export default AppRoutes