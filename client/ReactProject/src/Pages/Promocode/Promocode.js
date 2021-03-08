import '../../_assets/CSS/pages/Promocode.css';
import {Typography } from 'antd';
import { Row, Col } from 'antd';
import { DatePicker, Form, Input, InputNumber, Button, Select } from 'antd';
import {EditFilled} from '@ant-design/icons';



const { Title } = Typography;


const Promocode = () =>{
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

    function onChange(date, dateString) {
      console.log(date, dateString);
    }

    const { Option } = Select;

    return (
      <body>
        <div>
            <div id="promocode-window">
                Admin Station
            </div>
            <div id="promocode-head">
            <Title level={3}>Promocode Management</Title>
            </div>
            <div id="promocode-content">
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
                <Row  justify="center">
                <Col>
                  <Form.Item
                    label="Promocode ID"
                    name="promocodeID"
                    >
                  <Input />
                  </Form.Item>
                </Col>
                <Col ><Button type="primary" htmlType="submit" >Find</Button></Col>

                </Row>
                <Row gutter={16} >
                  <Col span={12}>
                    <Form.Item
                      name="amountOff"
                      label="Amount off (AUD)"
                      rules={[{ type: 'number',min: 0},{required: true}]}>
                      <InputNumber  style={{ width:"100%" }}/>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item label="Duration" name="duration" rules={[{ required: true}]}>
                  <Select  >
                    <Option value="forever">Forever</Option>
                    <Option value="once">Once</Option>
                    <Option value="repeating">Repeating</Option>
                  </Select>
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                  <Form.Item
                    label="Duration in months"
                    name="durationInMonths"
                    rules={[{ type: 'number',min: 0, max: 12},{required: true}]}>
                    <InputNumber  style={{ width:"100%" }}/>
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                    label="Live mode"
                    name="livemode"
                    rules={[{ required: true}]}>
                    <Select  >
                      <Option value="true">True</Option>
                      <Option value="false">False</Option>
                    </Select>
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                  <Form.Item
                    label="Max redemptions (times)"
                    name="maxRedemptions"
                    rules={[{ type: 'number',min: 0, max: 100}]}>
                    <InputNumber  style={{ width:"100%" }}/>
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true}]}>
                  <Input />
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                  <Form.Item
                    label="Percent off (%)"
                    name="percentOff"
                    rules={[{ type: 'number',min: 0, max: 100},{required: true}]}>
                    <InputNumber  style={{ width:"100%" }}/>
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                    label="Redeem by"
                    name="redeemBy"
                    rules={[{ required: true}]}>
                    <DatePicker onChange={onChange} />
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                  <Form.Item
                    label="Valid"
                    name="valid"
                    rules={[{ required: true}]}>
                    <Select  >
                      <Option value="true">True</Option>
                      <Option value="false">False</Option>
                    </Select>
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                    label="Expires at"
                    name="expiresAt">
                    <DatePicker onChange={onChange} />
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                  <Form.Item
                    label="First time transaction"
                    name="first_time_transaction"
                  >
                  <Select>
                    <Option value="true">True</Option>
                    <Option value="false">False</Option>
                  </Select>
                  </Form.Item>
                  </Col>
                  <Col span={12}>
                  <Form.Item
                    label="Minimum Amount"
                    name="minimum_amount"
                    rules={[{ type: 'number',min: 0}]}>
                    <InputNumber  style={{ width:"100%" }}/>
                  </Form.Item>
                  </Col>
                </Row>
                <Row gutter={16} >
                  <Col offset={12}span={4}>
                  <Form.Item>
                  <Button type="primary" htmlType="submit" >Create</Button>
                  </Form.Item>
                  </Col>
                </Row>
            </Form>
            </div>
        </div>
      </body>
    )
};

export default Promocode;
