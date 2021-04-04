import MODE from '../../Helpers/PageConstants';
import { Form, Input, Select } from 'antd';

const POForm1 = props => {
    const date = new Date(props.orderOriginal.issued_date);
    const date_S = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;




    //These update functions update the order state when edits are made
    const updateOrderText = e => {
        const field = e.target.id;
        if(props.order[field] !== e.target.value){
            const temp_order = {...props.order};
            temp_order[field] = e.target.value;
            props.setOrder(temp_order); 
        }      
    }

    const updateOrderSelect = value => {
        const temp_order = {...props.order};
        temp_order.status = value;
        props.setOrder(temp_order); 
    }
    



    //First section of the form if in edit mode
    const section_1_a = (
        <>
            <div className="view-order-field-header">Purchase Order Number</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_number}</div>
            <Form.Item hidden name="po_number"><Input/></Form.Item>

            <div className="view-order-field-header">Issued Date</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{date_S}</div>

            <div className="view-order-field-header">Customer Email</div>
            <Form.Item 
                name="c_email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        validateTrigger: 'onSubmit',
                        message: 'Please enter a valid email'
                    }
                ]}
            >
                <Input 
                    onBlur={updateOrderText}
                    maxLength={100} 
                    style={{width: "500px"}}
                />  
            </Form.Item>
        </>
    );
    
    //First section of the form if in add mode
    const section_1_b = (
        <>
            <div className="view-order-field-header">Customer Email</div>
            <Form.Item 
                name="c_email"
                rules={[
                    {
                        required: true,
                        type: 'email',
                        validateTrigger: 'onSubmit',
                        message: 'Please enter a valid email'
                    }
                ]}
            >
                <Input 
                    onBlur={updateOrderText}
                    maxLength={100} 
                    style={{width: "500px"}}
                />  
            </Form.Item>
        </>
    );





    return(
        <>
            <div className="view-order-column">
                <Form form = {props.form} >
                    {props.mode === MODE.EDIT   ?   section_1_a   :   <></>}
                    {props.mode === MODE.ADD    ?   section_1_b   :   <></>}

                    <div className="view-order-field-header">Status</div>
                    <Form.Item
                        name="status" 
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please select order status',
                            }
                        ]}
                    >
                        <Select onChange={updateOrderSelect} style={{width: "500px", textAlign: "left"}}>
                            <Select.Option value="NEW">New</Select.Option>                         
                            <Select.Option value="SHIPPED">Shipped</Select.Option>
                            <Select.Option value="COMPLETE">Complete</Select.Option>
                        </Select>
                    </Form.Item>
                    
                    <div className="view-order-field-header">Carrier</div>
                    <Form.Item name="carrier">
                        <Input onBlur={updateOrderText} maxLength={100} style={{width: "500px"}}/>
                        </Form.Item>  

                    <div className="view-order-field-header">Tracking Number</div>
                    <Form.Item name="tracking_number">
                        <Input onBlur={updateOrderText} maxLength={100} style={{width: "500px"}}/>
                    </Form.Item>    
                </Form>
            </div>

            <div className="view-order-column">
                <Form onBlur={updateOrderText} form={props.form} >
                    <div className="view-order-field-header">Address Line 1</div>
                    <Form.Item 
                        name="po_address_line1"
                        rules={[
                            {
                                whitespace: true,
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

                    <div className="view-order-field-header">Attention to</div>
                    <Form.Item name="po_attention_to">
                        <Input maxLength={200} style={{width: "500px"}} />
                    </Form.Item>

                    <div className="view-order-field-header">Suburb</div>
                    <Form.Item 
                        name="po_suburb"
                        rules={[
                            {
                                whitespace: true,
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
                                whitespace: true,
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
                                whitespace: true,
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
                                whitespace: true,
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a country',
                            }
                        ]}
                    >
                        <Input maxLength={100} style={{width: "500px"}} />
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default POForm1;