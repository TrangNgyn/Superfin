import { Form, Input, Button } from 'antd';
import '../../_assets/CSS/layouts/Footer/FooterEmailInput.css'

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
        onFinishFailed={onFinishFailed}
        >
        <Form.Item className="Footer-email-form-item">
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item  className="Footer-email-form-item">
            <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
  );
};
export default FooterEmailInput;