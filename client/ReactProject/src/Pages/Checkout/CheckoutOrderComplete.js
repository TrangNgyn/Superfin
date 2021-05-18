import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from 'react-redux';
import '../../_assets/CSS/pages/Checkout/CheckoutOrderComplete.css';
import { Typography, Button, Row, Col, Steps, Spin } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import CartProducts from '../Cart/CartProducts';
import { clearCart, setError, setLoading } from '../../_actions/cartActions';
import axios from 'axios';

const { Title } = Typography;
const { Step } = Steps;


const CheckoutOrderComplete = (props) =>{

  // order fields
  const total = JSON.parse(localStorage.getItem("total"));
  const items = JSON.parse(localStorage.getItem("items"));
  const address = JSON.parse(localStorage.getItem("address"));
  const c_email = JSON.parse(localStorage.getItem("email"));

  // component states
  const [isLoading, setLoadingState] = useState(true);

  useEffect(() => {
    // create an order on rendering
    axios
      .post('/api/orders/create-order', {
        c_email,
        status: "NEW",
        items,
        address,
      })
      .then(res => {
        // set loading state to false when done
        setLoadingState(false);
        return res;
      })
      .catch(err => props.setError(err))

    // clean up before component unmount
    return () => {
      localStorage.clear();
      props.clearCart()
    }    
  }, [])

  useEffect(() => {
    props.setLoading(isLoading);      
  }, [isLoading])

  return(<>
    {
      isLoading ?
      <>
        <br/>
        <div align="center">
          <Spin size='large'/> <br/>
          We are processing your order. <br/>
          Please do <strong>NOT</strong> close this tab!
        </div>
      </>
      :
      (
        !items ?
        <>
          <div className="page-title-holder fill">
            <h2>Page Not Found</h2>
          </div>
          <div style={{textAlign: "center"}} >
            <br/>
            <Row justify="space-around" align="middle" >
              <p>The page you're looking for is unavailable.</p>
            </Row>
            <Row justify="space-around" align="middle" >
              <p>Please click <Link to="/" >here</Link> to continue shopping.</p>
            </Row>
          </div>
        </> :
        <div>
          <br/>
          <div id="checkout-order-complete-head">
            <Title level={3}>Order Placed</Title>
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
              <Row justify="space-around" align="middle">
                <Title level={4}>Order Placed</Title>
              </Row>
              <Row justify="space-around" align="middle">
                <CheckCircleFilled style={{ fontSize: '400%', color: 'green'}} />
              </Row>
              <Row justify="space-around" align="middle">
                <div>Your order has been received and will be processed soon.</div>
              </Row>
                <Row justify="space-around" align="middle">
                  <div>Thank you for choosing us.</div>
                </Row>
            </div>
      
            {/* Address */}
            <div id="checkout-order-complete-summary">
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
                      {c_email}
                    </Row>
                  </> :
                  <>
                    <Row>
                      Shipping Address not available.
                      Please go back to the previous Step (Step 1)!
                    </Row>
                  </>
              }
            </div>
      
            <div id="checkout-order-complete-summary">
              <Row>
                <Col span={12}><Title level={4}>Order Summary</Title></Col>
              </Row>
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
            </div>
      
            {/* Purchased Products */}
            <div id="checkout-order-complete-summary">
              <CartProducts key={items} editable={false} />
            </div>
      
            <div id="checkout-order-complete-payment">
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
      
          </div>
        </div>
      )
    }
  </>)
};

const mapDispatchToProps= (dispatch)=>{
  return{
    setLoading: (isLoading) => {dispatch(setLoading(isLoading))},
    setError: (err) => {dispatch(setError(err))},
    clearCart: () => {dispatch(clearCart())}
  }
}

export default connect(null, mapDispatchToProps)(CheckoutOrderComplete);
