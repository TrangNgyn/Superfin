import '../../_assets/CSS/pages/CheckoutOrderComplete.css';
import { Typography, Button, Row, Col, Steps } from 'antd';
import img1 from "../../_assets/Images/Temp_Images/product_image_1.jpg"
import img2 from "../../_assets/Images/visa.png"



const { Title } = Typography;
const { Step } = Steps;


const CheckoutOrderComplete = () =>{
      return(
        <body>

        <div id="checkout-order-complete-head">
        <Title level={3}>CHECK OUT</Title>
        </div>

        <div id="checkout-order-complete-content">

        <div>
        <Steps current={3}>
            <Step title="Shipping Address"/>
            <Step title="Secure Payment"/>
            <Step title="Review Order"/>
            <Step title="Order Complete"/>
          </Steps>,
        </div>

        <div id="checkout-order-complete-confirmation">
        <Row justify="space-around" align="middle"><Title level={4}>Order Confirmation</Title></Row>
        <Row justify="space-around" align="middle">Hi A, your order has been received.</Row>
        <Row justify="space-around" align="middle">Order No : 456645</Row>
        <Row justify="space-around" align="middle">Order date: 9/10/2020</Row>
        <Row justify="space-around" align="middle">Click here to manage your order</Row>
        <Row justify="space-around" align="middle"><Button type="text">Manage your order here</Button></Row>
        </div>

        <div id="checkout-order-complete-summary">
        <Row>
        <Col span={12}><Title level={4}>Order Summary</Title></Col>
        </Row>
        <Row>
        <Col span={9}><div style={{fontWeight:"bold"}}>Item</div></Col>
        <Col span={5}><div style={{textAlign: "center",fontWeight:"bold"}}>Price</div></Col>
        <Col span={5}><div style={{textAlign: "center",fontWeight:"bold"}}>Quantity</div></Col>
        <Col span={5}><div style={{textAlign: "right",paddingRight: "10px",fontWeight:"bold"}}>Total</div></Col>
        </Row>
        <Row justify="space-around" align="middle">
        <Col span={4}><img src={img1} alt="product" width="100%" height="100%"/></Col>
        <Col span={5}>Brown Bag with Handles</Col>
        <Col span={5}><div style={{textAlign: "center"}}>100.00</div></Col>
        <Col span={5}><div style={{textAlign: "center"}}>1</div></Col>
        <Col span={5}><div style={{textAlign: "right",paddingRight: "10px"}}>100.00</div></Col>
        </Row>
        </div>

        <div id="checkout-order-complete-total">
        <Row>
        <Col span={12}><Title level={4}>Order Total</Title></Col>
        </Row>
        <Row>
        <Col span={6}><div style={{textAlign: "left"}}>Subtotal:</div></Col>
        <Col offset={11} span={7}><div style={{textAlign: "right"}}>$200.00</div></Col>
        </Row>
        <Row>
        <Col span={7}><div style={{textAlign: "left"}}>Freight charge:</div></Col>
        <Col offset={11} span={6}><div style={{textAlign: "right"}}>$20.00</div></Col>
        </Row>
        <Row>
        <Col span={7}><div style={{textAlign: "left"}}>GST:</div></Col>
        <Col offset={11} span={6}><div style={{textAlign: "right"}}>$22.00</div></Col>
        </Row>
        <Row>
        <Col span={7}><div style={{textAlign: "left",fontWeight:"bold"}}>Total:</div></Col>
        <Col offset={11} span={6}><div style={{textAlign: "right"}}>$242.00</div></Col>
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
        <Col span={24}>Delivery Address: Address: 23 Denison Rd, New South Wales 2500 Australia</Col>
        </Row>
        </div>
        </div>
        </body>
      );

}

export default CheckoutOrderComplete
