import {Auth} from 'aws-amplify'

export async function loginUser(dispatch, payload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    await Auth.signIn(payload.email, payload.password);
    dispatch({ type: 'LOGIN_SUCCESS' });
    console.log("Signed in successfully!");   

  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error.message });
  }
}
 
export async function logout(dispatch) {
  try{
    dispatch({ type: 'LOGOUT' });
    await Auth.signOut();
    console.log("Logged out successfully!")
  }catch(error){
    console.log("Error logging out: " + error.message);
  }
}

// ----- Sign Up actions ----- //
// Create new account
export async function signUp(dispatch, payload) {
  try {
    const { user } = await Auth.signUp(payload
    // INFO NEEDED FOR SIGNING UP
      // {
      // username,
      // password,
      // attributes: {
      //   email,          // optional
      //   phone_number,   // optional - E.164 number convention
      //   // other custom attributes 
      // }
    // }
    );
    console.log(user);
  } catch (error) {
      console.log('error signing up:', error);
  }
}
// Confirm newly created account
export async function confirmSignUp(dispatch, payload) {
  try {
    await Auth.confirmSignUp(payload.username, payload.code);
  } catch (error) {
      console.log('error confirming sign up', error);
  }
}

// change password when user is logged in
export async function changePassword(dispatch, payload){
  await Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, payload.oldPassword, payload.newPassword);
    })
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

// ----- Forgot Password actions ----- //
// Send confirmation code to user's email
export async function forgotPasswordEmail(dispatch, payload){
  await Auth.forgotPassword(payload.username)
    .then(data => console.log(data))
    .catch(err => console.log(err));

}
// Submit confirmation code and new password
export async function forgotPasswordSubmit(dispatch, payload){  
  await Auth.forgotPasswordSubmit(payload.username, payload.code, payload.new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
}