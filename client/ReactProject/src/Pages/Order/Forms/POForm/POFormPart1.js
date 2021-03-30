import MODE from '../../Helpers/PageConstants';
import { poNumberUnique, getCustomer } from '../../APIFunctions/MockAPIFunctions';
import { emailDoesNotExist } from '../../Helpers/Modals';
import { Form, Input, DatePicker, Select } from 'antd';

const POFormPart1 = props => {

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

    const updateOrderDate = value => {
        const temp_order = {...props.order};
        temp_order.issued_date = value;
        props.setOrder(temp_order);
    }

    //Auto fills customer details if email exists
    const autoFillEmail = c_email => {
        if(c_email !== ""){
            const cust = getCustomer(c_email);
            if(Object.keys(cust).length !== 0 || cust.constructor !== Object) props.form_2.setFieldsValue(cust);
            else{
                emailDoesNotExist();
                props.form_2.resetFields();
            } 
        }
    }

    const initialValues = {
        po_number: props.orderOriginal.po_number,
        c_email:  props.orderOriginal.c_email,
        issued_date:  props.orderOriginal.issued_date,
        status:  props.orderOriginal.status,
        tracking_number:  props.orderOriginal.tracking_number,
        carrier:  props.orderOriginal.carrier,
        items: props.orderOriginal.items 
    }



    //First section of the form if in edit mode
    const section_1_a = (
        <>
            <div className="view-order-field-header">Purchase Order Number</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_number}</div>
            <Form.Item hidden name="po_number"><Input/></Form.Item>

            <div className="view-order-field-header">Customer Email</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.c_email}</div>
            <Form.Item hidden name="c_email"><Input/></Form.Item> 
        </>
    );
    
    //First section of the form if in add mode
    const section_1_b = (
        <>
            <div className="view-order-field-header">Purchase Order Number</div>
            <Form.Item 
                name="po_number"
                rules={[
                    {
                        required: true,
                        validateTrigger: 'onSubmit',
                        message: 'Please enter a purchase order number'
                    },
                    {
                        validateTrigger: 'onSubmit',
                        validator: async (_, value) => {
                            if (!poNumberUnique(value)){
                                return Promise.reject(new Error("PO Number already exists"));
                            } 
                        }
                    }
                ]}
            >
                <Input maxLength={100} style={{width: "500px"}}/>
            </Form.Item>
            
            <div className="view-order-field-header">Customer Email</div>
            <Form.Item 
                name="c_email"
                rules={[
                    {
                        required: true,
                        validateTrigger: 'onSubmit',
                        message: 'Please enter a purchase order number'
                    }
                ]}
            >
                <Input.Search 
                    placeholder="Search existing customer to auto-fill details"
                    onSearch={autoFillEmail}
                    maxLength={100} 
                    style={{width: "500px"}}
                />  
            </Form.Item>
        </>
    );

    return(
        <Form initialValues={initialValues} form = {props.form} >
            {props.mode === MODE.EDIT   ?   section_1_a   :   <></>}
            {props.mode === MODE.ADD    ?   section_1_b   :   <></>}

            <div className="view-order-field-header">Issue Date</div>
            <Form.Item name="issued_date">
                    <DatePicker onChange={updateOrderDate} format="DD/MM/YYYY" style={{width: "500px"}} />
            </Form.Item>

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
                    <Select.Option value="New">New</Select.Option>                         
                    <Select.Option value="On Hold">On Hold</Select.Option>
                    <Select.Option value="In Transit">In Transit</Select.Option>
                    <Select.Option value="Complete">Complete</Select.Option>
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
    );
}

export default POFormPart1;


