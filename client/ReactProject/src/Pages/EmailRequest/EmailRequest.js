import '../../_assets/CSS/pages/EmailRequest/EmailRequest.css';
import { Form, Input, Button } from 'antd';
import { history } from '../../_helpers/history';


//Layout stuff//
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 7,
    },
};

const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};





const EmailRequest = () => {

    const onFinish = values => {
        console.log('Success:', values);
        history.push('/resetPasswordConfirmation');
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    

    return (
        <div>
            <div style = {{height: "5px"}}/>

            <div className="emailrequest-text-wrapper">
                <h1 className="emailrequest-text">Login</h1>
            </div>

            <div id="emailrequest-devider-1"/>

            <div className="emailrequest-text-wrapper">
                <div className="emailrequest-text" style={{fontSize: "17px"}}>
                    Enter your ID/email and we will send a link to your registered email address
                </div>
            </div>
           
            <div style = {{height: "25px"}}/>








            <Form
            {...layout}
            name="Email-Request-Form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="User ID/Email"
                    name="email"
                    rules={[{
                            required: true,
                            message: 'Please input your email',
                    }]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Button style = {{left:"28%", width:"150px"}} type="primary" htmlType="submit"> Submit </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EmailRequest;