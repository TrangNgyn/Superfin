import { useState, useContext, createContext } from "react"
import { userConstants } from '../../_constants/user.constants';

const AuthContext = createContext();
const AuthUpdateContext = createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function useAuthUpdate(){
    return useContext(AuthUpdateContext);
}

const initialAuth = () => {
    const user = JSON.parse(localStorage.getItem('SUPERFIN_USER'));
    if(user === null) return {roles: [userConstants.ROLE_GUEST]};
    return user;
}

const AuthProvider = ({children}) => {
    const [authType, setAuthType] = useState(initialAuth());
    console.log(authType);

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