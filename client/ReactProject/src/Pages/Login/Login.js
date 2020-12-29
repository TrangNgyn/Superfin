import { Form, Input, Button } from 'antd';
import '../../_assets/CSS/pages/Login/Login.css';




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






const Login = () => {

    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const navigateForgotPasswordPage = () => {
        
    }

    const navigateRegisterPage = () => {
    
    }

    return(
        <>  
            
            <div style = {{height: "5px"}}/>

            <div id="login-header-title-wrapper">
                <h1 id="login-header-title">Login</h1>
            </div>

            <div id="login-devider-1"/>

            <div style = {{position:"relative"}} >
                <div id="login-forgot-password-button" onClick = {navigateForgotPasswordPage}>Forgot Password?</div>
            </div>











            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{
                            required: true,
                            message: 'Please input your username!',
                    },]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input your password!',
                    },]}
                >
                    <Input.Password />   
                </Form.Item >
                   
                <Form.Item {...tailLayout}>
                    <Button style = {{width:"150px"}} type="primary" onClick={navigateRegisterPage}> Create an Account </Button>

                    <Button style = {{left:"17%", width:"150px"}} type="primary" htmlType="submit"> Login</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;