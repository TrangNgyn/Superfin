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
    const user = JSON.parse(localStorage.getItem('USER'));
    if(user === null) return {type: userConstants.GUEST};
    return user;
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