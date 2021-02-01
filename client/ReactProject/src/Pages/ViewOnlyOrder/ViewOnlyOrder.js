import '../../_assets/CSS/pages/ViewOnlyOrder/ViewOnlyOrder.css';
import { Form, Input, Button, DatePicker, Select, Modal} from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moment from 'moment';


//IMPORTANT
/*
    Select.Options may need to be changed. The values there are just palceholders
    Postcode may need to only except numbers. Waiting on backends response
    When adding an item, will need to check if item exists first
    Add limit to number of items allowed in order?
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
        mobile_number: "12345678"
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

    useEffect(() => {                           //for refreshing the item list
        let items = [...order.items]
        form_1.setFieldsValue({items: items});
    })

    const handleSubmit = () => {                    //validates all of the form fields
            if(order.items.length > 0){
                const promise_1 = form_1.validateFields();
                const promise_2 = form_2.validateFields();

                Promise.all([promise_1, promise_2])
                .then(values => {
                    showEditConfirmation(values);
                })
                .catch(errorInfo => {
                    console.log(errorInfo);
                })
            }
            else showNoItemsPresent();
    }

    //Appears if user tries to submit order with no items
    function showNoItemsPresent() {
        Modal.confirm({
            title: 'Error!',
            icon: <ExclamationCircleOutlined />,
            content: 'You must have at least one item in an order',
            okText: 'Add Item',
            cancelText: 'Back',

            onOk() { setNewItemFormVisible(true) },
            onCancel() { console.log('Not adding an item') },
        });
    }
  

    //Modal for confirming edits. Calls the API
    function showEditConfirmation(values) {
        Modal.confirm({
            title: 'Edits have been made to this order!',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you you want to submit these edits?',
            okText: 'Make Edits',
            cancelText: 'Cancel',

            onOk() {
                if(editedOrder){
                    console.log("submitting order details", values[0]);

                    const newObj = {...values[0]};                                  //This code is so the item names are not posted
                    let tempArray = JSON.parse(JSON.stringify(values[0].items));

                    tempArray.forEach(i => { i.item_name = getItemName(i.item_code) });
                    newObj.items = tempArray;   
            
                    setOrder(newObj);
                    setEditedOrder(false);

                }
                if(editedCustomer){
                    console.log("submitting customer details", values[1]);
                    //submit to API here
                    setCustomer(values[1]);
                    setEditedCustomer(false);
                }
            },
            onCancel() { 
                console.log("Cancel submit");
            },
        });
    }

     //Confirms deleting an item
     function showDeleteConfirm(index) {
        Modal.confirm({
            title: 'Warning!',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to delete this item from this order?',
            okText: 'Delete',
            cancelText: 'No',

            onOk() { deleteOrderItem(index) },
            onCancel() { console.log('Cancel delete order') },
        });
    }

    //function that removes item from order and updates the state
    const deleteOrderItem = index => {
        const new_items = [...order.items];
        new_items.splice(index, 1);

        const new_order = {...order};
        new_order.items = new_items;
        
        console.log(new_order);
        setOrder(new_order);
        setEditedOrder(true);
    }

    //adds an item after validating and updates the state
    const addItem = () => {
        form_3.validateFields()
            .then((new_item) => {
                console.log("Adding item", new_item);

                new_item.item_name = getItemName(new_item.item_code);
                const new_items = [...order.items];
                new_items.unshift(new_item);

                const new_order = {...order};
                new_order.items = new_items;

                setOrder(new_order);
                setEditedOrder(true);
                setNewItemFormVisible(false);
                form_3.resetFields();
            })
            .catch((errorInfo) => {
                //catch error 
                console.log(errorInfo);
            })
    }

    //resets the fields of the addItem form
    const cancelAddItem = () => {
        form_3.resetFields();
        setNewItemFormVisible(false);
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
        let field_obj = {};

        if(typeof index !== 'undefined'){
            let arr = form.getFieldValue(field);
            let sub_obj = arr[index];
            
            if (str === '' || reg.test(str)) sub_obj[subfield] = str;  
            else sub_obj[subfield] = makeNumber(str);
            field_obj[field] = arr;    
        }

        else{
            if (str === '' || reg.test(str)) field_obj[field] = str;     
            else field_obj[field] = makeNumber(str); 
        }
        form.setFieldsValue(field_obj);
    }

    





    
    //For rendering the individual rows in the item list
    const itemRow = order.items.map((item, index) => {
        return (
            <tr key = {item.item_code} className="view-order-table-row">
                <td>{item.item_name}</td>
            
                <td>
                    {item.item_code}
                    <Form.Item hidden name={['items', index, 'item_code']}><Input /></Form.Item>
                </td>

                <td>
                    <Form.Item 
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
                        <Input maxLength={4} onChange={e => onlyNumbers(e, form_1, "items", index, 'quantity')} style={{width: "50px"}} />
                    </Form.Item>
                </td>

                <td>
                    <Form.Item name ={['items', index, 'special_requirements']}>
                        <Input.TextArea maxLength={500} style={{width: "500px"}} />
                    </Form.Item>
                </td>
    
                <td onClick={() => showDeleteConfirm(index)}><DeleteOutlined className="view-order-icon"/></td>   
            </tr>
        ); 
    })










    //Form initial values
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
    









    //HTML
    return (
        <div>
            <h1 className="view-order-text">Order Details</h1>

            <div>
                <div id="view-order-row">
                    <div className="view-order-column">
                        <Form onChange={() => {setEditedOrder(true)}} initialValues={form_1_init_values} form = {form_1}>
                            <div className="view-order-field-header">Purchase Order Number:</div>
                            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{order.po_number}</div>
                            <Form.Item hidden name="po_number"><Input/></Form.Item>

                            <div className="view-order-field-header">Customer Email</div>
                            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{customer.email}</div>
                            <Form.Item hidden name="c_email"><Input/></Form.Item> 

                            <div className="view-order-field-header">Issue Date</div>
                            <Form.Item name="issue_date">
                                    <DatePicker onChange={() => {setEditedOrder(true)}} format="YYYY/MM/DD" style={{width: "500px"}} />
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
                                    <Select onChange={() => {setEditedOrder(true)}} style={{width: "500px", textAlign: "left"}}>
                                        <Select.Option value="new">New</Select.Option>                         
                                        <Select.Option value="on_hold">On Hold</Select.Option>
                                        <Select.Option value="in_transit">In Transit</Select.Option>
                                        <Select.Option value="complete">Complete</Select.Option>
                                    </Select>
                            </Form.Item>

                            <div className="view-order-field-header">Tracking Number</div>
                            <Form.Item name="tracking_number">
                                <Input maxLength={100} style={{width: "500px"}} />
                            </Form.Item>

                            <div className="view-order-field-header">Carrier</div>
                            <Form.Item name="carrier">
                                <Input maxLength={100} style={{width: "500px"}}/>
                            </Form.Item>               
                        </Form>
                    </div>
                    
                    <div className="view-order-column">
                    <Form onChange={() => {setEditedCustomer(true)}} initialValues={form_2_init_values} form={form_2}>
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
                                <Input maxLength={100} onChange={e => onlyNumbers(e, form_2, "mobile_number")} style={{width: "500px"}} />
                            </Form.Item>
                        </Form>
                    </div>
                </div>

                <div style={{textAlign: "center"}}>
                    <div>  
                        <Button type="primary" onClick={() => {
                            if(editedOrder || editedCustomer) handleSubmit();
                        }} style={{width: "500px", fontWeight: "bold"}}>Submit Details</Button>
                    </div>
                    
                    <div style={{ margin: "30px"}}>
                        <Button onClick={() => { window.location.reload()}} style={{width: "500px", fontWeight: "bold"}}>Undo Edits</Button>
                    </div>
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

            <Modal title="Add Item" visible={newItemFormVisible} onOk={addItem} onCancel={cancelAddItem}>
                <Form form={form_3} layout="vertical" style={{fontWeight: "bold"}}>
                    <Form.Item 
                        name='item_code' 
                        label="Product Code"
                        rules={[
                            {
                                required: true,
                                validateTrigger: 'onSubmit',
                                message: 'Please input a product code',
                            }
                        ]}
                    >
                        <Input maxLength={100}/>
                    </Form.Item>

                    <Form.Item 
                        name='quantity' 
                        label="Quantity"
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
                        <Input maxLength={4} onChange={e => onlyNumbers(e, form_3, "quantity",)} style={{width: "50px"}} />
                    </Form.Item>

                    <Form.Item maxLength={200} name='special_requirements' label="Special Requirements">
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default ViewOnlyOrder;


