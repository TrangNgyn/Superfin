import { onlyNumbers } from '../../Helpers/NumberOnlyFunctions';
import { Form, Input, Tooltip } from 'antd';

const CustomerForm = props => {
    return(
        <Tooltip
            trigger={['focus']}
            title="Please be aware that when applied to an existing customer email, editing the right hand fields will edit that customer's actual profile"
            placement="topLeft"
        >
            <Form onChange={() => { props.onChange(true)}} initialValues={props.initialValues} form={props.form}>
                    <Form.Item hidden name="email"><Input/></Form.Item>  

                    <div className="view-order-field-header">First Name</div>
                    <Form.Item 
                        name="first_name"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a first name',
                            }
                        ]}
                    >
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>
        
                    <div className="view-order-field-header">Last Name</div>
                    <Form.Item 
                        name="last_name"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a last name',
                            }
                        ]}
                    >
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>  

                    <div className="view-order-field-header">Attention to</div>
                    <Form.Item name="po_attention_to">
                        <Input maxLength={200} style={{width: "500px"}} />
                    </Form.Item>
    
            
                    <div className="view-order-field-header">Address Line 1</div>
                    <Form.Item 
                        name="po_address_line1"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input an address',
                            }
                        ]}
                    >
                        <Input maxLength={200} style={{width: "500px"}} />
                    </Form.Item>

                    <div className="view-order-field-header">Address Line 2</div>
                    <Form.Item name="po_address_line2">
                        <Input maxLength={200} style={{width: "500px"}} />
                    </Form.Item>
            
        
                    <div className="view-order-field-header">Suburb</div>
                    <Form.Item 
                        name="po_suburb"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a suburb',
                            }
                        ]}
                    >
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>
                
            
                    <div className="view-order-field-header">State</div>
                    <Form.Item 
                        name="po_state"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a state',
                            }
                        ]}
                    >
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>

                    <div className="view-order-field-header">Post Code</div>
                    <Form.Item 
                        name="po_postal_code"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a postal code',
                            }
                        ]}
                    >                                                   
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>
                    
                    <div className="view-order-field-header">Country</div>
                    <Form.Item 
                        name="po_country"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a country',
                            }
                        ]}
                    >
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>

                    <div className="view-order-field-header">Phone Number</div>
                    <Form.Item 
                        name="mobile_number"
                        rules={[
                            {
                                validateTrigger: 'onSubmit',
                                validator: async (_, value) => {
                                    if (isNaN(value)){
                                        return Promise.reject(new Error("Must be a number"));
                                    } 
                                }
                            }
                        ]}
                    >
                        <Input maxLength={100} onChange={e => onlyNumbers(e, props.form, "mobile_number")} style={{width: "500px"}} />
                    </Form.Item>
                </Form>
        </Tooltip>
    );
}

export default CustomerForm;