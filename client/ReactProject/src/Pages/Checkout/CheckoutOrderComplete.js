import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../../_assets/CSS/pages/Checkout/CheckoutOrderComplete.css';
import { Typography, Button, Row, Col, Steps, Spin } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import CartProducts from '../Cart/CartProducts';
import { setError, setLoading } from '../../_actions/cartActions';
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
    // clean up before component unmount
    return () => {
      localStorage.clear();
    }    
  }, [])

  useEffect(() => {
    props.setLoading(isLoading);

    // create an order on rendering
    axios
      .post('/api/orders/create-order', {
        c_email,
        status: "NEW",
        items,
        address,
      })
      .then(res => {
        console.log(res)
        setLoadingState(false);
        return res;
      })
      .catch(err => props.setError(err))
      
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

          <div id="checkout-order-complete-summary">
            <Row>
              <Col span={12}><Title level={4}>Order Summary</Title></Col>
            </Row>
            <Row>
              <Col span={6}>
                <div style={{fontWeight:"bold"}}>Product</div>
              </Col>
              <Col span={6}>
                <div style={{textAlign: "center",fontWeight:"bold"}}>Price</div>
              </Col>
              <Col span={6}>
                <div style={{textAlign: "center",fontWeight:"bold"}}>Quantity</div>
              </Col>
              <Col span={6}>
                <div style={{textAlign: "right",paddingRight: "10px",fontWeight:"bold"}}>Total</div>
              </Col>
            </Row>
          </div>

          {/* Purchased Products */}
          <div id="checkout-order-complete-summary">
            <CartProducts editable={false} />
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
    }
  </>)
};

// export default CheckoutOrderComplete;

const mapDispatchToProps= (dispatch)=>{
  return{
    setLoading: (isLoading) => {dispatch(setLoading(isLoading))},
    setError: (err) => {dispatch(setError(err))},
  }
}

export default connect(null, mapDispatchToProps)(CheckoutOrderComplete);
