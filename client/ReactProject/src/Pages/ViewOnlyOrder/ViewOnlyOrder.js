import '../../_assets/CSS/pages/ViewOnlyOrder/ViewOnlyOrder.css';
import { Form, Input, Button, DatePicker, Select, Modal} from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';




//IMPORTANT
/*
    Select.Options may need to be changed. The values there are just palceholders
    Post code may need to only except numbers. Waiting on backends response
    When adding an item, will need to check if item exists first
*/


//Work to do
/*
    Do a check to make sure there are items in the item array before submitting 
    CSS stuff
    Put rules on fields
    Put character limits on fields
    Make sure warning errors on fields timeout 
*/



//Mock data stuff
const getItemName = item_code => {
    //search for the name using item_code
    return "Product Name" + item_code;
}

const getMockOrder = po_number => {
    //Do a check to make sure the po_number can be found

    const order = {
        po_number:"123abc",
        c_email:"superfin@gmail.com",
        issued_date: new Date(),
        status:"new",
        items: [{
                    item_code:"123abc",
                    quantity:"10",
                    special_requirements:"Add picture of happy dog"
                },
                {
                    item_code:"456def",
                    quantity:"4",
                    special_requirements:"Do not include lids"
                },
                {
                    item_code:"789ghi",
                    quantity:"7",
                    special_requirements:"I want these in red"
                },
                {
                    item_code:"012jkl",
                    quantity:"100",
                    special_requirements:""
                },
            
            ],
        trackingNumber:"123abcdef456",
        carrier:"Fastway"
    }

    order.items.forEach(i => {
        i.item_name = getItemName(i.item_code);
    });

    return order;
}

const getCustomer = c_email => {
    //do a check to make sure the customer can be found
    return {
        email:"superfin@gmail.com",
        first_name:"Mr",
        last_name:"Finn",
        po_attention_to:"Leave by the front door",
        po_address_line1:"3 Happy Street",
        po_address_line2:"4 NotHappy Ave",
        po_suburb:"West Sydney",
        po_state:"NSW",
        po_postal_code:"2000",
        po_country:"Australia",
        mobile_number: "123 a^^4&*5  6)(7"
    }
}













const ViewOnlyOrder = () => {
    const { po_number } = useParams();

    const [order, setOrder] = useState(getMockOrder(po_number));
    const [customer, setCustomer] = useState(getCustomer(order.c_email));
    const [editedOrder, setEditedOrder] = useState(false);
    const [editedCustomer, setEditedCustomer] = useState(false);
    const [newItemFormVisible, setNewItemFormVisible] = useState(false);


    const [form_1] = Form.useForm();
    const [form_2] = Form.useForm();
    const [form_3] = Form.useForm();








    useEffect(() => {
        let items = [...order.items]
        form_1.setFieldsValue({items: items});
    })

    const handleSubmit = () => {
        if(editedOrder){
            form_1.validateFields()
            .then((values) => {
                //submit form 1 details
                console.log(values); 
            })
            .catch((errorInfo) => {
                //catch error
                console.log(errorInfo);
            });
        }
        if(editedCustomer){
            form_2.validateFields()
            .then((values) => {
                //submit form 2 details
                console.log(values); 
            })
            .catch((errorInfo) => {
                //catch error 
                console.log(errorInfo);
            });
        } 
    }

    //function that removes item from order and updates the state
    const deleteOrderItem = index => {
        const new_items = [...order.items];
        new_items.splice(index, 1);

        const new_order = {...order};
        new_order.items = new_items;
                    
        setOrder(new_order);
        setEditedOrder(true);
    }

    //Modal to deleting Order Item
    function showDeleteConfirm(index) {
        Modal.confirm({
            title: 'Warning!',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this item from this order?',
            okText: 'Delete',
            cancelText: 'No',

            onOk() { deleteOrderItem(index) },
            onCancel() { console.log('Cancel') },
        });
    }

    const addItem = () => {
        form_3.validateFields()
            .then((new_item) => {
                console.log(new_item);
                new_item.item_name = getItemName(new_item.item_code);
                const new_items = [...order.items];
                new_items.push(new_item);

                const new_order = {...order};
                new_order.items = new_items;

                setOrder(new_order);
                setEditedOrder(true);
                setNewItemFormVisible(false); 
            })
            .catch((errorInfo) => {
                //catch error 
                console.log(errorInfo);
            });
    }


    //Modal for confirming edits
    function showEditConfirmation() {
        Modal.confirm({
            title: 'Edits have been made to this order!',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you you want to submit these edits?',
            okText: 'Make Edits',
            cancelText: 'Cancel',

            onOk() { handleSubmit() },
            onCancel() { console.log('Cancel') },
        });
    }

    //handling number only fields
    const makeNumber = str => {
        for(let i = 0; i < str.length; i++){
            if(isNaN(str[i]) || str[i]===" "){
                str = str.substring(0, i) + str.substring(i+1, str.length);
                i--;
            }
        }
        return str;
    }

    const onlyNumbers = (e, form, field, index, subfield) => {
        const reg = /^[0-9]*$/;
        const str = e.target.value;
        let field_obj = new Object();

        if(typeof index !== 'undefined'){
            let arr = form.getFieldValue(field);
            let sub_obj = arr[index];
            
            if (str === '' || reg.test(str)) sub_obj[subfield] = str;  
            else {
                if(!reg.test(str[str.length - 1])){
                    const sub_str = str.substring(0, str.length - 1);
                    sub_obj[subfield] = sub_str;
                }
                else sub_obj[subfield] = makeNumber(str);
            }
            field_obj[field] = arr;
            form.setFieldsValue(field_obj);
        }

        else{
            if (str === '' || reg.test(str)) field_obj[field] = str;     
            else {
                if(!reg.test(str[str.length - 1])){
                    const sub_str = str.substring(0, str.length - 1);
                    field_obj[field] = sub_str;
                }
                else field_obj[field] = makeNumber(str); 
            }
            form.setFieldsValue(field_obj);
        }  
    }

    



    

    const itemRow = order.items.map((item, index) => {
        return (
            <tr key = {item.item_code} className="view-order-table-row">
                <td>{item.item_name}</td>
            
                <td>
                    {item.item_code}
                    <Form.Item hidden name={['items', index, 'item_code']}>
                        <Input/>
                    </Form.Item>
                </td>

                <td>
                    <Form.Item name={['items', index, 'quantity']}>
                        <Input onChange={e => onlyNumbers(e, form_1, "items", index, 'quantity')} style={{width: "50px"}} />
                    </Form.Item>
                </td>

                <td>
                    <Form.Item name ={['items', index, 'special_requirements']}>
                        <Input.TextArea style={{width: "500px"}} />
                    </Form.Item>
                </td>
    
                <td onClick={() => showDeleteConfirm(index)}><DeleteOutlined className="view-order-icon"/></td>   
            </tr>
        ); 
    });











    const form_1_init_values = {
        po_number: order.po_number,
        c_email: order.c_email,
        issue_date: moment(order.issued_date),
        status: order.status,
        tracking_number: order.trackingNumber,
        carrier: order.carrier,
    }

    const form_2_init_values = {
        email: customer.email,
        first_name: customer.first_name,
        last_name: customer.last_name,
        po_attention_to: customer.po_attention_to,
        po_address_line1: customer.po_address_line1,
        po_address_line2: customer.po_address_line2,
        po_suburb: customer.po_suburb,
        po_state: customer.po_state,
        po_postal_code: customer.po_postal_code,
        po_country: customer.po_country,
        mobile_number: customer.mobile_number
    }
    










    return (
        <div>
            <h1 className="view-order-text">Order Details</h1>

            <div>
                <div id="view-order-row">
                    <div className="view-order-column">
                        <Form onChange={() => {setEditedOrder(true)}} initialValues={form_1_init_values} form = {form_1}>
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Purchase Order Number:</div>
                            <div style={{width: "500px", margin: "auto", textAlign: "left", paddingBottom: "20px"}}>{order.po_number}</div>
                            <Form.Item hidden name="po_number"><Input/></Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Customer Email</div>
                            <div style={{width: "500px", margin: "auto", textAlign: "left", paddingBottom: "20px"}}>{customer.email}</div>
                            <Form.Item hidden name="c_email"><Input/></Form.Item> 

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Issue Date</div>
                            <Form.Item name="issue_date">
                                <DatePicker onChange={() => {setEditedOrder(true)}} format="YYYY/MM/DD" style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Status</div>
                            <Form.Item name="status" >
                                <Select onChange={() => {setEditedOrder(true)}} style={{width: "500px", textAlign: "left"}}>
                                    <Select.Option value="new">New</Select.Option>                         
                                    <Select.Option value="on_hold">On Hold</Select.Option>
                                    <Select.Option value="in_transit">In Transit</Select.Option>
                                    <Select.Option value="complete">Complete</Select.Option>
                                </Select>
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Tracking Number</div>
                            <Form.Item name="tracking_number">
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Carrier</div>
                            <Form.Item name="carrier">
                                <Input style={{width: "500px"}} />
                            </Form.Item>               
                        </Form>
                    </div>
                    
                    <div className="view-order-column">
                    <Form onChange={() => {setEditedCustomer(true)}} initialValues={form_2_init_values} form={form_2}>
                            <Form.Item hidden name="email"><Input/></Form.Item>  

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>First Name</div>
                            <Form.Item name="first_name">
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Last Name</div>
                            <Form.Item name="last_name">
                                <Input style={{width: "500px"}} />
                            </Form.Item>  

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Attention to</div>
                            <Form.Item name="po_attention_to">
                                <Input style={{width: "500px"}} />
                            </Form.Item>
            
                    
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Address Line 1</div>
                            <Form.Item name="po_address_line1">
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Address Line 2</div>
                            <Form.Item name="po_address_line2">
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                    
                
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Suburb</div>
                            <Form.Item name="po_suburb">
                                <Input style={{width: "500px"}} />
                            </Form.Item>
                        
                    
                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>State</div>
                            <Form.Item name="po_state">
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Post Code</div>
                            <Form.Item name="po_postal_code">                                                   
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Country</div>
                            <Form.Item name="po_country">
                                <Input style={{width: "500px"}} />
                            </Form.Item>

                            <div style={{width: "500px", margin: "auto", textAlign: "left"}}>Phone Number</div>
                            <Form.Item name="mobile_number">
                                <Input onChange={e => onlyNumbers(e, form_2, "mobile_number")} style={{width: "500px"}} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div style={{textAlign: "center", margin: "50px"}}>
                    <Button type="primary" onClick={() => {
                        if(editedOrder || editedCustomer){
                            showEditConfirmation();
                        }
                    }} style={{width: "500px", fontWeight: "bold"}}>Submit Details</Button>
                </div>

                <div style={{textAlign: "center", margin: "50px"}}>
                    <Button onClick={() => {
                        window.location.reload();
                        setEditedCustomer(false);
                        setEditedOrder(false);
                    }} style={{width: "500px", fontWeight: "bold"}}>Undo Edits</Button>
                </div>
            
                <h1 className="view-order-text">Ordered Products</h1>

                <div style = {{height: "400px", display: "table"}}>
                    <Form onChange={() => {setEditedOrder(true)}} form={form_1}>
                        <table style={{width:"100%", textAlign: "center", tableLayout: "fixed"}}>
                            <tbody>
                                <tr style = {{border: "solid black 1px"}}>
                                    <th>Product Name</th>
                                    <th>Item Code</th> 
                                    <th>Quantity</th>
                                    <th>Special Requirements</th> 
                                    <th onClick = {() => {setNewItemFormVisible(true)}} className="view-order-icon" style ={{fontSize: "30px"}}>+</th>
                                </tr>
                            
                                {itemRow}  
                            </tbody>
                        </table>
                    </Form>
                </div>
            </div>

            <Modal title="Add Item" visible={newItemFormVisible} onOk={addItem} onCancel={() => {setNewItemFormVisible(false)}}>
                <Form form={form_3} layout="vertical" style={{fontWeight: "bold"}}>
                    <Form.Item name='item_code' label="Product Code">
                        <Input/>
                    </Form.Item>

                    <Form.Item name='quantity' label="Quantity">
                        <Input onChange={e => onlyNumbers(e, form_3, "quantity",)} style={{width: "50px"}} />
                    </Form.Item>

                    <Form.Item name='special_requirements' label="Special Requirements">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ViewOnlyOrder;


