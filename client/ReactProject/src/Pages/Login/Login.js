import { Form, Input, Button } from 'antd';
// import { history } from '../../_helpers/history';

import React, {useState} from 'react';
import { loginUser, useAuthState, useAuthDispatch } from '../../auth_lib/Context' 

import {Auth} from 'aws-amplify';

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



const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authDispatch = useAuthDispatch(); //get the dispatch method from the useDispatch custom hook
    const { loading, errorMessage } = useAuthState(); //read the values of loading and errorMessage from context

    const handleLogin = async (e) => {
        e.preventDefault();
        let payload = {email, password};
        try {
            await loginUser(authDispatch, payload)
                .then(res => {
                    props.history.push('/admin'); //navigate to dashboard on success
                });
            
        } catch (error) {
            console.log(error);
        }
    }

    const onFinish = values => {
        console.log('Success:', values);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const navigateForgotPasswordPage = () => {
        props.history.push('/emailRequest');
    }

    const navigateRegisterPage = () => {
    
    }

    return(
        <>
            <div className="page-title-holder with-divider center-page">
                <h1>Login</h1>
            </div>
            {
                errorMessage ? <p style={{color: 'red'}}>{errorMessage}</p> : null
            }

            <Form
                {...layout}
                name="login-form"
                initialValues={{remember: true,}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                
                <Form.Item
                    label="Email"
                    name="username"
                    rules={[{
                        required: true,
                        message: 'Please input your email!',
                    },]}>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)}
                        disabled={loading} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{
                        required: true,
                        message: 'Please input your password!',
                    },]}>
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}
                        disabled={loading} />   
                </Form.Item >

                <Form.Item {...actionButtonsLayout}>
                    <a onClick = {navigateForgotPasswordPage}>Forgot Password ?</a>
                </Form.Item>

                <Form.Item {...actionButtonsLayout}>
                    <Button type="primary" htmlType="submit"
                        onClick={handleLogin} disabled={loading} >
                            Login
                    </Button>
                </Form.Item>

                <Form.Item {...actionButtonsLayout}>
                    <span>Don't have an account yet ? &nbsp; <Button type="secondary" onClick={navigateRegisterPage}>Create an Account</Button></span>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;