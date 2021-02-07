import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdmin.css';
import ProductListAdmin from './ProductListAdmin';
import {getNumberOfproducts} from '../../SharedComponents/ProductList/MockProductList';
import { Button, Radio } from 'antd';
import {useState} from 'react';
import HomepageAdminOrderList from './HomepageAdminOrderList';


export const HomepageAdmin = () => {
    const numberOfProducts = getNumberOfproducts();
    const [radioState, setRadioState] = useState(false);            //false is 'Current Orders'
   
    const radioToggle = () => {
        radioState ? setRadioState(false) : setRadioState(true);
    }
   
    return(
        <>
            <div id="homepage-admin-header">Admin Station</div>

            <div style  = {{height:"20px"}}></div>

            <div style = {{textAlign: "center"}}>
                <div className="Homepage-Admin-Products-Orders-Plus" onClick = { () => console.log("Navigate to: add products page")}>Product +</div>
            </div>

            <div id="homepage-admin-number-of-products-container">
                <div id="homepage-admin-number-of-products">Total Products: {numberOfProducts}</div>
            </div>

            <div className="Homepage-Admin-Scrollbox-Container">
                <div className="Homepage-Admin-Scrollbox">
                    <ProductListAdmin />
                </div>
            </div>

            <div style  = {{height:"50px"}}></div>
        
            <Button id="homepage-admin-button-1" type="primary">View Full List</Button>

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