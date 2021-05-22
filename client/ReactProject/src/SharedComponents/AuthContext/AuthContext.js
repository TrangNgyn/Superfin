import { useState, useContext, createContext } from "react"
import { userConstants } from '../../_constants/user.constants';
import { history } from '../../_helpers/history';
import { _checkLocalStorageObj } from '../../_services/SharedFunctions';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function useAuthUpdate(){
    return useContext(AuthUpdateContext);
}

const initialAuth = () => {
    try{
        const user = JSON.parse(localStorage.getItem('SUPERFIN_USER'));             //protect against local storage tampering
        if(user === null){
            localStorage.setItem('SUPERFIN_USER', JSON.stringify({roles: [userConstants.ROLE_GUEST]}));
            return {roles: [userConstants.ROLE_GUEST]};
        }
        else if(!_checkLocalStorageObj(user)){
            localStorage.setItem('SUPERFIN_USER', JSON.stringify({roles: [userConstants.ROLE_GUEST]}));
            history.push('/login');
            return {roles: [userConstants.ROLE_GUEST]};
        }
        else return user;
    }
    catch{
        localStorage.setItem('SUPERFIN_USER', JSON.stringify({roles: [userConstants.ROLE_GUEST]}));
        history.push('/login');
        return {roles: [userConstants.ROLE_GUEST]};
    }
}


const AuthProvider = ({children}) => {
    const [authType, setAuthType] = useState(initialAuth());

    const updateAuth = USER => {
        setAuthType(USER);
    }

    return(
        <AuthContext.Provider value={authType}>
            <AuthUpdateContext.Provider value={updateAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
}

export default AuthProvider;