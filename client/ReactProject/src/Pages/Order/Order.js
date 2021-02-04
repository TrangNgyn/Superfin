import '../../_assets/CSS/pages/ViewOnlyOrder/ViewOnlyOrder.css';
import { Form, Button } from 'antd';

import { getItemName, getMockOrder, getCustomer } from './APIFunctions/MockAPIFunctions'; //These functions will need to be real in future
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { history } from '../../_helpers/history';
import MODE from './Helpers/PageConstants';
import { showNoItemsPresent, showEditConfirmation, emailDoesNotExist, AddItemModal} from './Helpers/Modals';
import CustomerForm from './Forms/CustomerForm/CustomerForm';
import CustomerFormViewMode from './Forms/CustomerForm/CustomerFormViewMode';
import POFormPart1 from './Forms/POForm/POFormPart1';
import POFormPart1ViewMode from './Forms/POForm/POFormPart1ViewMode';
import POFormPart2 from './Forms/POForm/POFormPart2';


//IMPORTANT
/*
    Convert issued_date into correct format before submission?
    Select.Options may need to be changed. The values there are just palceholders
    Postcode may need to only except numbers. Waiting on backends response
    When adding an item, will need to check if item exists first
    Add limit to number of items allowed in order?
*/


/*
    IF TIME
    
    Thoroughly test
    Tidy code
    Tidy CSS
    make search button clear custoemr fields on fail

    Add live update to all fields
    Change undo edits so rather then refreshing the page, it will use orderOriginal and customerOriginal
    Instead of having 'editedCustomer' and 'editedOrder', just check if difference between current order/customer and original order/customer

*/








const Order = () => {

    const getMode = () => {
        if(order.hasOwnProperty('po_number')) return MODE.VIEW;
        return MODE.ADD;
    }

    const { po_number } = useParams();      

    const [order, setOrder] = useState(getMockOrder(po_number));
    //const [orderOriginal, setOrderOriginal] = useState(order);
    const [customer, setCustomer] = useState(getCustomer(order.c_email));
   // const [customerOriginal, setCustomerOriginal] = useState(customer);
    

    const [mode, setMode] = useState(getMode());
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
                    showEditConfirmation(values, confirmSubmit);
                    console.log(values);
                })
                .catch(errorInfo => {
                    console.log(errorInfo);
                })
            }
            else showNoItemsPresent(setNewItemFormVisible);
    }

    const confirmSubmit = (values) => {
        if(mode===MODE.ADD){
            console.log("submitting order details in add mode", values[0]);
       
            if(editedCustomer){
                values[1].email = values[0].c_email;
                console.log("submitting customer details", values[1]);
            } 

            history.push(`/order/${values[0].po_number}`);             //relocate to edit page
            //window.location.reload();
        }
        else if(mode===MODE.EDIT){
            if(editedOrder){
                console.log("submitting order details in edit mode", values[0]);

                const newObj = {...values[0]};                                  //This code is so the item names are not posted
                let tempArray = JSON.parse(JSON.stringify(values[0].items));

                tempArray.forEach(i => { i.item_name = getItemName(i.item_code) });
                newObj.items = tempArray;   
        
                setOrder(newObj);
                setEditedOrder(false);
            }
            if(editedCustomer){
                console.log("submitting customer details", values[1]);

                setCustomer(values[1]);
                setEditedCustomer(false);
            }
        }
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


    //Auto fills customer details if email exists
    const autoFillEmail = c_email => {
        const cust = getCustomer(c_email);
        if(Object.keys(cust).length !== 0 || cust.constructor !== Object) form_2.setFieldsValue(cust);
        else emailDoesNotExist();
    }

    //toggles the edit view
    const toggleView = () => {
        console.log(order);
        if(mode===MODE.VIEW) setMode(MODE.EDIT);
        else setMode(MODE.VIEW);
    }

    //not finished. Updates the state as soon as user leaves a field.
    /*const liveUpdate = e => {
        const field = e.target.id;
        const temp_order = {...order};
        temp_order[field] = e.target.value;
        setOrder(temp_order);
    }*/


    //Form initial values
    const form_1_init_values = {
        po_number: order.po_number,
        c_email: order.c_email,
        issued_date: order.issued_date,
        status: order.status,
        tracking_number: order.tracking_number,
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
    
    //props
    const addItemModal_props = {
        onOk:addItem,
        onCancel:cancelAddItem,
        visible:newItemFormVisible,
        form:form_3
    }

    const customerForm_props = {
        onChange: setEditedCustomer,
        initialValues: form_2_init_values,
        form: form_2
    }

    const poFormPart1props = {
        onChange: setEditedOrder,
        order: order,
        mode: mode,
        form: form_1,
        initialValues: form_1_init_values,
        onSearch: autoFillEmail
    }

    const poFormPart_2_props = {
        order: order,
        mode: mode,
        form: form_1,
        onChange: setEditedOrder,
        onClick: setNewItemFormVisible,
        deleteOrderItem: deleteOrderItem,
        setOrder: setOrder
    }






    //button for toggling edit mode
    const toggleButton = (
        <div style={{ margin: "30px", textAlign: "center"}}>
            <Button onClick={toggleView} style={{width: "500px", fontWeight: "bold"}}>Toggle 'Edit' Mode</Button>
        </div>
    );
    

    //submit and undo buttons
    const submitUndoButtons = (
        <div style={{textAlign: "center"}}>
            <div>  
                <Button type="primary" onClick={() => {
                    if(editedOrder || editedCustomer) handleSubmit();
                }} style={{width: "500px", fontWeight: "bold"}}>Submit Details</Button>
            </div>
            
            <div style={{ margin: "30px"}}>
                <Button onClick={() => {window.location.reload()}} style={{width: "500px", fontWeight: "bold"}}>Undo Edits</Button>
            </div>
        </div>
    );
    
   









    //HTML Main
    return (
        <div>
            {mode===MODE.EDIT || mode===MODE.VIEW   ?   toggleButton    :   <></>}

            <h1 className="view-order-text">Order Details</h1>

            <div>
                <div id="view-order-row">
                    <div className="view-order-column">
                        {mode===MODE.EDIT || mode===MODE.ADD
                            ?   <POFormPart1 {...poFormPart1props}/>
                            :   <POFormPart1ViewMode order = {order} />
                        }  
                    </div>
                    
                    <div className="view-order-column">
                        {mode===MODE.VIEW
                            ?   <CustomerFormViewMode customer = {customer}/>
                            :   <CustomerForm {...customerForm_props}/>
                        }
                    </div>

                    {mode===MODE.EDIT || mode===MODE.ADD
                        ?   submitUndoButtons
                        : <></>
                    }
                </div>

                <h1 className="view-order-text">Ordered Products</h1>

                <div style = {{height: "400px", display: "table"}}>
                    <POFormPart2 {...poFormPart_2_props}/>
                </div>
            </div>

            <AddItemModal {...addItemModal_props} />
        </div>
    );
}

export default Order;


