import { Form, Input, Button } from 'antd';
import { history } from '../../_helpers/history';
import {useState} from 'react';
import axios from 'axios';

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
    const [errorMessage, setErrorMessage] = useState(false);
    const [loading] = useState(false);

    const login = () => {
        console.log("logging in");
        const user = {
            email: "its488@uowmail.com.au",
            password: "Password@1"
        }

 

        axios.post('api/auth/sign_in', user)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
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
        history.push('/signup');
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
                name="authentication-form"
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
                    <div onClick = {navigateForgotPasswordPage} style = {{cursor: 'pointer', color: '#EB6E00'}}>Forgot Password ?</div>
                </Form.Item>

                <Form.Item {...actionButtonsLayout}>
                    <Button onClick={login} type="primary" >
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
