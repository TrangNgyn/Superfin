import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdmin.css';
import HomepageAdminOrderList from './HomepageAdminOrderList';
import ProductListAdmin from './ProductListAdmin';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { getCompleteOrders } from '../../_actions/completeOrderActions';
import { getIncompleteOrders } from '../../_actions/incompleteOrderActions'; 
import { history } from '../../_helpers/history';
import { navigateAddOrder, navigateFullList } from './Functions';

import { Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect } from 'react';

import {Auth} from 'aws-amplify';
import {useAuthDispatch, useAuthState, logout} from '../../auth_lib/Context';

/*
    Tasks left
    Make Images work for products.
    Hook up Orders API
    sort orders by issue date in the order reducer
    impliment delete order functionality 
*/

/*
    If time
    Modal after successful delete
    Modal after unsuccessful delete
    Loading circle for delete process
    
*/

const HomepageAdmin = (props) => {
    // Auth state
    const authDispatch = useAuthDispatch(); // read dispatch method from context
    const [currentUser, setCurrentUser] = useState(false);
    //read user details from context
    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {setCurrentUser(user)});
    }, [])

    const handleLogout = async () => {
        await logout(authDispatch) //call the logout action
        props.history.push('/login') //navigate to logout page on logout
    }

    const [radioState, setRadioState] = useState(false);            //false is 'Current Orders'

    const dispatch = useDispatch();

    const productsList = useSelector(state => state.productState.products);
    const errorLoading = useSelector(state => state.productState.error);
    const loading = useSelector(state => state.productState.isLoading);

    const completeOrders = useSelector(state => state.completeOrdersState.completeOrders);
    const errorLoadingCompleteOrders = useSelector(state => state.completeOrdersState.error);
    const loadingCompleteOrders = useSelector(state => state.completeOrdersState.loading);

    const incompleteOrders = useSelector(state => state.incompleteOrdersState.incompleteOrders);
    const errorLoadingIncompleteOrders = useSelector(state => state.incompleteOrdersState.error);
    const loadingIncompleteOrders = useSelector(state => state.incompleteOrdersState.loading);

    const productListProps = {
        dispatch: dispatch,
        productsList: productsList,
        errorLoading: errorLoading,
        loading:loading
    }

    let orders = [];
    let errorLoadingOrders = false;
    let loadingOrders = false;

    if(radioState){
        orders = completeOrders
        errorLoadingOrders = errorLoadingCompleteOrders;
        loadingOrders = loadingCompleteOrders;
    }
    else{
        orders = incompleteOrders;
        errorLoadingOrders = errorLoadingIncompleteOrders;
        loadingOrders = loadingIncompleteOrders;
    }

    const ordersListProps = {
        orders: orders,
        errorLoadingOrders: errorLoadingOrders,
        loadingOrders: loadingOrders
    }





    useEffect(() => {                                                              //checks if the store is empty. If so, do an API request. If data is already there, set it to default ordering
        if(!productsList.length) dispatch(getAllProducts());      
        else dispatch(setDefaultOrder());

        if(!completeOrders.length && radioState) dispatch(getCompleteOrders());

        if(!incompleteOrders.length && !radioState) dispatch(getIncompleteOrders());

    }, [productsList.length, completeOrders.length, incompleteOrders.length, radioState, dispatch]);
    
    const radioToggle = () => {
        radioState ? setRadioState(false) : setRadioState(true);
    }
   




    return(
        <>
            <div id="homepage-admin-header">Admin Station</div>
            
            {/* Testing Log-in */}
            {/* Make sure user details is loaded before displaying */}
            { currentUser &&
                <div>Welcome {currentUser.attributes.email}</div>
            }

            <button onClick={handleLogout}>Logout</button>

            <div style  = {{height:"20px"}}></div>

            <div style = {{textAlign: "center"}}>
                <div className="Homepage-Admin-Products-Orders-Plus" onClick = {() => {history.push('/editAddProducts')}}>Product +</div>
            </div>

            <div id="homepage-admin-number-of-products-container">
                <div id="homepage-admin-number-of-products">Total Products: {productsList.length}</div>
            </div>

            <div className="Homepage-Admin-Scrollbox-Container">
                <div className="Homepage-Admin-Scrollbox">
                    <ProductListAdmin {...productListProps}/>
                </div>
            </div>

            <div style  = {{height:"50px"}}></div>
        
            <Button id="homepage-admin-button-1" type="primary" onClick={() => {
                history.push('manageProducts');
            }}>View Full List</Button>

            <div style  = {{height:"50px"}}></div>





            <div style = {{textAlign: "center"}}>
                <div className="Homepage-Admin-Products-Orders-Plus" onClick = {navigateAddOrder}>Orders +</div>
            </div>

            <div style  = {{height:"20px"}}></div>

            <div id="homepage-admin-radiobuttons-container">
                <div id="homepage-admin-radiobutton-1">
                    <Radio className="Homepage-Admin-Radiobuttons" checked = {!radioState}  onChange={radioToggle}> Current Orders </Radio>
                </div>
                <div id = "homepage-admin-radiobutton-2">
                    <Radio className="Homepage-Admin-Radiobuttons" checked = {radioState} onChange = {radioToggle}> Previous Orders </Radio>
                </div>
            </div>

            <div style  = {{height:"20px"}}></div>
           
            <div>
                <div className="Homepage-Admin-Scrollbox-Container">
                    <div className="Homepage-Admin-Scrollbox" style = {{height:"500px"}}>
                        {<HomepageAdminOrderList {...ordersListProps}/>} 
                    </div>
                </div>
            </div>

            <div style  = {{height:"50px"}}></div>

            <Button id="homepage-admin-button-1" type="primary" onClick={() => {navigateFullList(radioState)}}>View Full List</Button>

            <div style = {{height: "50px"}}></div> 
        </>
    );
}

export default HomepageAdmin;