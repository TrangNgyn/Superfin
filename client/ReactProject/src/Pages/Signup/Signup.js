import '../../_assets/CSS/pages/Signup.css';
import {Typography } from 'antd';
import { Row, Col } from 'antd';
import { Form, Input, InputNumber, Button, Select } from 'antd';


const { Title } = Typography;


const Signup = () =>{
      const [form] = Form.useForm();
      const onFinish = (values) => {
        console.log('Success:', values);
        alert("Account created");
      };
      const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
      };
     

      const { Option } = Select;

      return(
        <body>
        <div id="signup-head">
        <Title level={3}>Sign Up</Title>
        </div>
        <div id="signup-content">
        <Form
              labelCol={{
                span: 9,
              }}
              wrapperCol={{
                span: 12,
              }}
              layout={'horizontal'}
              form={form}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
            <Row gutter={[16,32]}>
              <Col span={6} offset={6}>Account Details</Col>
              <Col span={6} offset={6}>Delivery Details</Col>
            </Row>
            <Row gutter={16} >
              <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstname"
                rules={[{ required: true}]}>
              <Input />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[{ type: 'number'},{required: true}]}>
                <InputNumber  style={{ width:"100%" }}/>
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastname"
                rules={[{ required: true}]}>
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                label="Delivery Address"
                name="deliveryAddress"
                rules={[{ required: true}]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
                hasFeedback
              >
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                label="Billing Address"
                name="billingAddress"
                rules={[{ required: true}]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                label="Confirm Email"
                name="confirmEmail"
                dependencies={['email']}
                hasFeedback
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please confirm your email!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('email') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('The two emails that you entered do not match!'));
                    },
                  }),
                ]}

              >
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item
                label="Suburb"
                name="suburb"
                rules={[{ required: true}]}>
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
              <Input.Password/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="State/Province" name="stateprovince" rules={[{ required: true}]}>
              <Select  >
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
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    },
                  }),
                ]}
              >
              <Input.Password/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Postcode" name="Postcode"  rules={[{ type: 'number',min: 200, max: 9729,},{ required: true}]}>
                <InputNumber min={200} max={9729} />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16} >
              <Col offset={20}span={4}>
              <Form.Item>
              <Button type="primary" htmlType="submit" >Sign Up</Button>
              </Form.Item>
              </Col>
            </Row>
        </Form>
        </div>
        </body>
      );

}

export default Signup
