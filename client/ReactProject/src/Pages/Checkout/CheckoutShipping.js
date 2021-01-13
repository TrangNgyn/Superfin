import '../../_assets/CSS/pages/CheckoutShipping.css';
import { Typography, Form, Input, Button, Row, Col, Steps } from 'antd';
import {CaretLeftOutlined} from '@ant-design/icons';



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
        },
      };
      return(
        <body>
        <div id="checkout-shipping-head">
        <Title level={3}>CHECK OUT</Title>
        </div>
        <div id="checkout-shipping-content">
        <div>
        <Steps current={0}>
            <Step title="Shipping Address"/>
            <Step title="Secure Payment"/>
            <Step title="Review Order"/>
            <Step title="Order Complete"/>
          </Steps>,
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
              <Col span={12}>
              <Form.Item label="State/Province" name="stateprovince" rules={[{ required: true}]}>
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Postcode" name="postcode" rules={[{ required: true }]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
              <Form.Item label="Contact Phone Number" name="contactphonenumber" rules={[{ required: true}]}>
              <Input/>
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
              <Col span={12}>
              <Form.Item>
              <Button type="text" htmlType="submit" ><CaretLeftOutlined />Return to cart</Button>
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
        </body>
      );

}

export default CheckoutShipping