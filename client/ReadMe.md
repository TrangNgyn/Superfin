# Configure Amplify
In terminal: ``amplify configure``
  Enter the username, accessKeyId and secretKey if prompted
  The keys are stored on OneDrive in helpers/AWS/rootkeys.csv
  Make sure your aws-exports.js is there at the root directory of your React project

# Run the React Project
In Terminal run: ``npm install`` to install all dependencies
Run ``npm start`` to run the project

# Logging in into Superfin
I haven't worked on the SignUp page yet so use these credentials to test the signing up feature:
Email: tttn941@uowmail.edu.au
Password: Password123

# Private Route
I have only set HomepageAdmin to private so if you want to test the feature with other pages,
simply add the routes to _auth_lib/Config/routes.js
It should redirect you to /login when you are not authenticated and trying to access HomepageAdmin
