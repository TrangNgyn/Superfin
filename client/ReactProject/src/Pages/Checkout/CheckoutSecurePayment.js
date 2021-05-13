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
      <Title level={3}>Checkout</Title>
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
      <div>
        <Form
            layout={'vertical'}
            form={form}
            name="basic"
            requiredMark={false}
        >
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
      line_items: state.cartState.items,
      stripe: state.cartState.stripe,
      isLoading: state.cartState.loading,
      error: state.cartState.error,
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