import {Auth} from 'aws-amplify';
import {authConstants} from '../_constants/auth.constants';
import { history } from '../_helpers';

export function login(email, password) {
  return async (dispatch) => {
      dispatch(request({ email }));

      await Auth.signIn(email, password)
          .then(
              user => { 
                  dispatch(success(user.attributes.email));
                  history.push('/admin');
              }
          )
          .catch(error => {
            dispatch(failure(error.message));
          });
  };

  function request(user) { return { type: authConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: authConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: authConstants.LOGIN_FAILURE, error } }
}

export function logout() {
  return async (dispatch) => {
    await Auth.signOut()
    .then(() => dispatch({ type: authConstants.LOGOUT }));
  }
}