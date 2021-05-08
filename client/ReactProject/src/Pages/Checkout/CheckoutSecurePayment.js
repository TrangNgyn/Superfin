import '../../_assets/CSS/pages/Checkout/CheckoutSecurePayment.css';
import { Typography, Form,  Button, Row, Col, Steps, Radio, DatePicker, InputNumber  } from 'antd';
import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { loadStripeAction, setLoading, setError } from '../../_actions/cartActions';
import axios from 'axios';

const { Title } = Typography;
const { Step } = Steps;

const fetchCheckoutSession = async ({ line_items }) => {
  return fetch('api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      line_items
    }),
  }).then((res) => res.json());
};

const CheckoutSecurePayment = (props) =>{
  const [form] = Form.useForm();

  // fetch stripe config on page load
  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { publicKey, currency } = 
        await fetch('api/stripe/config')
        .then((res) => res.json());
      
      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.
      props.loadStripeAction(await loadStripe(publicKey));
    }
    fetchConfig();
  }, []);


  const paymentOnClick = async (event) => {
    // Call your backend to create the Checkout session.
    props.setLoading(true);
    const { sessionId } = await fetchCheckoutSession({
      line_items: props.line_items
    });

    if(sessionId){
      // When the customer clicks on the button, redirect them to Checkout.
      const { error } = await props.stripe.redirectToCheckout({
        sessionId,
      });
    
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `error.message`.
      if (error) {
        props.setError(error);
        props.setLoading(false);
      }

      props.setLoading(false);
    }else{
      props.setError(sessionId);
      props.setLoading(false);
    }
  };

  return(
    <div>
    <div id="checkout-payment-head">
      <Title level={3}>CHECKOUT</Title>
    </div>
    <div id="checkout-payment-content">
      <div>
        <Steps current={2}>
          <Step title="Shipping Address"/>
          <Step title="Review Order"/>
          <Step title="Secure Payment"/>
          <Step title="Order Complete"/>
        </Steps>,
      </div>
      {/* <div id="payment-radio">
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}> Credit Card </Radio>
          <Radio value={2}>Paypal</Radio>
        </Radio.Group>
      </div> */}
      <div>
        <Form
            layout={'vertical'}
            form={form}
            name="basic"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            requiredMark={false}
        >
  {/*               
              <Row gutter={16}>
                <Col span={10} offset={7}>
                <Form.Item 
                  name="Card Number" 
                  label="Card Number" 
                  rules={[
                      { 
                          type: 'number',
                          required: true,
                          message: 'Input valid card number!'
                      }
                  ]}>
                  <InputNumber  style={{ width: 450 }}/>
                </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={3} offset={7}>
                <Form.Item 
                  label="Exp Month/ Exp Year" 
                  name="expmonthyear" 
                  rules={[
                      { 
                          required: true,
                          message: "Please input an expiration date"
                      }
                  ]}>
                <DatePicker  format={monthFormat} picker="month" />
                </Form.Item>
                </Col>
                <Col span={6} offset={1}>
                <Form.Item name="CVV" label="CVV" 
                  rules={[
                      { 
                          type: 'number',
                          required: true,
                          message: "Input a value between 0 and 999!"
                      }
                  ]}>
                  <InputNumber min={0} max={999}/>
                </Form.Item>
                </Col>

              </Row> */}
          <Row gutter={16}>
            <Col span={2} offset={7}>
              <Form.Item >
                <Button type="primary" htmlType="submit">
                  <Link to="/checkoutReviewOrder">Back</Link>
                </Button>
              </Form.Item>
            </Col>
            <Col >
              <Form.Item >
                <Button type="primary" 
                    htmlType="submit" 
                    onClick={paymentOnClick}>
                  Continue to Payment Gateway
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    </div>
  );

}

//export default CheckoutSecurePayment

const mapStateToProps = (state)=>{
  return{
      line_items: state.cartState.line_items,
      stripe: state.cartState.stripe,
  }
}

const mapDispatchToProps= (dispatch)=>{
  return{
     loadStripeAction: (stripe) => {dispatch(loadStripeAction(stripe))},
     setLoading: (loading) => {dispatch(setLoading(loading))},
     setError: (error) => {dispatch(setError(error))},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckoutSecurePayment);