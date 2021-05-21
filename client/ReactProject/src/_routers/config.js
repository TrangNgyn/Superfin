import { userConstants } from '../_constants/user.constants';

import Login from '../Pages/Login/Login';
import Homepage from '../Pages/Homepage/Homepage';
import HomepageAdmin from '../Pages/HomepageAdmin/HomepageAdmin';
import EditCustomer from '../Pages/EditCustomer/EditCustomer';              //might need to change role? This should be for CUSTOMER role?
import Products from '../Pages/Products/Products';
import ProductDetails from '../Pages/Products/ProductDetails';
import DeliveryDispatch from '../Pages/DeliveryDispatch/DeliveryDispatch';
import ContactUs from '../Pages/ContactUs/ContactUs';
import TermsConditions from '../Pages/TermsConditions/TermsConditions';
import Blog from '../Pages/Blog/Blog';
import EmailRequest from '../Pages/EmailRequest/EmailRequest';
import ReenterPassword from '../Pages/ReenterPassword/ReenterPassword';
import MyAccount from '../Pages/MyAccount/MyAccount';
import Cart from '../Pages/Cart/CartPage';
import CheckoutShipping from '../Pages/Checkout/CheckoutShipping';
import CheckoutSecurePayment from '../Pages/Checkout/CheckoutSecurePayment';
import CheckoutReviewOrder from '../Pages/Checkout/CheckoutReviewOrder';
import CheckoutOrderComplete from '../Pages/Checkout/CheckoutOrderComplete';
import PaymentCancelled from '../Pages/Checkout/PaymentCancelled';
import ManageOrdersCustomer from '../Pages/ManageOrdersCustomer/ManageOrdersCustomer';
import Order from '../Pages/Order/Order';
import CurrentOrders from '../Pages/CurrentOrders/CurrentOrders';
import ProcessedOrders from '../Pages/ProcessedOrders/ProcessedOrders';
import EditCompanyInfo from '../Pages/EditCompanyInfo/EditCompanyInfo';
import ManageProducts from '../Pages/ManageProducts/ManageProducts';
import AddEditProduct from '../Pages/AddEditProduct/AddEditProduct';
import ManageCategories from '../Pages/ManageCategories/ManageCategories';

//if we dont have change password page for customer, will need to add Cutomer role to forgotpassword pages

const config =  {
    routes: [
        //CUSTOMER
        {
            component: EditCustomer,
            url: '/editCustomer',
            roles: [userConstants.ROLE_CUSTOMER],
            exact: false
        },
        {
            component: ManageOrdersCustomer,
            url: '/manageOrders',
            roles: [userConstants.ROLE_CUSTOMER],
            exact: false
        },
        {
            component: MyAccount,
            url: '/myAccount',
            roles: [userConstants.ROLE_CUSTOMER],
            exact: false
        },




        //GUEST
        {
            component: EmailRequest,
            url: '/emailRequest',
            roles: [userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: ReenterPassword,
            url: '/user/reset-password-email/token/:token/email/:email',
            roles: [userConstants.ROLE_GUEST],
            exact: false
        },




        //CUSTOMER AND GUEST
        {
            component: Homepage,
            url: '/',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: true
        },
        {
            component: Products,
            url: '/products',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: true
        },
        {
            component: Products,
            url: '/products/:category',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: ProductDetails,
            url: '/productDetails',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: DeliveryDispatch,
            url: '/deliveryDispatch',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: ContactUs,
            url: '/contactUs',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: TermsConditions,
            url: '/termsConditions',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: Blog,
            url: '/blog',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: Cart,
            url: '/cart',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: CheckoutShipping,
            url: '/checkoutShipping',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: CheckoutSecurePayment,
            url: '/checkoutSecurePayment',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: CheckoutReviewOrder,
            url: '/checkoutReviewOrder',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: CheckoutOrderComplete,
            url: '/checkoutOrderComplete',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: PaymentCancelled,
            url: '/paymentCancelled',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },
        {
            component: PaymentCancelled,
            url: '/paymentCancelled',
            roles: [userConstants.ROLE_CUSTOMER, userConstants.ROLE_GUEST],
            exact: false
        },




        //ADMIN
        {
            component: HomepageAdmin,
            url: '/admin',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: Order,
            url: '/order',
            roles: [userConstants.ROLE_ADMIN],
            exact: true
        },
        {
            component: Order,
            url: '/order/:po_number',
            roles: [userConstants.ROLE_ADMIN],
            exact: true
        },
        {
            component: Order,
            url: '/order/:po_number/:status',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: CurrentOrders,
            url: '/currentOrders',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: ProcessedOrders,
            url: '/processedOrders',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: EditCompanyInfo,
            url: '/editCompanyInformation',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: ManageProducts,
            url: '/manageProducts',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: AddEditProduct,
            url: '/editAddProducts',
            roles: [userConstants.ROLE_ADMIN],
            exact: true
        },
        {
            component: AddEditProduct,
            url: '/editAddProducts/:p_code',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },
        {
            component: ManageCategories,
            url: '/manageCategories',
            roles: [userConstants.ROLE_ADMIN],
            exact: false
        },




        //NO ROLE
        {
            component: Login,
            url: '/login',
            roles: null,
            exact: false
        },
        {
            component: Login,
            url: '*',
            roles: null,
            exact: false
        },
    ]
}

export default config;