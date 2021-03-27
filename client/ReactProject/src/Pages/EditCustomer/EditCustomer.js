import '../../_assets/CSS/pages/EditCustomer/EditCustomer.css';

import { layout, tailLayout } from './FormLayout';
import { onlyNumbers } from '../../_services/SharedFunctions';

import { Input, Form, Button } from 'antd';
import { useForm } from 'antd/lib/form/Form';





const EditCustomer = () => {
    const [form] = useForm();



    

    const onFinish = values => {
        console.log(values);
    }





    return(
        <div>
            <div id="edit-customer-header">Edit Customer Details</div>

            <div style={{paddingLeft: '10%', paddingBottom: '2%'}}>
                <Input.Search placeholder="Look Up Customer Email" allowClear enterButton style = {{width:'300px'}}/>
            </div>

            <div style={{textAlign: 'center', paddingBottom: '2%'}}>
                <h2>Customer Information</h2>
            </div>

            <div style={{fontWeight: 'bold'}}>
                <Form 
                    {...layout}
                    form={form}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="First Name"
                        name="first_name"
                        rules={[
                            {
                                whitespace: true,
                                required: true, 
                                message: 'Please input customers first name!' 
                            }
                        ]}
                    >
                        <Input style={{width: '500px'}}/>
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="last_name"
                        rules={[
                            {
                                whitespace: true,
                                required: true, 
                                message: 'Please input customers last name!' 
                            }
                        ]}
                    >
                        <Input style={{width: '500px'}}/>
                    </Form.Item>

                    <Form.Item
                        label="Mobile Number"
                        name="mobile_number"
                        rules={[
                            {
                                whitespace: true,
                                required: true, 
                                message: 'Please input customers mobile number' 
                            }
                        ]}
                    >
                        <Input onChange={e => {onlyNumbers(e, form, 'mobile_number')}} style={{width: '500px'}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit"> Set Customer Informaion</Button>
                    </Form.Item>
                </Form>
            </div>
            
        </div>
    );
}

export default EditCustomer;