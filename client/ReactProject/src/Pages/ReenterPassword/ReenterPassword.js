import { Form, Input, Button, Modal, Tooltip} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { checkPasswordStrength } from '../../_services/SharedFunctions';
import { history } from '../../_helpers/history';
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

const successReset = () => {
    Modal.success({
        title: 'Password reset!',
        content: 'Confirmation has been sent to your email address. You can now use this password to log into your account.',
        onOk() {
            history.push('/login');
        }
    });
}

const somethingWentWrong = () => {
    Modal.error({
        title: 'Something went wrong!',
        content: 'Please try try sending your forgotten password request again or contact support',
        onOk() {
            history.push('/emailRequest');
        }
    });
}

const ReenterPassword = () => {
    const {token, email} = useParams();
    const [form] = useForm();
    const [toolTipVisible, setToolTipVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    if(token === undefined || email === undefined) somethingWentWrong();

    console.log("token", token);
    console.log(email, email);

    const submitNewPassword = (_, confirmPassword) => {
        const new_password = form.getFieldValue('password');

        if(!confirmPassword) return Promise.resolve();
        if(new_password !== confirmPassword ) return Promise.reject(new Error('Passwords do not match'));
        if(!checkPasswordStrength(confirmPassword)){
            setToolTipVisible(true);
            return Promise.reject(new Error('Password not strong enough'));
        } 

        const body = {
            new_password: new_password,
            email: email,
            token: token
        }

        setLoading(true);

        return axios.post('/api/user/reset-password-email', body)
        .then(res => {
            setLoading(false);
            successReset();
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            if(err.response.status === 400) return Promise.reject(new Error('Cannot use previous password!'));
            else somethingWentWrong();
        });
    }

  
    return (
        <div>
            <div className="page-title-holder with-divider center-page">
                <h1>Re-enter Password</h1>
            </div>

            <Form
                {...layout}
                name="authentication-form"
                form={form}
            >
                <Tooltip 
                    visible={toolTipVisible} 
                    title="Password must contain at least 8 characters, a special charater, a number, and an upper case letter"
                >
                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your new password!',
                            }
                        ]}
                    >
                        <Input.Password maxLength={50} onFocus={() => {setToolTipVisible(false)}}/> 
                    </Form.Item>
                </Tooltip>

                <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: submitNewPassword,
                            validateTrigger: "onSubmit"
                        }
                    ]}
                >
                    <Input.Password maxLength={50}/>   
                </Form.Item >
                
                
                <Form.Item {...actionButtonsLayout}>
                    <Button loading={loading} type="primary" htmlType="submit">Reset</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ReenterPassword;