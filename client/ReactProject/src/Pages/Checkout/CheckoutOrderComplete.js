import React, { useContext } from 'react';
import '../../_assets/CSS/pages/Checkout/CheckoutOrderComplete.css';
import { Typography, Button, Row, Col, Steps } from 'antd';
import img1 from "../../_assets/Images/Temp_Images/product_image_1.jpg"
import img2 from "../../_assets/Images/visa.png"
import CheckoutProducts from './CheckoutProducts';
import { CartContext } from '../../contexts/CartContext';
import { formatNumber } from '../../_helpers/utils';



const { Title } = Typography;
const { Step } = Steps;


const CheckoutOrderComplete = () =>{
      const { total } = useContext(CartContext);
      const userInfo = JSON.parse(localStorage.getItem("user"));
      console.log(userInfo.firstname);
      return(
        <body>

        <div id="checkout-order-complete-head">
        <Title level={3}>CHECK OUT</Title>
        </div>

        <div id="checkout-order-complete-content">

        <div>
        <Steps current={3}>
            <Step title="Shipping Address"/>
            <Step title="Review Order"/>
            <Step title="Secure Payment"/>
            <Step title="Order Complete"/>
          </Steps>,
        </div>

        <div id="checkout-order-complete-confirmation">
        <Row justify="space-around" align="middle"><Title level={4}>Order Confirmation</Title></Row>
        <Row justify="space-around" align="middle">Your order has been received.</Row>
        <Row justify="space-around" align="middle">Thank you for choosing us.</Row>
        </div>

        <div id="checkout-order-complete-summary">
        <Row>
        <Col span={12}><Title level={4}>Order Summary</Title></Col>
        </Row>
        <Row>
          <Col span={6}><div style={{fontWeight:"bold"}}>Product</div></Col>
          <Col span={6}><div style={{textAlign: "center",fontWeight:"bold"}}>Price</div></Col>
          <Col span={6}><div style={{textAlign: "center",fontWeight:"bold"}}>Quantity</div></Col>
          <Col span={6}><div style={{textAlign: "right",paddingRight: "10px",fontWeight:"bold"}}>Total</div></Col>
        </Row>
        <CheckoutProducts/>
        </div>

        <div id="checkout-order-complete-total">
        <Row>
        <Col span={12}><Title level={4}>Order Total</Title></Col>
        </Row>
        <Row>
        <Col span={6}><div style={{textAlign: "left"}}>Subtotal:</div></Col>
        <Col offset={11} span={7}><div style={{textAlign: "right"}}>{formatNumber(total)}</div></Col>
        </Row>
        <Row>
        <Col span={7}><div style={{textAlign: "left"}}>Freight charge:</div></Col>
        <Col offset={11} span={6}><div style={{textAlign: "right"}}>{formatNumber(total*0.05)}</div></Col>
        </Row>
        <Row>
        <Col span={7}><div style={{textAlign: "left"}}>GST:</div></Col>
        <Col offset={11} span={6}><div style={{textAlign: "right"}}>{formatNumber(total*0.01)}</div></Col>
        </Row>
        <Row>
        <Col span={7}><div style={{textAlign: "left",fontWeight:"bold"}}>Total:</div></Col>
        <Col offset={11} span={6}><div style={{textAlign: "right"}}>{formatNumber(total*1.06)}</div></Col>
        </Row>
        </div>

        <div id="checkout-order-complete-payment">
        <Row>
        <Col span={12}><Title level={4}>Payment Details</Title></Col>
        </Row>
        <Row>
        Payment type: Visa card <img src={img2} alt="visa" width="5%" height="5%"/>
        </Row>
        </div>

        <div id="checkout-order-complete-shipping">
        <Row>
        <Col span={12}><Title level={4}>Shipping Address</Title></Col>
        </Row>
        <Row>
        <Col span={24}>Delivery Address:{userInfo.address}, {userInfo.suburb}, {userInfo.stateprovince}, Australia</Col>
        </Row>
        </div>

        </div>
        </body>
      );
}

export default CheckoutOrderComplete
