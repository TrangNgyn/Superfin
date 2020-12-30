import '../../_assets/CSS/pages/EditProfile.css';
import {Typography } from 'antd';
import { Row, Col } from 'antd';
import { Form, Input, Button } from 'antd';


const { Title } = Typography;


const EditProfile = () =>{
      const [form] = Form.useForm();
      const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
          console.log('Failed:', errorInfo);
      };
      const onReset = () => {
        form.resetFields();
        console.log("hihi");
      };
      return(
        <body>
        <div id="edit-profile-head">
        <Title level={3}>Edit Profile</Title>
        </div>
        <div id="edit-profile-content">
        <Form
              layout={'vertical'}
              form={form}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="First Name" name="firstname" >
              <Input />
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="PO Adress Line 1" name="poadressline1">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="Last Name" name="lastname" >
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="PO Adress Line 2" name="poadressline2">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="Email Address" name="emailadress">
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="PO Suburb" name="posuburb">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="Mobile Number" name="mobilenumber">
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="PO State" name="postate">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="Country Code" name="countrycode">
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="PO Postal Code" name="popostalcode">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item label="PO Attention To" name="poattentionto">
              <Input/>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="PO Country" name="pocountry">
              <Input />
              </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item>
              <Button type="primary" htmlType="submit" >Submit</Button>
              </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item >
              <Button type="primary" htmlType="button" onClick={onReset}>Reset</Button>
              </Form.Item>
              </Col>
            </Row>
        </Form>
        </div>
        </body>
      );

}

export default EditProfile
