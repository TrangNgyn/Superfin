import MODE from '../../Helpers/PageConstants';
import { Form, Input, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { onlyNumbers } from '../../Helpers/NumberOnlyFunctions';
import { showDeleteConfirm } from '../../Helpers/Modals';

const POFormPart2 = props => {
    console.log("Reander POForm Part 2");

    const updateOrder = () => {
        if(JSON.stringify(props.order.items) !== JSON.stringify(props.form.getFieldValue('items'))){
            const temp_order = {...props.order};
            temp_order.items = props.form.getFieldValue('items');
            props.setOrder(temp_order);
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


    const itemRow = props.order.items.map((item, index) => {
            return (
                <tr key = {item.item_code} className="view-order-table-row">
                    <td>{item.item_name}</td>
                
                    <td>
                        {item.item_code}
                        <Form.Item hidden name={['items', index, 'item_code']} initialValue="hello"><Input /></Form.Item>
                    </td>
    
                    <td>
                        {props.mode===MODE.EDIT || props.mode===MODE.ADD
                            ?   <Form.Item 
                                    name={['items', index, 'quantity']}
                                    rules={[
                                        {
                                            required: true,
                                            validateTrigger: 'onSubmit',
                                            message: 'Please input a required quantity',
                                        },
                                        {
                                            validateTrigger: 'onSubmit',
                                            validator: async (_, value) => {
                                                if (Number(value) === 0){
                                                    return Promise.reject(new Error("Cannot have value of 0"));
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
                        ?   <td onClick={() => showDeleteConfirm(index, props.deleteOrderItem)}><DeleteOutlined className="view-order-icon"/></td> 
                        :   <></>
                    }     
                </tr>
            ); 
        })
    


     //For rendering the individual rows in the item list

   
    
    return(
        <Form initialValues={initialValues} onChange={() => { props.onChange(true)}} onBlur={updateOrder} form={props.form}>
            <table style={{width:"100%", textAlign: "center", tableLayout: "fixed"}}>
                <tbody>
                    <tr style = {{border: "solid black 1px"}}>
                        <th>Product Name</th>
                        <th>Item Code</th> 
                        <th>Quantity</th>
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

export default POFormPart2;