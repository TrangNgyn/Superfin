import MODE from '../../Helpers/PageConstants';
import { poNumberUnique } from '../../APIFunctions/MockAPIFunctions';
import { Form, Input, DatePicker, Select } from 'antd';

const POFormPart1 = props => {

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
        <Form onChange={() => {props.onChange(true)}} initialValues={props.initialValues} form = {props.form}>
            {props.mode === MODE.EDIT   ?   section_1_a   :   <></>}
            {props.mode === MODE.ADD    ?   section_1_b   :   <></>}

            <div className="view-order-field-header">Issue Date</div>
            <Form.Item name="issued_date">
                    <DatePicker onChange={() => {props.onChange(true)}} format="DD/MM/YYYY" style={{width: "500px"}} />
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
                <Select onChange={() => {props.onChange(true)}} style={{width: "500px", textAlign: "left"}}>
                    <Select.Option value="New">New</Select.Option>                         
                    <Select.Option value="On Hold">On Hold</Select.Option>
                    <Select.Option value="In Transit">In Transit</Select.Option>
                    <Select.Option value="Complete">Complete</Select.Option>
                </Select>
            </Form.Item>
            
            <div className="view-order-field-header">Carrier</div>
            <Form.Item name="carrier">
                <Input maxLength={100} style={{width: "500px"}}/>
            </Form.Item>  

            <div className="view-order-field-header">Tracking Number</div>
            <Form.Item name="tracking_number">
                <Input maxLength={100} style={{width: "500px"}}/>
            </Form.Item>    
        </Form>
    );
}

export default POFormPart1;


