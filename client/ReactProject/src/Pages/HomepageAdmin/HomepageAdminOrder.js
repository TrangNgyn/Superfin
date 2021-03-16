import React from "react";
import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdminOrder.css';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { navigateEditOrder } from './Functions';
import { deleteOrderConfirm } from '../../SharedComponents/Modals/Modals';
import { confirmSubmitTracking } from './Modals';




const HomepageAdminOrder = props => {
    const order = props.order;
    const dispatch = props.dispatch;

    const date = new Date(order.issued_date);
    const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  
    const onFinishOrder = values => {
        values.po_number = order.po_number;
        confirmSubmitTracking(values, dispatch);
    }

    const onFinishFailedOrder = err => {
        console.log(err);
    }
    
    let trackingNumberDiv = <div>
                                <Form
                                name="submit-tracking-form"
                                onFinish={onFinishOrder}
                                onFinishFailed={onFinishFailedOrder}
                                validateTrigger={onFinishOrder}
                                >
                                    <div className="Homepage-Admin-Order-Text"><b>Enter Tracking Number</b></div>

                                    <div className="Homepage-Admin-Order-Text" style = {{paddingTop:"15px"}}>
                                        <Form.Item
                                            name="tracking_number"
                                            rules={[
                                              {
                                                required: true,
                                                message: 'Please input the tracking number',
                                                whitespace: true,
                                              }
                                            ]}
                                        >
                                            <Input maxLength='40' placeholder="Enter tracking number here" style = {{width:"300px"}}/>
                                        </Form.Item> 
                                    </div>

                                    <div className="Homepage-Admin-Order-Text"><b>Enter Carrier</b></div>

                                    <div className="Homepage-Admin-Order-Text" style = {{paddingTop:"15px"}}>
                                        <Form.Item
                                             name="carrier"
                                             rules={[
                                               {
                                                 required: true,
                                                 message: 'Please input the carrier name',
                                                 whitespace: true
                                               }
                                             ]}
                                        >
                                            <Input maxLength='40' placeholder="Enter carrier name here" style = {{width:"300px"}}/>
                                        </Form.Item>   
                                    </div>
                                    
                                    <div className="Homepage-Admin-Order-Text"> 
                                        <Form.Item>
                                            <Button  type="primary" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>

    //if the order is complete it will contain the tracking number 
    if(order.status === orderStatusConstants.COMPLETE || order.status === orderStatusConstants.SHIPPED){
        trackingNumberDiv = <div>
                                <div>
                                    <div className="Homepage-Admin-Order-Text">Tracking Number: {order.tracking_number}</div>    
                                </div>
                                <div>
                                    <div className="Homepage-Admin-Order-Text">Carrier: {order.carrier}</div>    
                                </div>
                            </div>
        
        
    }




    
    return (
        <div id="homepage-admin-order-container">
            
            <div className="Homepage-Admin-Order-Text">Order Number: {order.po_number}</div>
            <div className="Homepage-Admin-Order-Text">Status: {order.status}</div>
            <div className="Homepage-Admin-Order-Text">CustomerID: {order.c_email}</div>
            <div className="Homepage-Admin-Order-Text">Date Issued: { dateString }</div>
                {trackingNumberDiv}
            <div id="homepage-admin-order-icon-container">
                <DeleteOutlined className="homepage-admin-order-icon" onClick={() => { deleteOrderConfirm(order.po_number, order.status, dispatch) }}/>
                <EditOutlined className="homepage-admin-order-icon" onClick={() => { navigateEditOrder(order.po_number)}}/>
            </div>  
        </div>
    );
};

export default HomepageAdminOrder;