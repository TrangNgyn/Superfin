import React, { useContext } from 'react';
import { connect } from 'react-redux';
import '../../_assets/CSS/pages/Checkout/CheckoutReviewOrder.css';
import { Typography, Button, Row, Col, Steps } from 'antd';
import {EditFilled} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import img from "../../_assets/Images/Temp_Images/product_image_1.jpg"
import CartProducts from '../Cart/CartProducts';
import { formatNumber } from '../../_helpers/utils';



const { Title } = Typography;
const { Step } = Steps;


const CheckoutReviewOrder = (props) =>{
  const total = props.total;
  const itemCount = props.cartItems.length;

  return(
    <div>

      <div id="checkout-review-order-head">
        <Title level={3}>CHECK OUT</Title>
      </div>

      <div id="checkout-review-order-content">

        <div>
          <Steps current={1}>
              <Step title="Shipping Address"/>
              <Step title="Review Order"/>
              <Step title="Secure Payment"/>
              <Step title="Order Complete"/>
            </Steps>,
        </div>

        <div id="checkout-review-order-summary">
          <Row>
            <Col span={12}><Title level={4}>Order Summary ({itemCount} items)</Title></Col>
          </Row>
          <Row>
            <Col span={6}>
              <div style={{fontWeight:"bold"}}>Product</div>
            </Col>
            <Col span={6}>
              <div style={{textAlign: "center", fontWeight:"bold"}}>Price</div>
            </Col>
            <Col span={6}>
              <div style={{textAlign: "center", fontWeight:"bold"}}>Quantity</div>
              </Col>
            <Col span={6}>
              <div 
                style={{
                  textAlign: "right", 
                  paddingRight: "10px", 
                  fontWeight:"bold"
                }}>
                  Special Requirements
              </div>
            </Col>
          </Row>
          <CartProducts editable={false} />
        </div>

        <div id="checkout-review-order-total">
          <Row>
            <Col offset={11} span={6}>
              <div style={{textAlign: "left"}}>Subtotal:</div>
            </Col>
            <Col span={7}>
              <div style={{textAlign: "right"}}>{formatNumber(total)}</div>
            </Col>
          </Row>
          <Row>
            <Col offset={11} span={7}>
              <div style={{textAlign: "left"}}>Freight charge:</div>
            </Col>
            <Col span={6}>
              <div style={{textAlign: "right"}}>{formatNumber(total*0.05)}</div>
            </Col>
          </Row>
          <Row>
            <Col offset={11} span={7}>
              <div style={{textAlign: "left"}}>GST:</div>
            </Col>
            <Col span={6}>
              <div style={{textAlign: "right"}}>{formatNumber(total*0.01)}</div>
            </Col>
          </Row>
          <Row>
            <Col offset={11} span={7}>
              <div style={{textAlign: "left",fontWeight:"bold"}}>Total:</div>
            </Col>
            <Col span={6}>
              <div style={{textAlign: "right",fontWeight:"bold"}}>{formatNumber(total*1.06)}</div>
            </Col>
          </Row>
        </div>

        <div id="checkout-review-order-button">
          <Row>
            <Col  offset={8} span={6}>
              <Button type="primary">
                <Link to="/checkoutShipping">Back</Link>
              </Button>
            </Col>
            <Col  span={6}>
              <Button type="primary">
                <Link to="/checkoutSecurePayment">Go to payment</Link>
              </Button>
            </Col>
          </Row>
        </div>

      </div>
    </div>
  );

}

const mapStateToProps = (state)=>{
  return{
      cartItems: state.cartState.addedItems,
      total: state.cartState.total,
  }
}

export default connect(mapStateToProps)(CheckoutReviewOrder);
