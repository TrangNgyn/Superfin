import React, { useEffect } from 'react';
import '../../_assets/CSS/pages/Checkout/CheckoutOrderComplete.css';
import { Typography, Button, Row, Col, Steps } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { formatNumber } from '../../_helpers/utils';
import CartProducts from '../Cart/CartProducts';

const { Title } = Typography;
const { Step } = Steps;


const CheckoutOrderComplete = (props) =>{

  const total = 0;

  // clean up after component unloads
  useEffect(() => {

    const onbeforeunloadFn = () => {
      localStorage.removeItem('products')
    }

    window.addEventListener('beforeunload', onbeforeunloadFn);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunloadFn);
    }
  }, [])

  return(
    <div>

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
  )
};

export default CheckoutOrderComplete;
