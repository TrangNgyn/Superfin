import HomepageAdminOrderList from './HomepageAdminOrderList';
import ProductListAdmin from './ProductListAdmin';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { getCompleteOrders } from '../../_actions/completeOrderActions';
import { getIncompleteOrders } from '../../_actions/incompleteOrderActions'; 
import { history } from '../../_helpers/history';
import { navigateAddOrder, navigateFullList } from './Functions';
import { useAuthUpdate, useAuth } from '../../SharedComponents/AuthContext/AuthContext';
import { Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect } from 'react';

const HomepageAdmin = () => {
    const dispatch = useDispatch();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    const [radioState, setRadioState] = useState(false);            //false is 'Current Orders'

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
        loading:loading,
        updateAuth: updateAuth,
        access_token: auth.access_token
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
        dispatch: dispatch,
        orders: orders,
        errorLoadingOrders: errorLoadingOrders,
        loadingOrders: loadingOrders,
        updateAuth: updateAuth,
        access_token: auth.access_token
    }




    useEffect(() => {                                                           //checks if the store is empty. If so, do an API request. If data is already there, set it to default ordering
        if(!productsList.length) dispatch(getAllProducts());      
        else dispatch(setDefaultOrder());

        if(!completeOrders.length && radioState) dispatch(getCompleteOrders(auth.access_token, updateAuth));

        if(!incompleteOrders.length && !radioState) dispatch(getIncompleteOrders(auth.access_token, updateAuth));

    }, [productsList.length, completeOrders.length, incompleteOrders.length, radioState, dispatch, auth.access_token, updateAuth]);
    
    const radioToggle = () => {
        radioState ? setRadioState(false) : setRadioState(true);
    }

    return(
        <>
            <div className="page-title-holder fill">
                <h2>Admin Panel</h2>
            </div>
            <div className="container">
                <div className="page-title-holder with-divider">
                    <h3>Products List</h3>
                </div>
                <div className="div-box">
                    <span>Total Products: {productsList.length}</span>&ensp;
                    <Button type="dashed" onClick = {() => {history.push('/editAddProducts')}}>Add Product</Button>&ensp;
                    <Button type="primary" onClick={() => { history.push('manageProducts');}}>View Full List</Button>
                </div>
                <ProductListAdmin {...productListProps}/>
            </div>
            <div className="container">
                <div className="page-title-holder with-divider">
                    <h3>Orders List</h3>
                </div>
                <div className="div-box">
                    <Radio checked = {!radioState}  onChange={radioToggle}> Show Current Orders </Radio>&emsp;
                    <Radio checked = {radioState} onChange = {radioToggle}> Show Previous Orders </Radio>&emsp;
                    <Button type="dashed" onClick = {navigateAddOrder}>Add Order</Button>&emsp;
                    <Button type="primary" onClick={() => {navigateFullList(radioState)}}>View Full List</Button>
                </div>
                <HomepageAdminOrderList {...ordersListProps}/>
            </div>
        </>
    );
}

export default HomepageAdmin;