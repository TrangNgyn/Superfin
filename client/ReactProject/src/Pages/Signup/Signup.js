import { Form, Input, Button, Tooltip } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { emailTakenModal, signupSuccess } from './Modals';
import { history } from '../../_helpers/history';
import { useState } from 'react';
import { layout, actionButtonsLayout } from './layouts'; 
import { onlyNumbers, checkPasswordStrength } from '../../_services/SharedFunctions';
import axios from 'axios';

const Signup = () => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);

    const submit = v => {
        console.log(v);
        setLoading(true);

        axios.post('api/auth/sign_up', v)
        .then(() => {
            setLoading(false);
            signupSuccess(v.first_name);
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            emailTakenModal();
        })
    }

    return(
        <>
            <div className="page-title-holder with-divider center-page">
                <h2>Sign Up</h2>
            </div>
            <Form className="container" {...layout} form={form} onFinish={submit} onFinishFailed={e => console.log(e)}>
                <Form.Item
                    label="First Name"
                    name="first_name"
                    style={{color: "#0E5F76"}}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                            whitespace: true
                        }
                    ]}
                >
                    <Input maxLength={30}/>
                </Form.Item>
        
                <Form.Item
                    label="Last Name"
                    name="last_name"
                    style={{color: "#0E5F76"}}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                            whitespace: true
                        }
                    ]}
                >
                    <Input maxLength={30}/>
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    style={{color: "#0E5F76"}}
                    validateTrigger={['onBlur']}
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Please input a valid email!',
                            whitespace: true,
                        }     
                    ]}
                >
                    <Input maxLength={30}/>
                </Form.Item>

                <Form.Item 
                        label="Phone" 
                        name="mobile" 
                        style={{color: "#0E5F76"}}
                        validateTrigger={['onBlur']}
                        
                        rules={[
                            {
                                validator: async (_, phone) => {
                                    if(phone !== undefined && phone !== "" && phone.length < 10){
                                        return Promise.reject(new Error('Phone number must be valid!'));
                                    }
                                },
                            },
                            {
                                required: true,
                                message: 'Please input a valid phone number!',
                                whitespace: true
                            }
                        ]}
                    >
                    <Input onChange={e => {onlyNumbers(e, form, 'phone')}} maxLength={10}/>
                </Form.Item>
                
                <Tooltip visible={tooltipVisible} title="Password must contain at least 8 characters, a special character, a number and an uppercase letter">
                    <Form.Item
                        label="Password"
                        name="password"
                        style={{color: "#0E5F76"}}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                                whitespace: true
                            },
                            {
                                validator: async (_, password) => {
                                    if(password !== undefined && password !== "" && !checkPasswordStrength(password)){
                                        setTooltipVisible(true);
                                        return Promise.reject(new Error('Password not strong enough'));
                                    }
                                },
                                validateTrigger: 'onSubmit'
                            }
                        ]}
                    >
                        <Input.Password onFocus={() => {setTooltipVisible(false)}} maxLength={50}/>
                    </Form.Item>
                </Tooltip>

                <Form.Item
                    label="Confirm Password"
                    name="passwordConfirm"
                    style={{color: "#0E5F76"}}
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) return Promise.resolve();
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                            validateTrigger: 'onSubmit'
                        })
                    ]}
                >
                    <Input.Password maxLength={30}/>
                </Form.Item>
                <Form.Item {...actionButtonsLayout}>
                    <Button style={{float: 'right'}} loading={loading} type="primary" htmlType="submit">Sign up</Button>
                </Form.Item>
                <Form.Item {...actionButtonsLayout}>
                    <span style={{float: 'right'}}>Already had an account ? &nbsp; <Button type="link" onClick={() => history.push('/login')}>Login</Button></span>
                </Form.Item>
            </Form>
        </>
    );
}

export default Signup;