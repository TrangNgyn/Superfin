import './App.less';
import '../_assets/CSS/style.scss'
import Navbar from '../SharedComponents/Navbar/Navbar';
import { history } from '../_helpers/history';
import {
   Router,
   Route,
   Switch,
} from 'react-router-dom';

//import AppRoute from '../_routers/AppRoute';
import EditCustomer from '../Pages/EditCustomer/EditCustomer';
import AddEditProduct from '../Pages/AddEditProduct/AddEditProduct';
import Login from '../Pages/Login/Login';
import HomepageAdmin from '../Pages/HomepageAdmin/HomepageAdmin';
import Homepage from '../Pages/Homepage/Homepage';
import ContactUs from '../Pages/ContactUs/ContactUs';
import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
import Blog from '../Pages/Blog/Blog';
import AboutUS from '../Pages/AboutUs/AboutUs';
import EmailRequest from '../Pages/EmailRequest/EmailRequest';
import ResetPasswordConfirmation from '../Pages/ResetPasswordConfirmation/ResetPasswordConfirmation';
import Order from '../Pages/Order/Order';
import ReenterPassword from '../Pages/ReenterPassword/ReenterPassword'
import CurrentOrders from '../Pages/CurrentOrders/CurrentOrders';
import ProcessedOrders from '../Pages/ProcessedOrders/ProcessedOrders';
import Products from '../Pages/Products/Products';
import ProductDetails from '../Pages/Products/ProductDetails';
import EditCompanyInfo from '../Pages/EditCompanyInfo/EditCompanyInfo';
import ManageProducts from '../Pages/ManageProducts/ManageProducts';
import MyAccount from '../Pages/MyAccount/MyAccount';
import Signup from '../Pages/Signup/Signup';
import ConfirmSignup from '../Pages/Signup/ConfirmSignup';
import TermsConditions from '../Pages/TermsConditions/TermsConditions';
import CheckoutShipping from '../Pages/Checkout/CheckoutShipping';
import CheckoutSecurePayment from '../Pages/Checkout/CheckoutSecurePayment';
import CheckoutReviewOrder from '../Pages/Checkout/CheckoutReviewOrder';
import CheckoutOrderComplete from '../Pages/Checkout/CheckoutOrderComplete';
import ViewProductInfo from '../Pages/ViewProductInfo/ViewProductInfo';
import Promocode from '../Pages/Promocode/Promocode';
import Footer from '../SharedComponents/Footer/FooterMain';
import ManageOrdersCustomer from '../Pages/ManageOrdersCustomer/ManageOrdersCustomer';
import Store from '../Pages/Homepage/products';
import Cart from '../Pages/Cart/index';
import ManageCategories from '../Pages/ManageCategories/ManageCategories';
import Cancel from '../Pages/cancel';



// import Amplify, {Auth} from 'aws-amplify';
// import awsconfig from '../aws-exports';
// Amplify.configure(awsconfig);
// Auth.configure(awsconfig);



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
   <>
      <Router history = {history}>
         <div className="Website-Header">
            <Navbar />
         </div>
         <div className="Website-Body" >
            <Switch>

               <Route exact path="/"><Homepage /></Route>
               <Route exact path="/admin"><HomepageAdmin /></Route>
               <Route path="/editCustomer"><EditCustomer /></Route>

               {/* <Route exact path="/products"> <Products /></Route>
               <Route exact path="/products/:browseBy"><Products /></Route>
               <Route path="/products/:browseBy/:browseByGroup"><Products /></Route>  */}
               <Route exact path="/products"> <Products /></Route>
               <Route exact path="/productDetails"> <ProductDetails /></Route>

               <Route path="/deliveryDispatch"> <DeliveryDispatch /></Route>
               <Route path="/contactUs"> <ContactUs /></Route>
               <Route path="/aboutUs"><AboutUS /></Route>
               <Route path="/termsConditions"><TermsConditions /></Route>
               <Route path="/blog"><Blog /></Route>

               {/* <Route path="/login"><Login /></Route> */}
               <Route path="/emailRequest"><EmailRequest /></Route>
               <Route path="/resetPasswordConfirmation"><ResetPasswordConfirmation /></Route>
               <Route path="/reenterPassword"><ReenterPassword /></Route>

               <Route exact path="/order"><Order /></Route>
               <Route exact path="/order/:po_number"><Order /></Route>
               <Route path="/order/:po_number/:status"><Order /></Route>


               <Route path="/myAccount"><MyAccount/></Route>
               {/* <Route path="/signup"><Signup/></Route>
               <Route path="/ConfirmSignup"><ConfirmSignup/></Route> */}
               
               <Route path="/currentOrders"><CurrentOrders /></Route>
               <Route path="/processedOrders"><ProcessedOrders /></Route>

               <Route path="/editCompanyInformation"><EditCompanyInfo /></Route>
               <Route path="/manageProducts"><ManageProducts /></Route>
               <Route path="/manageCategories"><ManageCategories /></Route>

               <Route path="/Cancel"><Cancel /></Route>

                <Route exact path="/editAddProducts"><AddEditProduct /></Route>
               <Route path="/editAddProducts/:p_code"><AddEditProduct /></Route>
               <Route exact path="/products" component={Store}/>
               <Route path="/cart"><Cart /></Route>
               <Route path="/CheckoutShipping"><CheckoutShipping /></Route>
               <Route path="/CheckoutSecurePayment"><CheckoutSecurePayment /></Route>
               <Route path="/CheckoutReviewOrder"><CheckoutReviewOrder /></Route>
               <Route path="/CheckoutOrderComplete"><CheckoutOrderComplete /></Route>
               <Route path="/ViewProductInfo"><ViewProductInfo /></Route>
               <Route path="/Promocode"><Promocode /></Route>
               <Route path="/manageOrders"> <ManageOrdersCustomer /> </Route>
               {/* <div>
                   <AppRoute path="/admin" component={HomepageAdmin} />
                  <Route path="/login" component={Login} />
                </div> */}

            </Switch>
         </div>
         <footer className="Website-Footer">
            <Footer />
         </footer>
      </Router>
   </>
);

export default App;
