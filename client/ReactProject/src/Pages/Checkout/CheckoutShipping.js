import '../../_assets/CSS/pages/Checkout/CheckoutShipping.css';
import { Typography, Form, Input, Button, Row, Col, Steps, Select, InputNumber } from 'antd';
import {CaretLeftOutlined} from '@ant-design/icons';
import { Link, Redirect } from 'react-router-dom';
import { history } from '../../_helpers/history';

const { Title } = Typography;
const { Option } = Select;
const { Step } = Steps;



const CheckoutShipping = () =>{
      const [form] = Form.useForm();

      const onFinish = (values) => {
        console.log('Success:', values);
        localStorage.setItem('user', JSON.stringify(values));
        history.push('/CheckoutReviewOrder');
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
              <Col span={12}>
              <Form.Item 
                label="First Name"
                name="firstname" 
                rules={[
                    { 
                        required: true,
                        message: "Input a first name!"
                    }
                ]}>
              <Input />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Last Name" name="lastname" 
                rules={[
                    { 
                        required: true,
                        message: "Input a last name!"
                    }
                ]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Street number" name="street_number" rules={[{ type: 'number',min:0, message: "Street number cannot be negative"},{required: true, message: "Input an address"}]}>
              <InputNumber min={0} />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Street name" name="street_name" rules={[{ required: true, message: "Input an address"  }]}>
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
                        message: 'Input a suburb!'
                    }
                ]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col >
              <Form.Item 
                label="State/Province" 
                name="stateprovince" 
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
                name="Postcode"  
                rules={[
                    { 
                        required: true,
                        type: 'number',
                        message: "Input a postcode"
                    }
                ]}>
                <InputNumber min={200} max={9729} />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item 
                name="Phone Number" 
                label="Phone Number" 
                rules={[
                    { 
                        required: true,
                        type: 'number',
                        message: "input a phone number"
                    }
                ]}>
                <InputNumber  style={{ width: 226 }}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item 
                label="Email Address" 
                name="emailaddress" 
                rules={[
                    { 
                        type: 'email',
                        required: true,
                        message: 'Please input an email!'
                    }
                ]}>
              <Input/>
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

export default CheckoutShipping
