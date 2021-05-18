import '../../_assets/CSS/pages/EmailRequest/EmailRequest.css';
import { Form, Input, Button, Modal } from 'antd';
import { history } from '../../_helpers/history';
import { useForm } from 'antd/lib/form/Form';
import axios from 'axios';
import { validateEmail } from '../../_services/SharedFunctions';
import { useState } from 'react';

const { info } = Modal;





//Layout stuff
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





const showEmailSent = (email) => {
    info({
        title: 'Email Sent!',
        content: (
            <span>
                A link has been sent to {`${email}`}. Please click this link to reset your password. 
                If you cannot find the email, check your spam folder or contact support.
            </span>
        ),
        onOk() {
            history.push('/login');
        }
    });
}





const EmailRequest = () => {
    const [form] = useForm();
    const [loading, setLoading] = useState(false);





    const sendRequest = () => {
        const email = form.getFieldValue('email').toLowerCase();
        
        if(!validateEmail(email))  return Promise.reject(new Error('Not a valid email!'));

        setLoading(true);

        return axios.post('api/user/forgot-password', {email: email})
        .then(() => {
            setLoading(false);
            showEmailSent(email);
        })
        .catch(err => {
            setLoading(false);
            console.log(err);
            return Promise.reject(new Error('Could not find email in our system!'));
        });
    }




    
    return (
        <div>
            <div style = {{height: "5px"}}/>

            <div className="emailrequest-text-wrapper">
                <h1 className="emailrequest-text">Login</h1>
            </div>

            <div id="emailrequest-devider-1"/>

            <div className="emailrequest-text-wrapper">
                <div className="emailrequest-text" style={{fontSize: "17px"}}>
                    Enter your email and we will send a reset password link to your registered email address
                </div>
            </div>
           
            <div style = {{height: "25px"}}/>

            <Form
                form={form}
                {...layout}
                name="Email-Request-Form"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            validator: sendRequest,
                            validateTrigger: "onSubmit"
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Button loading={loading} type="primary" htmlType="submit"> Submit </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EmailRequest;