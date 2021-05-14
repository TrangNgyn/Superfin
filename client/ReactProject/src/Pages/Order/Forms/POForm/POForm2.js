import MODE from '../../Helpers/PageConstants';
import { Form, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { onlyNumbers } from '../../../../_services/SharedFunctions';
import { showDeleteConfirm } from '../../Helpers/Modals';

const POForm2 = props => {
    /*const initialValues_form1 = {
        po_number: props.orderOriginal.po_number,
        c_email:  props.orderOriginal.c_email,
        issued_date:  props.orderOriginal.issued_date,
        status:  props.orderOriginal.status,
        tracking_number:  props.orderOriginal.tracking_number,
        carrier:  props.orderOriginal.carrier,
        items: props.orderOriginal.items,
        po_attention_to: props.orderOriginal.po_attention_to,
        po_address_line1: props.orderOriginal.po_address_line1,
        po_address_line2: props.orderOriginal.po_address_line2,
        po_suburb: props.orderOriginal.po_suburb,
        po_state: props.orderOriginal.po_state,
        po_postcode: props.orderOriginal.po_postcode,
        po_country: props.orderOriginal.po_country,
        mobile_number: props.orderOriginal.mobile_number
    }*/





    //updates the order state when changes are made
    const updateOrder = () => {
        if(JSON.stringify(props.order.items) !== JSON.stringify(props.form.getFieldValue('items'))){
            const temp_order = {...props.order};
            temp_order.items = props.form.getFieldValue('items');
            props.setOrder(temp_order);
        }
    }

    //deletes specific order items
    const deleteOrderItem = index => {
        const new_items = [...props.order.items];
        new_items.splice(index, 1);

        const new_order = {...props.order};
        new_order.items = new_items;
        
        props.setOrder(new_order);
    }





    //Dynamic production of item forms
    const itemRow = props.order.items.map((item, index) => {
        return (
            <tr key = {item.item_code} className="view-order-table-row">
                <td>
                    {item.item_code}
                    <Form.Item hidden name={['items', index, 'item_code']} ><Input /></Form.Item>
                </td>

                <td>
                    {props.mode===MODE.EDIT || props.mode===MODE.ADD
                        ?   <Form.Item 
                                name={['items', index, 'quantity']}
                                rules={[
                                    {
                                        validateTrigger: 'onSubmit',
                                        validator: async (_, value) => {
                                            if (Number(value) === 0){
                                                return Promise.reject(new Error("Please enter a value greater than 0"));
                                            } 
                                        }
                                    }
                                ]}  
                            >
                                <Input maxLength={4} onChange={e => onlyNumbers(e, props.form, "items", index, 'quantity')} style={{width: "50px"}} />
                            </Form.Item>
                        :   item.quantity                    
                    } 
                </td>

                <td>
                    {props.mode===MODE.EDIT || props.mode===MODE.ADD
                        ?   <Form.Item name ={['items', index, 'special_requirements']}>
                                <Input.TextArea maxLength={500} style={{width: "500px"}} />
                            </Form.Item>
                        :   item.special_requirements
                    } 
                </td>
                {props.mode===MODE.EDIT || props.mode===MODE.ADD
                    ?   <td onClick={() => showDeleteConfirm(index, deleteOrderItem)}><DeleteOutlined className="view-order-icon"/></td> 
                    :   <></>
                }     
            </tr>
        ); 
    })





    return(
        <Form onBlur={updateOrder} form={props.form}>
            <table id="view-order-table-wrapper" className="center-content">
                <tbody>
                    <tr style = {{border: "solid black 1px"}}>
                        <th><span style={{color: 'red'}}>*</span>Item Code</th> 
                        <th><span style={{color: 'red'}}>*</span>Quantity</th>
                        <th>Special Requirements</th>
                        {props.mode===MODE.EDIT || props.mode===MODE.ADD 
                            ?   <th onClick = {() => {props.onClick(true)}} className="view-order-icon" style ={{fontSize: "30px"}}>+</th>
                            : <></>
                        }
                    </tr>
                    
                   {itemRow}  
                </tbody>
            </table>
        </Form>
    )
}

export default POForm2;