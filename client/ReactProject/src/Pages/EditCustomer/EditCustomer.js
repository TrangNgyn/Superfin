import '../../_assets/CSS/pages/EditCustomer/EditCustomer.css';
import { layout, tailLayout } from './FormLayout';
import { onlyNumbers, _logout, checkPasswordStrength, isWhiteSpace } from '../../_services/SharedFunctions';
import { Input, Form, Button, Spin } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { useAuth, useAuthUpdate } from '../../SharedComponents/AuthContext/AuthContext';
import { editSuccessModal, editFailModal, editConfirmModal, changePasswordConfirmModal, changePasswordSuccess } from './Modals';
import axios from 'axios';

const EditCustomer = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [userInfo, setUserInfo] = useState(null);

    const [form] = useForm();
    const [form2] = useForm();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    useEffect(() => {
        if(userInfo === null){
            setLoading(true);
            const config = { headers:{ authorization : `Bearer ${auth.access_token}` }};

            axios.get('api/user/', config)
            .then(res => { 
                setLoading(false);

                delete res.data.email;      //dont need the email for this page
                setUserInfo(res.data);

                form.setFieldsValue({ 
                    first_name: res.data.first_name,
                    last_name: res.data.last_name,
                    mobile: res.data.mobile
                });
            })
            .catch(err => {
                console.log(err);
                if(err.response.status === 401) _logout(updateAuth);
                else{
                    setLoading(false);
                    setError(true);
                }
            })
        }
    }, [auth.access_token, form, updateAuth, userInfo]);

    const submitEdit = v => {
        if(JSON.stringify(v) === JSON.stringify(userInfo)) return;

        const config = { headers:{ authorization : `Bearer ${auth.access_token}` }};

        const submit = () => {
            return axios.post('api/user/edit-customer', v, config)
            .then(() => editSuccessModal())
            .catch(err => {
                console.log(err);
                if(err.response.status === 401) _logout(updateAuth);
                else editFailModal();
            })
        }
        editConfirmModal(submit);
    }

    const submitNewPassword = v => {
        const submit = () => {
            const config = { headers:{ authorization : `Bearer ${auth.access_token}` }};

            return axios.post('api/user/change-password', {
                new_password: v.new_password, 
                verify_password: v.verify_password
            }, config)

            .then(() => changePasswordSuccess())
            .catch(err => {
                if(err.response.status === 401) _logout(updateAuth);
                else if(err.response.status === 400){
                    form2.setFields([{
                            name: 'verify_password',
                            errors: ['Cannot use old password!'],
                    }]);
                }
                else if(err.response.status === 403){
                    form2.setFields([{
                            name: 'verify_password',
                            errors: ['Password incorrect!'],
                        }]);
                }
                else editFailModal();
            });
        }
        changePasswordConfirmModal(submit);
    }

    return(
        <>
            <div className="page-title-holder fill">
                <h2>Edit Customer Details</h2>
            </div>

            <div className="container flex-horizontal-box-container">
            {
                loading
                ?
                <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-12" style={{textAlign: 'center'}}>
                    <Spin size='large'/>
                </div>
                :
                error
                ?
                <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1>
                :<>
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-6 div-box box-shadow">
                        <h3>Customer Information</h3>
                        <Form  {...layout} form={form} onFinish={submitEdit}>
                            <Form.Item
                                label="First Name"
                                name="first_name"
                                rules={[
                                    {
                                        whitespace: true,
                                        required: true, 
                                        message: 'Please input your first name!' 
                                    }
                                ]}
                            >
                                <Input maxLength={50}/>
                            </Form.Item>

                            <Form.Item
                                label="Last Name"
                                name="last_name"
                                rules={[
                                    {
                                        whitespace: true,
                                        required: true, 
                                        message: 'Please input your last name!' 
                                    }
                                ]}
                            >
                                <Input maxLength={50}/>
                            </Form.Item>

                            <Form.Item
                                label="Phone"
                                name="mobile"
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
                                <Input maxLength={10} onChange={e => {onlyNumbers(e, form, 'mobile')}}/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button style={{float:'right'}} type="primary" htmlType="submit">Edit</Button>
                            </Form.Item>
                        </Form>
                    </div>

            
                    <div className="box-item-xs-12 box-item-sm-12 box-item-md-12 box-item-lg-12 box-item-xl-6 div-box box-shadow">
                        <h3>Change password</h3>
                        <Form  {...layout} onFinish={submitNewPassword} form={form2}>
                            <Form.Item
                                label="Old Password"
                                name="verify_password"
                                rules={[
                                    {
                                        whitespace: true,
                                        required: true, 
                                        message: 'Please input your old password!' 
                                    }
                                ]}
                            >
                                <Input.Password maxLength={30}/>
                            </Form.Item>

                            <Form.Item
                                label="New Password"
                                name="new_password"
                                validateTrigger={['onBlur']}
                                rules={[
                                    {
                                        whitespace: true,
                                        required: true, 
                                        message: 'Please input your new password!' 
                                    },
                                    {
                                        validator: async (_, new_password) => {
                                            if(!checkPasswordStrength(new_password) && new_password !== undefined && !isWhiteSpace(new_password)){
                                                return Promise.reject(new Error('Password not strong enough!'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input.Password maxLength={30}/>
                            </Form.Item>

                            <Form.Item
                                label="Confirm password"
                                name="password_confirm"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your password!',
                                        whitespace: true
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if(getFieldValue('new_password') === value || value === undefined) return Promise.resolve();
                                            if(isWhiteSpace(value)) return Promise.resolve();
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                        validateTrigger: 'onSubmit'
                                    })
                                ]}
                            >
                                <Input.Password maxLength={30}/>
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button style={{float: 'right'}} type="primary" htmlType="submit">Edit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </>
            }
            </div>
        </>
    );
}

export default EditCustomer;