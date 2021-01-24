import './App.less';
import Navbar from '../SharedComponents/Navbar/Navbar';
import FooterMain from '../SharedComponents/Footer/FooterMain';

import { history } from '../_helpers/history';
import { Router, Route, Switch, useParams } from 'react-router-dom';

import Login from '../Pages/Login/Login';
import Homepage from '../Pages/Homepage/Homepage';
import Cart from '../Pages/Cart/Cart';
import ContactUs from '../Pages/ContactUs/ContactUs';
import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
import AboutUS from '../Pages/AboutUs/AboutUs';
import EmailRequest from '../Pages/EmailRequest/EmailRequest';
import ResetPasswordConfirmation from '../Pages/ResetPasswordConfirmation/ResetPasswordConfirmation';
import TermsConditions from '../Pages/TermsConditions/TermsConditions';
import CheckoutShipping from '../Pages/Checkout/CheckoutShipping';
import CheckoutSecurePayment from '../Pages/Checkout/CheckoutSecurePayment';
import CheckoutReviewOrder from '../Pages/Checkout/CheckoutReviewOrder';
import CheckoutOrderComplete from '../Pages/Checkout/CheckoutOrderComplete';







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







const App = () => (
   <div>
      <Router history = {history}>
         <div className="Website-Header">
            <Navbar />
         </div>

         <div className="Website-Body">
         <Switch>
            {/*<CustomerRoute path="/" component = {Homepage} exact />*/}           {/* This is how to use the private routes. Do not use them yet */}
            <Route exact path="/"><Homepage /></Route>

            <Route exact path="/products"> <Products /></Route>
            <Route exact path="/products/:browseBy"><Products /></Route>
            <Route path="/products/:browseBy/:browseByGroup"><Products /></Route>          {/*Undecided on Products page path*/}
            <Route path="/deliveryDispatch"> <DeliveryDispatch /></Route>
            <Route path="/contactUs"> <ContactUs /></Route>
            <Route path="/aboutUs"><AboutUS /></Route>
            <Route path="/login"><Login /></Route>
            <Route path="/emailRequest"><EmailRequest /></Route>
            <Route path="/resetPasswordConfirmation"><ResetPasswordConfirmation /></Route>
            <Route path="/TermsConditions"><TermsConditions /></Route>
            <Route path="/CheckoutShipping"><CheckoutShipping /></Route>
            <Route path="/CheckoutSecurePayment"><CheckoutSecurePayment /></Route>
            <Route path="/CheckoutReviewOrder"><CheckoutReviewOrder /></Route>
            <Route path="/CheckoutOrderComplete"><CheckoutOrderComplete /></Route>
            <Route path="/Cart"><Cart /></Route>
         </Switch>
         </div>

         <div className="Website-Footer">
            <FooterMain />
         </div>
      </Router>
   </div>
);

export default App;
