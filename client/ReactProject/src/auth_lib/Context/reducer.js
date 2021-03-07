import React, { useReducer } from "react";
import {Auth} from 'aws-amplify';

export const initialState = {
  isAuthenticated: false,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        isAuthenticated: false,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        isAuthenticated: true,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        isAuthenticated: false,
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        isAuthenticated: false,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};