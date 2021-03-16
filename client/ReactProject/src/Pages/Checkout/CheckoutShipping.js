import '../../_assets/CSS/pages/Checkout/CheckoutShipping.css';
import { Typography, Form, Input, Button, Row, Col, Steps, Select, InputNumber } from 'antd';
import {CaretLeftOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';





const { Title } = Typography;
const { Step } = Steps;


const CheckoutShipping = () =>{
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
      const { Option } = Select;

      return(
        <body>
        <div id="checkout-shipping-head">
        <Title level={3}>CHECK OUT</Title>
        </div>
        <div id="checkout-shipping-status">
        <div>
        <Steps current={0}>
            <Step title="Shipping Address"/>
            <Step title="Secure Payment" />
            <Step title="Review Order"/>
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
              validateMessages={validateMessages}
            >
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="First Name" name="firstname" rules={[{ required: true}]}>
              <Input />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Last Name" name="lastname" rules={[{ required: true }]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Company Name" name="companyname">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Address" name="address" rules={[{ required: true }]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Suburb" name="suburb" rules={[{ required: true}]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col >
              <Form.Item label="State/Province" name="stateprovince" rules={[{ required: true}]}>
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
              <Form.Item label="Postcode" name="Postcode"  rules={[{ type: 'number',min: 200, max: 9729,},{required: true}]}>
                <InputNumber min={200} max={9729} />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item name="Phone Number" label="Phone Number" rules={[{ type: 'number'},{required: true}]}>
                <InputNumber  style={{ width: 226 }}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Email Address" name="emailaddress" rules={[{ required: true},{ type: 'email'}]}>
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
              <Button type="primary" htmlType="submit"><Link to="/CheckoutSecurePayment">Continue</Link></Button>
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
