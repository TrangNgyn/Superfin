import './App.less';
import '../_assets/CSS/style.scss'
//import Homepage from '../Pages/Homepage/Homepage';
import AddEditProduct from '../Pages/AddEditProduct/AddEditProduct';
import Navbar from '../SharedComponents/Navbar/Navbar';
import FooterMain from '../SharedComponents/Footer/FooterMain';
import { history } from '../_helpers/history';
import { Router, Route, Switch, useParams } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Homepage from '../Pages/Homepage/Homepage';
import ContactUs from '../Pages/ContactUs/ContactUs';
import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
import AboutUS from '../Pages/AboutUs/AboutUs';
import EmailRequest from '../Pages/EmailRequest/EmailRequest';
import ResetPasswordConfirmation from '../Pages/ResetPasswordConfirmation/ResetPasswordConfirmation';
import CurrentOrders from '../Pages/CurrentOrders/CurrentOrders';
import ProcessedOrders from '../Pages/ProcessedOrders/ProcessedOrders';
import EditCompanyInfo from '../Pages/EditCompanyInfo/EditCompanyInfo';
import ManageProducts from '../Pages/ManageProducts/ManageProducts';

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
   <Router history = {history}>
      <div className="Website-Header">
         <Navbar />
      </div>

      <div className="Website-Body" >
         <Switch>
        
            <Route exact path="/"><Homepage /></Route>
            <Route exact path="/products"> <Products /></Route>
            <Route exact path="/products/:browseBy"><Products /></Route> 
            <Route path="/products/:browseBy/:browseByGroup"><Products /></Route> 

            <Route path="/deliveryDispatch"> <DeliveryDispatch /></Route>
            <Route path="/contactUs"> <ContactUs /></Route>
            <Route path="/aboutUs"><AboutUS /></Route>  
            <Route path="/login"><Login /></Route>
            <Route path="/emailRequest"><EmailRequest /></Route>
            <Route path="/resetPasswordConfirmation"><ResetPasswordConfirmation /></Route>

            <Route path="/currentOrders"><CurrentOrders /></Route>
            <Route path="/processedOrders"><ProcessedOrders /></Route>
            
            <Route path="/editCompanyInformation"><EditCompanyInfo /></Route>                 
            <Route path="/manageProducts"><ManageProducts /></Route>

            <Route exact path="/editAddProducts"><AddEditProduct /></Route>
            <Route path="/editAddProducts/:_id"><AddEditProduct /></Route>
         </Switch>
      </div>

      <div className="Website-Footer box-shadow">
         <FooterMain />
      </div>  
   </Router>
);

export default App;
