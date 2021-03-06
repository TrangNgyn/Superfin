import React from "react";
import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdminOrder.css';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { navigateEditOrder } from './Functions';




const HomepageAdminOrder = props => {
    const order = props;

    let trackingNumberDiv = <div>
                                <div className="Homepage-Admin-Order-Text"><b>Enter Tracking Number</b></div>
                                <div className="Homepage-Admin-Order-Text" style = {{paddingTop:"15px"}}>
                                    <Input placeholder="Enter tracking number here" style = {{width:"300px"}}/>
                                </div>
                            </div>

    //if the order is complete it will contain the tracking number 
    if(order.status === orderStatusConstants.COMPLETE || order.status === orderStatusConstants.SENT){
        trackingNumberDiv = <div>
                                <div className="Homepage-Admin-Order-Text">Tracking Number: {order.tracking_number}</div>    
                            </div>
    }




    
    return (
        <div id="homepage-admin-order-container">
            
            <div className="Homepage-Admin-Order-Text">Order Number: {order.po_number}</div>
            <div className="Homepage-Admin-Order-Text">Status: {order.status}</div>
            <div className="Homepage-Admin-Order-Text">CustomerID: {order.c_email}</div>
            <div className="Homepage-Admin-Order-Text">Date Issued: { order.issued_date }</div>
                {trackingNumberDiv}
            <div id="homepage-admin-order-icon-container">
                <DeleteOutlined className="homepage-admin-order-icon"/>
                <EditOutlined className="homepage-admin-order-icon" onClick={() => { navigateEditOrder(order.po_number)}}/>
            </div>  
        </div>
    );
};

export default HomepageAdminOrder;