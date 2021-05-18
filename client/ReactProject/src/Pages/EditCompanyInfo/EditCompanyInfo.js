import '../../_assets/CSS/pages/EditCompanyInfo/EditCompanyInfo.css';

import { Form, Input, Button, Spin } from 'antd';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUpdate, useAuth } from '../../SharedComponents/AuthContext/AuthContext'; 
import { layout, tailLayout } from './FormLayout';
import { setFormValues } from './Functions';
import { errorLoading, confirmEdit } from './Modals';


const EditCompanyInfo = () => {

    const [form] = Form.useForm();
    const [companyInfo, setCompanyInfo] = useState(null);
    const [dataLoading, setDataLoading] = useState(true);
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    useEffect(() => {
        axios.get('/api/aboutus/')
        .then(res => {
            setCompanyInfo(res.data);
            setFormValues(res.data, form);
            setDataLoading(false);
        })
        .catch(err => {
            console.log(err);
            errorLoading();
            setDataLoading(false);
        })
    }, [form]);





    //form functions
    const onFinish = newInfo => {
        newInfo.c_about = "_";                 //about us has been removed. This stops backend from breaking
        if(JSON.stringify(newInfo) !== JSON.stringify(companyInfo)){
            confirmEdit(newInfo, auth.access_token, updateAuth);
        } 
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    




    return (
        <div>
            <h1 className="eci-text">Edit Company Information</h1>

            <p className="eci-text">The input fields contain the current company information. Edit these fields if you wish to make changes.</p>

            {
                dataLoading
                ?   <div style = {{textAlign: 'center'}}>
                        <Spin size = 'large' />
                        <h3 style = {{color: '#EB6E00'}}>Data Loading</h3>
                    </div>
                :   <Form
                        {...layout}
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style = {{fontWeight: "bold"}}
                        validateTrigger = 'onSubmit'
                    >
                        <Form.Item 
                            label="Company Number" 
                            name="c_number"
                            rules={[{
                                whitespace: true, 
                                required: true, 
                                message: 'Please provide data' 
                            }]}
                        >
                            <Input style = {{width: "500px"}} maxLength={20}/>
                        </Form.Item>

                        <Form.Item 
                            label="Company Address" 
                            name="c_address"
                            rules={[{
                                whitespace: true, 
                                required: true, 
                                message: 'Please provide data' 
                            }]}
                        >
                            <Input style = {{width: "500px"}} maxLength={500}/>
                        </Form.Item>

                        <Form.Item 
                            label="Company Email" 
                            name="c_email"
                            rules={[{
                                whitespace: true, 
                                required: true, 
                                message: 'Please provide data' 
                            }]}
                        >
                            <Input  style = {{width: "500px"}} maxLength={50}/>
                        </Form.Item>

                        <Form.Item 
                            label="Terms and Conditions" 
                            name="c_TandC"
                            rules={[{
                                whitespace: true, 
                                required: true, 
                                message: 'Please provide data' 
                            }]}
                        >
                            <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                        </Form.Item>

                        <Form.Item 
                            label="Delivery and Dispatch" 
                            name="c_delivery"
                            rules={[{
                                whitespace: true, 
                                required: true, 
                                message: 'Please provide data' 
                            }]}
                        >
                            <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                        </Form.Item>

                        <Form.Item 
                            label="Company Blog" 
                            name="c_blog"
                            rules={[{
                                whitespace: true, 
                                required: true, 
                                message: 'Please provide data' 
                            }]}
                        >
                            <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                        </Form.Item>
                        
                        {
                            companyInfo !== null
                            ?   <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit"> Set Company Information </Button>
                                </Form.Item>
                            : <></>
                        } 
                    </Form>
            }  
        </div>
    );
}

export default EditCompanyInfo;