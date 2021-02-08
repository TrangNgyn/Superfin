import { Form, Input, Button } from 'antd';

const FooterEmailInput = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };
    
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
      <Form
        name = 'footer-email-form'
        layout='inline'
        form = {form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item><Input placeholder="Enter your email" /></Form.Item>
        <Form.Item><Button type="primary" htmlType="submit">Submit</Button></Form.Item>
      </Form>
  );
};
export default FooterEmailInput;