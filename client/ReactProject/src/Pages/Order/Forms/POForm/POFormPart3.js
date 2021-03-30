import { Form, Input } from 'antd';

const POFormPart3 = props => {

    //updates the customer state when ever edits are made
    const updateOrder = e => {
        const field = e.target.id;
        if(props.customer[field] !== e.target.value){
            const temp_customer = {...props.customer};
            temp_customer[field] = e.target.value;
            props.setOrder(temp_customer); 
        }      
    }

    const initialValues = {
        po_attention_to: props.customerOriginal.po_attention_to,
        po_address_line1: props.customerOriginal.po_address_line1,
        po_address_line2: props.customerOriginal.po_address_line2,
        po_suburb: props.customerOriginal.po_suburb,
        po_state: props.customerOriginal.po_state,
        po_postal_code: props.customerOriginal.po_postal_code,
        po_country: props.customerOriginal.po_country,
        mobile_number: props.customerOriginal.mobile_number
    }

    return(
            <Form onBlur={updateOrder} initialValues={initialValues} form={props.form} >

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
                </Form>
    );
}

export default POFormPart3;