import '../../_assets/CSS/pages/Order/Order.css';
import { Form, Button } from 'antd';
import { getItemName, getMockOrder, getCustomer } from './APIFunctions/MockAPIFunctions'; //These functions will need to be real in future
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { history } from '../../_helpers/history';
import MODE from './Helpers/PageConstants';
import { showNoItemsPresent, showEditConfirmation, AddItemModal} from './Helpers/Modals';
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

const Order = () => {

    //determines the initial MODE of the page
    const getMode = () => {
        if(order.hasOwnProperty('po_number')) return MODE.VIEW;
        return MODE.ADD;
    }

    const { po_number } = useParams();      

    const [order, setOrder] = useState(getMockOrder(po_number));
    const [orderOriginal, setOrderOriginal] = useState(order);
    const [customer, setCustomer] = useState(getCustomer(order.c_email));
    const [customerOriginal, setCustomerOriginal] = useState(customer);
    const [mode, setMode] = useState(getMode());
    const [newItemFormVisible, setNewItemFormVisible] = useState(false);
    
    const [form_1] = Form.useForm();
    const [form_2] = Form.useForm();
    const [form_3] = Form.useForm();

    //for refreshing the item list
    useEffect(() => {     
        form_1.setFieldsValue({items: [...order.items]}); 
    })

    //validates all of the form fields
    const handleSubmit = () => {                    
            if(order.items.length > 0){
                const promise_1 = form_1.validateFields();
                const promise_2 = form_2.validateFields();

                Promise.all([promise_1, promise_2])
                .then(values => {
                    showEditConfirmation(values, confirmSubmit);
                })
                .catch(errorInfo => {
                    console.log(errorInfo);
                })
            }
            else showNoItemsPresent(setNewItemFormVisible);
    }

    //after validating fields, this function submits the forms
    const confirmSubmit = (values) => {
        const editedCustomer = JSON.stringify(customer) !== JSON.stringify(customerOriginal);
        const editedOrder = JSON.stringify(order) !== JSON.stringify(orderOriginal);

        if(mode===MODE.ADD){
            console.log("submitting order details in add mode", values[0]);
       
            if(editedCustomer){
                values[1].email = values[0].c_email;
                console.log("submitting customer details in add mode", values[1]);
            } 

            history.push(`/order/${values[0].po_number}`);             //relocate to edit page
            window.location.reload();
        }
        else if(mode===MODE.EDIT){
            if(editedOrder){
                console.log("submitting order details in edit mode", values[0]);

                const newObj = {...values[0]};                                  //This code is so the item names are not posted
                let tempArray = JSON.parse(JSON.stringify(values[0].items));

                tempArray.forEach(i => { i.item_name = getItemName(i.item_code) });
                newObj.items = tempArray;   
        
                setOrder(newObj);
                setOrderOriginal(newObj);
   
            }
            if(editedCustomer){
                console.log("submitting customer details in edit mode", values[1]);

                setCustomer(values[1]);
                setCustomerOriginal(values[1]);
            }
        }
    }

    //toggles the edit view
    const toggleView = () => {
        if(mode===MODE.VIEW) setMode(MODE.EDIT);
        else setMode(MODE.VIEW);
    }

    //resets the fields to original values
    const resetForms = () => {
        if(JSON.stringify(customer) !== JSON.stringify(customerOriginal)){
            form_2.resetFields();
        }
        if(JSON.stringify(order) !== JSON.stringify(orderOriginal)){
            form_1.resetFields();
            setOrder(orderOriginal);
        }  
    }

    //props for child components 
    const addItemModal_props = {
        order: order,
        setOrder: setOrder,
        visible: newItemFormVisible,
        setNewItemFormVisible: setNewItemFormVisible,
        form: form_3
    }

    const customerForm_props = {
        customerOriginal: customerOriginal,
        customer: customer,
        setCustomer: setCustomer,
        form: form_2,
    }

    const poFormPart1props = {
        order: order,
        orderOriginal: orderOriginal,
        setOrder: setOrder,
        mode: mode,
        form: form_1,
        form_2: form_2
    }

    const poFormPart_2_props = {
        order: order,
        orderOriginal: orderOriginal,
        mode: mode,
        form: form_1,
        onClick: setNewItemFormVisible,
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
                    if(JSON.stringify(customer) !== JSON.stringify(customerOriginal) || JSON.stringify(order) !== JSON.stringify(orderOriginal)) handleSubmit();
                }} style={{width: "500px", fontWeight: "bold"}}>Submit Details</Button>
            </div>
            
            <div style={{ paddingTop: "30px", paddingBottom: "30px"}}>
                <Button onClick={resetForms} style={{width: "500px", fontWeight: "bold"}}>Undo Changes</Button>
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
    )
}

export default Order;


