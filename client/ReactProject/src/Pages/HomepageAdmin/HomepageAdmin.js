import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdmin.css';
import HomepageAdminOrderList from './HomepageAdminOrderList';
import ProductListAdmin from './ProductListAdmin';
import { getAllProducts, setDefaultOrder } from '../../_actions/productActions';
import { history } from '../../_helpers/history';

import { Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState , useEffect } from 'react';





/*
    Tasks left
    Make Images work for products.
    Hook up Orders API
*/

/*
    If time
    Modal after successful delete
    Modal after unsuccessful delete
    Loading circle for delete process
*/





const HomepageAdmin = () => {
    const [radioState, setRadioState] = useState(false);            //false is 'Current Orders'

    const productsList = useSelector(state => state.productState.products);
    const errorLoading = useSelector(state => state.productState.error);
    const loading = useSelector(state => state.productState.isLoading);
    const dispatch = useDispatch();

    const productListProps = {
        dispatch: dispatch,
        productsList: productsList,
        errorLoading: errorLoading,
        loading:loading
    }





    useEffect(() => {                                                              //checks if the store is empty. If so, do an API request. If data is already there, set it to default ordering
        if(!productsList.length) dispatch(getAllProducts());      
        else dispatch(setDefaultOrder());
    }, [productsList.length, dispatch]);
    
    const radioToggle = () => {
        radioState ? setRadioState(false) : setRadioState(true);
    }
   





    return(
        <>
            <div id="homepage-admin-header">Admin Station</div>

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
                <div className="Homepage-Admin-Products-Orders-Plus" onClick = { () => console.log("Navigate to add products page")}>Orders +</div>
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
                        <HomepageAdminOrderList complete = {radioState}/>
                    </div>
                </div>
            </div>
            <div style  = {{height:"50px"}}></div>
            <Button id="homepage-admin-button-1" type="primary">View Full List</Button>
            <div style = {{height: "50px"}}></div> 
        </>
    );
}

export default HomepageAdmin;