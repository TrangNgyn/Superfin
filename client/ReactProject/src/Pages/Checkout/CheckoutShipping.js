import '../../_assets/CSS/pages/Checkout/CheckoutShipping.css';
import { Typography, Form, Input, Button, Row, Col, Steps, Select, InputNumber } from 'antd';
import {CaretLeftOutlined} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../_helpers/history';
import { setShipping } from '../../_actions/cartActions';

const { Title } = Typography;
const { Option } = Select;
const { Step } = Steps;

const CheckoutShipping = (props) =>{
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const addressPayload = {
      po_attention_to: values.po_attention_to,
      po_address_line1: values.address_line_1,
      po_address_line2: values.address_line_2,
      po_suburb: values.suburb,
      po_state: values.state,
      po_postcode: values.postcode,
    };

    const emailPayload = values.email;
    console.log(addressPayload)
    // update cart state
    props.setShipping(addressPayload, emailPayload);

    // store input address to local storage
    localStorage.setItem("address", JSON.stringify(addressPayload));
    localStorage.setItem("email", JSON.stringify(emailPayload));

    // redirect to review order page
    history.push('/checkoutReviewOrder');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };      

  return(
    <>
      <br/>
      <div id="checkout-shipping-head">
        <Title level={3}>Checkout</Title>
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
            <Form.Item label="Full Name" name="po_attention_to" 
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
                  message: 'Please select a state!'
                }
              ]}
            >
              <Select style={{ width: 120 }} >
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
    </>
  );
}

const mapDispatchToProps= (dispatch)=>{
  return{
    setShipping: (address, email) => {dispatch(setShipping(address, email))}
  }
}

export default connect(null, mapDispatchToProps)(CheckoutShipping);