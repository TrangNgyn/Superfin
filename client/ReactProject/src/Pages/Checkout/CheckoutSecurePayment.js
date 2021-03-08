import '../../_assets/CSS/pages/CheckoutSecurePayment.css';
import { Typography, Form,  Button, Row, Col, Steps, Radio, DatePicker, InputNumber  } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Step } = Steps;
const monthFormat = 'MM/YY';


const CheckoutSecurePayment = () =>{
      const [form] = Form.useForm();
      const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
      };
      const validateMessages = {
        required: '${label} is required',
        types: {
          email: '${label} is not a valid email',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };
      const [value, setValue] = React.useState(1);
      const onChange = e => {
          console.log('radio checked', e.target.value);
          setValue(e.target.value);
        };
      return(
        <body>
        <div id="checkout-payment-head">
        <Title level={3}>CHECK OUT</Title>
        </div>
        <div id="checkout-payment-content">
        <div>
        <Steps current={1}>
            <Step title="Shipping Address"/>
            <Step title="Secure Payment"/>
            <Step title="Review Order"/>
            <Step title="Order Complete"/>
          </Steps>,
        </div>
        <div id="payment-radio">
        <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}> Credit Card </Radio>
              <Radio value={2}>Paypal</Radio>
            </Radio.Group>
        </div>
        <Form
              layout={'vertical'}
              form={form}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              requiredMark={false}
              validateMessages={validateMessages}
            >
            <Row gutter={16}>
              <Col span={10} offset={7}>
              <Form.Item name="Card Number" label="Card Number" rules={[{ type: 'number'},{required: true}]}>
                <InputNumber  style={{ width: 450 }}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={3} offset={7}>
              <Form.Item label="Exp Month/ Exp Year" name="expmonthyear" rules={[{ required: true}]}>
              <DatePicker  format={monthFormat} picker="month" />
              </Form.Item>
              </Col>
              <Col span={6} offset={1}>
              <Form.Item name="CVV" label="CVV" rules={[{ type: 'number',min: 0, max: 999,},{required: true}]}>
                <InputNumber min={0} max={999}/>
              </Form.Item>
              </Col>

            </Row>
            <Row gutter={16}>
              <Col span={12} offset={7}>
              <Form.Item >
              <Button type="primary" htmlType="submit"><Link to="/CheckoutReviewOrder">Continue</Link></Button>
              </Form.Item>
              </Col>
            </Row>
        </Form>
        </div>
        </body>
      );

}

export default CheckoutSecurePayment
