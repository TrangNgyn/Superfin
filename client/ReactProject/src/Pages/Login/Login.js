import { Form, Input, Button } from 'antd';
import { history } from '../../_helpers/history';




//Layout stuff//
const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
};

const actionButtonsLayout = {
    wrapperCol: {
        span: 22
    }
};



const Login = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const navigateForgotPasswordPage = () => {
        history.push('/emailRequest');
    }

    const navigateRegisterPage = () => {
        history.push('/signup');
    }

    return(
        <>
            <div className="page-title-holder with-divider center-page">
                <h1>Login</h1>
            </div>

            <Form
                {...layout}
                name="login-form"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                <Form.Item
                    label="User ID/Email"
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Please input your username!',
                    },]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input your password!',
                    },]}>
                    <Input.Password />
                </Form.Item >

                <Form.Item {...actionButtonsLayout}>
                    <a onClick = {navigateForgotPasswordPage}>Forgot Password ?</a>
                </Form.Item>

                <Form.Item {...actionButtonsLayout}>
                    <Button type="primary" htmlType="submit">Login</Button>
                </Form.Item>

                <Form.Item {...actionButtonsLayout}>
                    <span>Don't have an account yet ? &nbsp; <Button type="secondary" onClick={navigateRegisterPage}>Create an Account</Button></span>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;
