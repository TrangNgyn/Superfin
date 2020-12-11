import './App.less';
/*import Navbar from '../SharedComponents/Navbar/Navbar'
import Cart from '../Pages/Cart/Cart';
import ContactUs from '../Pages/ContactUs/ContactUs';
import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
import Homepage from '../Pages/Homepage/Homepage';
import AboutUs from '../Pages/AboutUs/AboutUs';
import Blog from '../Pages/Blog/Blog';
import Login from '../Pages/Login/Login';
import MyAccount from '../Pages/MyAccount/MyAccount';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";*/


//Ignore this. Testing navbar props.
/*
let User = {
    loggedInStatus: "CUSTOMER"
}

let routePath = "/login";
let userComponent = Login;

if(User.loggedInStatus === "CUSTOMER"){
    routePath = "/myaccount";
    userComponent = MyAccount;
    console.log("customer logged in");
}
*/







const App = () => (

//test your components here inside this div....
<div>
    Hello World
</div>








//In development. Ignore this

/*
    <div>
        <Router>
            <Navbar {...User}/>
                <Switch>
                    <Route exact path = "/" component = {Homepage}/>
                    <Route path = "/deliverydispatch" component = {DeliveryDispatch}/>
                    <Route path = "/contactus" component = {ContactUs}/>
                    <Route path = "/aboutus" component = {AboutUs}/>
                    <Route path = "/blog" component = {Blog}/>
                    <Route path = {routePath} component = {userComponent}/>
                    <Route path = "/cart" component = {Cart}/> 
                </Switch>
            </Router>
  
    </div>

*/

);

export default App;
