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


/* THESE ARE BAREBONE FUNCTIONS AS A REFERENCE, NOT COMPLETE ACTIONS
// sign up
async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes 
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

// confirm sign up
async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

// resend sign up confirmation code
async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

// change password (when user signed in)
Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, 'oldPassword', 'newPassword');
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
    
 // forgot password has two steps:
// 1. Send confirmation code to user's email
Auth.forgotPassword(username)
    .then(data => console.log(data))
    .catch(err => console.log(err));

// 2. Collect confirmation code and new password, then
Auth.forgotPasswordSubmit(username, code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));

// update user info of the currently signed in user
let user = await Auth.currentAuthenticatedUser();

let result = await Auth.updateUserAttributes(user, {
    '// add any attribute here
    'last_name': 'Lastname'
});
console.log(result); // SUCCESS



*/
