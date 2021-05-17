import { Form, Input, Button } from 'antd';
import { history } from '../../_helpers/history';
import {useState} from 'react';
import { useAuthUpdate } from '../../SharedComponents/AuthContext/AuthContext';
import axios from 'axios';
import { useForm } from 'antd/lib/form/Form';
import { layout, actionButtonsLayout } from './layouts'; 
import { isWhiteSpace, validateEmail } from '../../_services/SharedFunctions';
import { userConstants } from '../../_constants/user.constants';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const [form] = useForm();
    const updateAuth = useAuthUpdate();


    const login = (_, password) => {
        const email = form.getFieldValue('email');

        if(!password || isWhiteSpace(password) || !validateEmail(email)) return Promise.resolve();

        setLoading(true);

        const user = {
            email: email.toLowerCase(),
            password: password
        }
        
        return axios.post('api/auth/sign_in', user)
        .then(res => {
            setLoading(false);
            localStorage.setItem('SUPERFIN_USER', JSON.stringify(res.data));
            updateAuth(res.data);
            if(res.data.roles[0] === userConstants.ROLE_ADMIN) history.push('/admin');
            else history.push('/');
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            return Promise.reject(new Error('Could not find email or password our system!'));
        });
    }


    

    return(
        <div>
            <div className="page-title-holder with-divider center-page">
                <h1>Login</h1>
            </div>
        
            <Form
                {...layout}
                name="authentication-form"
                form={form}
            >
                 <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {   
                                type: 'email',
                                required: true,
                                message: 'Please input valid email!',
                                whitespace: true,
                                validateTrigger: "onSubmit"
                            },
                        ]}
                    >
                        <Input maxLength={100}/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                                whitespace: true
                            },
                        
                            {
                                validator: login,
                                validateTrigger: "onSubmit"
                            }
                        ]}
                    >
                        <Input.Password maxLength={100}/>
                    </Form.Item >

                <Form.Item {...actionButtonsLayout}>
                    <span style={{cursor: 'pointer', color: '#EB6E00', marginRight: '17px'}} onClick={() => {history.push('/emailRequest')}}>Forgot Password ?</span>
                </Form.Item>

                <Form.Item {...actionButtonsLayout} >
                    <Button style={{marginRight: '17px'}} loading={loading} type="primary" htmlType="submit">Login</Button>
                </Form.Item>

                <Form.Item {...actionButtonsLayout}>
                    <span>Don't have an account yet ? &nbsp; <Button type="link" >Create an Account</Button></span>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
