import MODE from '../../Helpers/PageConstants';
import { poNumberUnique } from '../../APIFunctions/MockAPIFunctions';
import { Form, Input, DatePicker, Select, Button } from 'antd';

const POFormPart1 = props => {

    console.log("Reander POForm Part 1");
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

    const initialValues = {
        po_number: props.orderOriginal.po_number,
        c_email:  props.orderOriginal.c_email,
        issued_date:  props.orderOriginal.issued_date,
        status:  props.orderOriginal.status,
        tracking_number:  props.orderOriginal.tracking_number,
        carrier:  props.orderOriginal.carrier,
        items: props.orderOriginal.items 
    }

  
    
    
    

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
                    onSearch={props.onSearch}
                    maxLength={100} 
                    style={{width: "500px"}}
                />  
            </Form.Item>
        </>
    );





    

    return(
        <>
        <Form onChange={() => {props.onChange(true)}} initialValues={initialValues} form = {props.form} >
            {props.mode === MODE.EDIT   ?   section_1_a   :   <></>}
            {props.mode === MODE.ADD    ?   section_1_b   :   <></>}

            <div className="view-order-field-header">Issue Date</div>
            <Form.Item name="issued_date">
                    <DatePicker onChange={(value) => {
                        props.onChange(true);
                        updateOrderDate(value);
                    }} format="DD/MM/YYYY" style={{width: "500px"}} />
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
                <Select onChange={(value) => { 
                        props.onChange(true);
                        updateOrderSelect(value);
                    }} style={{width: "500px", textAlign: "left"}}>
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
   
        </>
    );
}

export default POFormPart1;


