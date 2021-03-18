import '../../_assets/CSS/pages/Checkout/CheckoutReviewOrder.css';
import { Typography, Button, Row, Col, Steps } from 'antd';
import {EditFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import img from "../../_assets/Images/Temp_Images/product_image_1.jpg"



const { Title } = Typography;
const { Step } = Steps;


const CheckoutReviewOrder = () =>{
      return(
        <body>

        <div id="checkout-review-order-head">
        <Title level={3}>CHECK OUT</Title>
        </div>

        <div id="checkout-review-order-content">

        <div>
        <Steps current={2}>
            <Step title="Shipping Address"/>
            <Step title="Secure Payment"/>
            <Step title="Review Order"/>
            <Step title="Order Complete"/>
          </Steps>,
        </div>

        <div id="checkout-review-order-info">
        <Row>
        <Col span={12}><Title level={4}>Shipping Address</Title></Col>
        <Col offset={10}><Button type="text"><Link to="/CheckoutShipping"><EditFilled /></Link></Button></Col>
        </Row>
        <Row><b>Name:</b>  A</Row>
        <Row><b>Address:</b>  23 Denison Rd, New South Wales 2500 Australia</Row>
        <Row><b>Secure payment:</b>  Card ending 1234</Row>
        </div>

        <div id="checkout-review-order-summary">
        <Row>
        <Col span={12}><Title level={4}>Order Summary</Title></Col>
        <Col offset={10}><Button type="text"><EditFilled /></Button></Col>
        </Row>
        <Row>
        <Col span={9}><div style={{fontWeight:"bold"}}>Item</div></Col>
        <Col span={5}><div style={{textAlign: "center",fontWeight:"bold"}}>Price</div></Col>
        <Col span={5}><div style={{textAlign: "center",fontWeight:"bold"}}>Quantity</div></Col>
        <Col span={5}><div style={{textAlign: "right",paddingRight: "10px",fontWeight:"bold"}}>Total</div></Col>
        </Row>
        <Row justify="space-around" align="middle">
        <Col span={4}><img src={img} alt="product" width="100%" height="100%"/></Col>
        <Col span={5}>Brown Bag with Handles</Col>
        <Col span={5}><div style={{textAlign: "center"}}>100.00</div></Col>
        <Col span={5}><div style={{textAlign: "center"}}>2</div></Col>
        <Col span={5}><div style={{textAlign: "right",paddingRight: "10px"}}>100.00</div></Col>
        </Row>
        </div>

        <div id="checkout-review-order-total">
        <Row>
        <Col offset={11} span={6}><div style={{textAlign: "left"}}>Subtotal:</div></Col>
        <Col span={7}><div style={{textAlign: "right"}}>$200.00</div></Col>
        </Row>
        <Row>
        <Col offset={11} span={7}><div style={{textAlign: "left"}}>Freight charge:</div></Col>
        <Col span={6}><div style={{textAlign: "right"}}>$20.00</div></Col>
        </Row>
        <Row>
        <Col offset={11} span={7}><div style={{textAlign: "left"}}>GST:</div></Col>
        <Col span={6}><div style={{textAlign: "right"}}>$22.00</div></Col>
        </Row>
        <Row>
        <Col offset={11} span={7}><div style={{textAlign: "left",fontWeight:"bold"}}>Total:</div></Col>
        <Col span={6}><div style={{textAlign: "right",fontWeight:"bold"}}>$242.00</div></Col>
        </Row>
        </div>

        <div id="checkout-review-order-button">
        <Row>
        <Col  offset={8} span={6}>
        <Button type="primary"><Link to="/CheckoutSecurePayment">Back</Link></Button>
        </Col>
        <Col  span={6}>
        <Button type="primary"><Link to="/CheckoutOrderComplete">Place Order</Link></Button>
        </Col>
        </Row>

        </div>

        </div>
        </body>
      );

}

export default CheckoutReviewOrder
