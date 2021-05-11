import '../../_assets/CSS/pages/Checkout/CheckoutShipping.css';
import { Typography, Form, Input, Button, Row, Col, Steps, Select, InputNumber } from 'antd';
import {CaretLeftOutlined} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../_helpers/history';
import { setAddress } from '../../_actions/cartActions';

const { Title } = Typography;
const { Option } = Select;
const { Step } = Steps;

const CheckoutShipping = () =>{
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setAddress(values);
    history.push('/checkoutReviewOrder');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };      

  return(
    <body>
      <div id="checkout-shipping-head">
        <Title level={3}>CHECK OUT</Title>
      </div>
      <div id="checkout-shipping-status">
      <div>
        <Steps current={0}>
          <Step title="Shipping Address"/>
          <Step title="Review Order"/>
          <Step title="Secure Payment" />
          <Step title="Order Complete"/>
        </Steps>,
      </div>
      <div id="checkout-shipping-content">
      <Form
          layout={'vertical'}
          form={form}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          requiredMark={false}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Full Name" name="full_name" 
              rules={[
                { 
                  required: true,
                  message: "Please enter your full name!"
                }
            ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item 
              label="Email Address" 
              name="email" 
              rules={[
                { 
                  type: 'email',
                  required: true,
                  message: 'Please enter your email!'
                }
              ]}>
              <Input/>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Address Line 1" name="address_line_1" 
              rules={[
                {
                  required: true, 
                  message: "Please enter your address line 1"
                }
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
        <Col span={24}>
            <Form.Item label="Address Line 2" name="address_line_2" 
              rules={[
                {
                  required: false,
                }
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Form.Item 
              label="Suburb" 
              name="suburb" 
              rules={[
                { 
                  required: true,
                  message: 'Please enter your suburb'
                }
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col >
            <Form.Item 
              label="State" 
              name="state" 
              rules={[
                { 
                  required: true,
                  message: "Select a state!"
                }
              ]}>
              <Select  style={{ width: 120 }} >
                <Option value="NSW">NSW</Option>
                <Option value="VIC">VIC</Option>
                <Option value="ACT">ACT</Option>
                <Option value="NT">NT</Option>
                <Option value="QLD">QLD</Option>
                <Option value="SA">SA</Option>
                <Option value="TAS">TAS</Option>
                <Option value="WA">WA</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              label="Postcode" 
              name="postcode"  
              rules={[
                { 
                  required: true,
                  type: 'number',
                  message: "Please enter your postcode"
                }
              ]}>
              <InputNumber min={200} max={9729} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={10}>
            <Form.Item>
              <Button type="text"><Link to="/Cart"><CaretLeftOutlined />Return to cart</Link></Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item >
              <Button type="primary" htmlType="submit">Continue</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      </div>
    </div>
    </body>
  );
}

const mapDispatchToProps= (dispatch)=>{
  return{
    setAddress: (address) => {dispatch(setAddress(address))}
  }
}

export default connect(null, mapDispatchToProps)(CheckoutShipping);