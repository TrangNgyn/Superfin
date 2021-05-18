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
  const address = props.address;
  const email = props.email;

  return(
    <div>
      <br/>
      <div id="checkout-review-order-head">
        <Title level={3}>Checkout</Title>
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
            <Col span={12}><Title level={4}>Shipping Information</Title></Col>
          </Row>
          {
            address ?
              <>
                <Row>
                  <strong>The items are to be delivered to:</strong> &nbsp;
                  {address.po_attention_to}
                </Row>
                {
                  address.po_address_line2 ?
                    <Row>
                      <strong>Receiver's address:</strong> &nbsp;
                      {address.po_address_line2}/{address.po_address_line1}, &nbsp;
                      {address.po_suburb}, {address.po_state} {address.po_postcode}
                    </Row>
                  :
                    <Row>
                      <strong>Receiver's address: </strong> &nbsp;
                      {address.po_address_line1}, {address.po_suburb}, &nbsp;
                      {address.po_state} {address.po_postcode}
                    </Row>
                }
                <Row>
                  <strong>Receiver's email:</strong> &nbsp;
                  {email}
                </Row>
              </>
            :
              <>
                <Row>
                  Shipping Address not available.
                  Please go back to the previous Step (Step 1)!
                </Row>
              </>
          }
        </div>

        <div id="checkout-review-order-summary">
          <Row>
            <Col span={12}>
              <Title level={4}>Order Summary ({itemCount} items)</Title>
            </Col>
          </Row>
          {
            itemCount === 0 ? 
              <div>Your cart is empty</div>
            : <>
              <Row>
                <Col span={4}>
                  <div style={{fontWeight:"bold"}}>Product</div>
                </Col>
                <Col span={4}>
                  <div style={{textAlign: "center", fontWeight:"bold"}}>Unit Price</div>
                </Col>
                <Col span={3}>
                  <div style={{textAlign: "center", fontWeight:"bold"}}>Size</div>
                </Col>
                <Col span={4}>
                  <div style={{textAlign: "center", fontWeight:"bold"}}>Quantity</div>
                  </Col>
                <Col span={9}>
                  <div 
                    style={{
                      textAlign: "left", 
                      paddingRight: "10px", 
                      fontWeight:"bold"
                    }}>
                      Special Requirements
                  </div>
                </Col>
              </Row>
              <CartProducts key={itemCount} editable={false} />
            </>
          }          
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
              <div style={{textAlign: "left"}}>GST:</div>
            </Col>
            <Col span={6}>
              <div style={{textAlign: "right"}}>{formatNumber(total*0.01)}</div>
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
      cartItems: state.cartState.items,
      total: state.cartState.total,
      address: state.cartState.address,
      email: state.cartState.c_email,
  }
}

export default connect(mapStateToProps)(CheckoutReviewOrder);
