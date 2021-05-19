import { Route, Redirect } from 'react-router';
import { useAuth } from '../SharedComponents/AuthContext/AuthContext'; 
import { userConstants } from '../_constants/user.constants';

const PrivateRoute = ({component: Component, roles = [], ...rest}) => {
    const user = useAuth();
    const hasRole = roles.some(role => user.roles[0].includes(role));

    return (
        <Route {...rest} render={props => (
            hasRole 
            ? <Component {...props} /> 
            : user.roles[0] === userConstants.ROLE_ADMIN 
            ? <Redirect to='/admin'/> 
            : <Redirect to='/'/>
        )} />
    );
};

export default PrivateRoute;

