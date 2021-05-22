import React from "react";
import '../../_assets/CSS/pages/HomepageAdmin/HomepageAdminOrder.css';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Form, Card } from 'antd';
import { navigateEditOrder } from './Functions';
import { deleteOrderConfirm } from '../../SharedComponents/Modals/Modals';
import { confirmSubmitTracking } from './Modals';
import { useForm } from "antd/lib/form/Form";

const { Meta } = Card;

const HomepageAdminOrder = props => {
    const order = props.order;
    const dispatch = props.dispatch;
    const access_token = props.access_token;
    const updateAuth = props.updateAuth;

    const [form] = useForm();

    const date = new Date(order.issued_date);
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  
    const onFinishOrder = () => {
        form.validateFields()
        .then(values => {
            values.po_number = order.po_number;
            confirmSubmitTracking(values, dispatch, access_token, updateAuth);
        });  
    }

    const onFinishFailedOrder = err => {
        console.log(err);
    }

    let trackingNumberDiv =  <>
                                <Form
                                form={form}
                                name="submit-tracking-form"
                                onFinish={onFinishOrder}
                                onFinishFailed={onFinishFailedOrder}
                                >
                                    <div className="Homepage-Admin-Order-Text"><b>Enter Tracking Number</b></div>

                                    <div className="Homepage-Admin-Order-Text">
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
                                            <Input maxLength='40' placeholder="Enter tracking number here"/>
                                        </Form.Item> 
                                    </div>

                                    <div className="Homepage-Admin-Order-Text"><b>Enter Carrier</b></div>

                                    <div className="Homepage-Admin-Order-Text">
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
                                            <Input maxLength='40' placeholder="Enter carrier name here"/>
                                        </Form.Item>   
                                    </div>
                                    
                                    <div className="Homepage-Admin-Order-Text"> 
                                        <Form.Item>
                                            <Button  type="primary" htmlType="submit">Submit</Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </>


    //if the order is complete it will contain the tracking number 
    if(order.status === orderStatusConstants.COMPLETE || order.status === orderStatusConstants.SHIPPED){
        trackingNumberDiv = <>
                                <div>
                                    <div className="Homepage-Admin-Order-Text">Tracking Number: {order.tracking_number}</div>    
                                </div>
                                <div>
                                    <div className="Homepage-Admin-Order-Text">Carrier: {order.carrier}</div>    
                                </div>
                            </>
    }




    
    return (
        <Card className="card-shadow-hoverable"
            tabIndex={0}
            actions={[
                <DeleteOutlined onClick={() => { deleteOrderConfirm(order.po_number, order.status, access_token, updateAuth, dispatch) }} style={{color: 'red'}}/>,
                <EditOutlined onClick={() => { navigateEditOrder(order.po_number, order.status)}}/>
            ]}
            title={<b>Order Number: {order.po_number}</b>}>
            <Meta
                description={<>
                    <p><b>Status: </b>{order.status}</p>
                    <p><b>CustomerID: </b>{order.c_email}</p>
                    <p><b>Date Issued: </b>{ dateString }</p>
                    {trackingNumberDiv}
                </>}
            />
        </Card>
    );
};

export default HomepageAdminOrder;