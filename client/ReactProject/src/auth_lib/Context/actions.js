import {Auth} from 'aws-amplify'

//check if user is authenticated
export async function userAuthenticated(){
  return (await Auth.currentSession()).isValid();
}

export async function loginUser(dispatch, loginPayload) {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    await Auth.signIn(loginPayload.email, loginPayload.password);
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