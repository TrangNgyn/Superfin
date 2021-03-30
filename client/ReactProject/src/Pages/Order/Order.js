import '../../_assets/CSS/pages/Order/Order.css';
import { Form, Button } from 'antd';
import { getItemName, getCustomer } from './APIFunctions/MockAPIFunctions'; //These functions will need to be real in future
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { history } from '../../_helpers/history';
import MODE from './Helpers/PageConstants';
import { showNoItemsPresent, showEditConfirmation, AddItemModal} from './Helpers/Modals';
import POFormPart3 from './Forms/POForm/POFormPart3';
import POFormPart3ViewMode from './Forms/POForm/POFormPart3ViewMode';
import POFormPart1 from './Forms/POForm/POFormPart1';
import POFormPart1ViewMode from './Forms/POForm/POFormPart1ViewMode';
import POFormPart2 from './Forms/POForm/POFormPart2';
import moment from 'moment';

//IMPORTANT
/*
    Convert issued_date into correct format before submission?
    Select.Options may need to be changed. The values there are just palceholders
    Postcode may need to only except numbers. Waiting on backends response
    When adding an item, will need to check if item exists first
    Add limit to number of items allowed in order?
*/

const mockOrder = {
    po_number: "123abc",
    c_email: "isaac@hotmail.com",
    issued_date: new Date(),
    status: "NEW",
    items:[
        {
            item_code:"123456",
            quantity:4,
            special_requirements:"Leave by the door"
        },
        {
            item_code:"98dnf9",
            quantity:2,
            special_requirements:"Beware of the dog"
        }
    ],
    tracking_number: "djfb2387423ijb",
    carrier: "Fastway",
    po_attention_to:"Next to the grey building",
    po_address_line1:"4 happy street",
    po_address_line2:"unit 7",
    po_suburb:"Redfern",
    po_state:"NSW",
    po_postal_code:"2000",
    po_country: "Australia",

}

mockOrder.issued_date = moment(mockOrder.issued_date);










const Order = () => {

    //determines the initial MODE of the page
    const getMode = () => {
        if(order.hasOwnProperty('po_number')) return MODE.VIEW;
        return MODE.ADD;
    }

    const { po_number } = useParams();      

    const [order, setOrder] = useState(mockOrder);
    const [orderOriginal, setOrderOriginal] = useState(order);
    //const [customer, setCustomer] = useState(getCustomer(order.c_email));
    //const [customerOriginal, setCustomerOriginal] = useState(customer);
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
        const editedOrder = JSON.stringify(order) !== JSON.stringify(orderOriginal);

        if(mode===MODE.ADD){
            console.log("submitting order details in add mode", values[0]);
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
        }
    }

    //toggles the edit view
    const toggleView = () => {
        if(mode===MODE.VIEW) setMode(MODE.EDIT);
        else setMode(MODE.VIEW);
    }

    //resets the fields to original values
    const resetForms = () => {
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

    const poFormPart3props = {
        customerOriginal: orderOriginal,
        customer: order,
        setOrder: setOrder,
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
                    if(JSON.stringify(order) !== JSON.stringify(orderOriginal)) handleSubmit();
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
                            ?   <POFormPart3ViewMode order = {order}/>
                            :   <POFormPart3 {...poFormPart3props}/>
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


