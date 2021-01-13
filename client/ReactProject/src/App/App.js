import './App.less';
import "../_assets/CSS/style.scss";

import Navbar from '../SharedComponents/Navbar/Navbar';
import FooterMain from '../SharedComponents/Footer/FooterMain';

import { history } from '../_helpers/history';
import { Router, Route, Switch, useParams } from 'react-router-dom';
import {AdminRoute, GuestRoute, MemberRoute, CustomerRoute} from '../_routers/PrivateRoutes';

import Login from '../Pages/Login/Login';
import EmailRequest from '../Pages/EmailRequest/EmailRequest';
import ResetPasswordConfirmation from '../Pages/ResetPasswordConfirmation/ResetPasswordConfirmation';
import ReenterPassword from '../Pages/ReenterPassword/ReenterPassword';
import MyAccount from '../Pages/MyAccount/MyAccount';
import Homepage from '../Pages/Homepage/Homepage';
import ContactUs from '../Pages/ContactUs/ContactUs';
import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
import AboutUS from '../Pages/AboutUs/AboutUs';






//This is a demo Component to demonstrate Dynmaic Routing
const Products = () => {
   const {browseBy, browseByGroup} = useParams();
   return(
      <div>
         <div>Products</div>
         <div>{browseBy}</div>
         <div>{browseByGroup}</div>
      </div>
   ); 
}



//    <div className="Website-Body">
//       <ReenterPassword />
//    </div>


// //This is a demo Component to demonstrate Dynmaic Routing
// const Products = () => {
//    const {browseBy, browseByGroup} = useParams();
//    return(
//       <div>
//          <div>Products</div>
//          <div>{browseBy}</div>
//          <div>{browseByGroup}</div>
//       </div>
//    ); 
// }

const App = () => (
   <div>
      <Router history = {history}>
         <div className="Website-Header">
            <Navbar />
         </div>

         <div className="Website-Body">
            <Switch>
               {/*<CustomerRoute path="/" component = {Homepage} exact />*/}           {/* This is how to use the private routes. Do not use them yet */}
               <Route exact path="/"> <Homepage /> </Route>

               <Route exact path="/products"> <Products /> </Route>
               <Route exact path="/products/:browseBy"> <Products /> </Route> 
               <Route path="/products/:browseBy/:browseByGroup"> <Products /> </Route>          {/*Undecided on Products page path*/}

               <Route path="/deliveryDispatch"> <DeliveryDispatch /> </Route>
               <Route path="/contactUs"> <ContactUs /> </Route>
               <Route path="/aboutUs"><AboutUS /></Route>  
               <Route path="/blog">  </Route>
               <Route path="/login"> <Login /> </Route>
               <Route path="/cart">  </Route>            
            </Switch>
         </div>

         <div className="Website-Footer">
            <FooterMain />
         </div>  
      </Router>
   </div>
);

export default App;
