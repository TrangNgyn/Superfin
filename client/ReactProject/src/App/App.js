import './App.less';
import '../_assets/CSS/style.scss'
import Navbar from '../SharedComponents/Navbar/Navbar';
import { history } from '../_helpers/history';

// import { Router, Route, Switch, useParams } from 'react-router-dom';
import {
   Router,
   Redirect,
   Route,
   Switch,
} from 'react-router-dom';

import AppRoute from '../_routers/AppRoute';
import Login from '../Pages/Login/Login';
import HomepageAdmin from '../Pages/HomepageAdmin/HomepageAdmin';

// import Homepage from '../Pages/Homepage/Homepage';
// import ContactUs from '../Pages/ContactUs/ContactUs';
// import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
// import Blog from '../Pages/Blog/Blog';
// import AboutUS from '../Pages/AboutUs/AboutUs';
// import EmailRequest from '../Pages/EmailRequest/EmailRequest';
// import ResetPasswordConfirmation from '../Pages/ResetPasswordConfirmation/ResetPasswordConfirmation';
// import Order from '../Pages/Order/Order';
// import ReenterPassword from '../Pages/ReenterPassword/ReenterPassword'
// import CurrentOrders from '../Pages/CurrentOrders/CurrentOrders';
// import ProcessedOrders from '../Pages/ProcessedOrders/ProcessedOrders';
// import EditCompanyInfo from '../Pages/EditCompanyInfo/EditCompanyInfo';
// import ManageProducts from '../Pages/ManageProducts/ManageProducts';
// import MyAccount from '../Pages/MyAccount/MyAccount';
// import TermsConditions from '../Pages/TermsConditions/TermsConditions';
// import CheckoutShipping from '../Pages/Checkout/CheckoutShipping';
// import CheckoutSecurePayment from '../Pages/Checkout/CheckoutSecurePayment';
// import CheckoutReviewOrder from '../Pages/Checkout/CheckoutReviewOrder';
// import CheckoutOrderComplete from '../Pages/Checkout/CheckoutOrderComplete';
import Footer from '../SharedComponents/Footer/FooterMain';

import Amplify, {Auth} from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);
Auth.configure(awsconfig);


//This is a demo Component to demonstrate Dynmaic Routing
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

         <div className="Website-Body" >
            <Switch>
           
               {/* <Route exact path="/"><Homepage /></Route> */}
               {/* <Route exact path="/admin"><HomepageAdmin /></Route> */}

               {/* <Route exact path="/products"> <Products /></Route>
               <Route exact path="/products/:browseBy"><Products /></Route> 
               <Route path="/products/:browseBy/:browseByGroup"><Products /></Route>  */}

               {/* <Route path="/deliveryDispatch"> <DeliveryDispatch /></Route>
               <Route path="/contactUs"> <ContactUs /></Route>
               <Route path="/aboutUs"><AboutUS /></Route>  
               <Route path="/termsConditions"><TermsConditions /></Route>
               <Route path="/blog"><Blog /></Route> */}

               {/* <Route path="/login"><Login /></Route> */}
               {/* <Route path="/emailRequest"><EmailRequest /></Route>
               <Route path="/resetPasswordConfirmation"><ResetPasswordConfirmation /></Route>
               <Route path="/reenterPassword"><ReenterPassword /></Route>
              
               <Route exact path="/order"><Order /></Route>
               <Route path="/order/:po_number"><Order /></Route>


               <Route path="/myAccount"><MyAccount/></Route>
               <Route path="/currentOrders"><CurrentOrders /></Route>
               <Route path="/processedOrders"><ProcessedOrders /></Route>
               
               <Route path="/editCompanyInformation"><EditCompanyInfo /></Route>                 
               <Route path="/manageProducts"><ManageProducts /></Route>

               <Route exact path="/editAddProducts"><AddEditProduct /></Route>
               <Route path="/editAddProducts/:p_code"><AddEditProduct /></Route>

               <Route path="/CheckoutShipping"><CheckoutShipping /></Route>
               <Route path="/CheckoutSecurePayment"><CheckoutSecurePayment /></Route>
               <Route path="/CheckoutReviewOrder"><CheckoutReviewOrder /></Route>
               <Route path="/CheckoutOrderComplete"><CheckoutOrderComplete /></Route> */}

               <div>
                  <AppRoute path="/admin" component={HomepageAdmin} />
                  <Route path="/login" component={Login} />
               </div>
            </Switch>
         </div>
         <div className="Website-Footer">
            <Footer />
         </div>
      </Router>
   </div>
);

export default App;
