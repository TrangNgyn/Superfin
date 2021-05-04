import '../../_assets/CSS/pages/Checkout/CheckoutSecurePayment.css';
import { Typography, Form,  Button, Row, Col, Steps, Radio, DatePicker, InputNumber  } from 'antd';
import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const { Title } = Typography;
const { Step } = Steps;
const monthFormat = 'MM/YY';

///////////////////////////////////////
//        Clean up later             //
///////////////////////////////////////

const fetchCheckoutSession = async ({ line_items, c_email }) => {
  return fetch('api/stripe/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      line_items,
      c_email,
    }),
  }).then((res) => res.json());
};

// function to format price (e.g. $10.00)
const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

function reducer(state, action) {
  switch (action.type) {
    case 'useEffectUpdate':
      return {
        ...state,
        ...action.payload,
        line_items: action.payload.line_items,
      };
    case 'increment':
      return {
        ...state,
        quantity: state.quantity + 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity + 1,
        }),
      };
    case 'decrement':
      return {
        ...state,
        quantity: state.quantity - 1,
        price: formatPrice({
          amount: state.unitAmount,
          currency: state.currency,
          quantity: state.quantity - 1,
        }),
      };
    case 'setLoading':
      return { ...state, loading: action.payload.loading };
    case 'setError':
      return { ...state, error: action.payload.error };
    default:
      throw new Error();
  }
}




const CheckoutSecurePayment = () =>{
  const [form] = Form.useForm();
  // const [value, setValue] = React.useState(1);

  // order state containing line_items and quantity
  const [state, dispatch] = useReducer(reducer, {
    line_items: [{
      quantity: 0,
      price_id: '',
    }],
    loading: false,
    error: null,
    stripe: null,
  });

  // fetch stripe config on page load
  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { publicKey, currency } = 
        await fetch('api/stripe/config')
        .then((res) => res.json());
      
      // Make sure to call `loadStripe` outside of a component’s render to avoid
      // recreating the `Stripe` object on every render.
      dispatch({
        type: 'useEffectUpdate',
        payload: { currency, stripe: await loadStripe(publicKey) },
      });
    }
    fetchConfig();
  }, []);


  const paymentOnClick = async (event) => {
    // Call your backend to create the Checkout session.
    dispatch({ type: 'setLoading', payload: { loading: true } });
    const { sessionId } = await fetchCheckoutSession({
      line_items: state.line_items,
      c_email: state.c_email,
    });
    // When the customer clicks on the button, redirect them to Checkout.
    const { error } = await state.stripe.redirectToCheckout({
      sessionId,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    if (error) {
      dispatch({ type: 'setError', payload: { error } });
      dispatch({ type: 'setLoading', payload: { loading: false } });
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // const onChange = e => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };


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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                  <Link to="/CheckoutReviewOrder">Back</Link>
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

export default CheckoutSecurePayment
