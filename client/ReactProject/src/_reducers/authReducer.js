import {authConstants} from '../_constants/auth.constants';

export const initialState = {
  isAuthenticated: false,
  loading: false,
  errorMessage: null
};
 
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      return {
        ...initialState,
        isAuthenticated: false,
        loading: true
      };
    case authConstants.LOGIN_SUCCESS:
      return {
        ...initialState,
        isAuthenticated: true,
        loading: false
      };
    case authConstants.LOGOUT:
      return {
        ...initialState,
        isAuthenticated: false,
      };
 
    case authConstants.LOGIN_ERROR:
      return {
        ...initialState,
        isAuthenticated: false,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      return state;
  }
};