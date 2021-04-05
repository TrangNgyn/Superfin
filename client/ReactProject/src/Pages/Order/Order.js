import '../../_assets/CSS/pages/Order/Order.css';
import { Form, Button } from 'antd';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUndefinedValues } from './Helpers/Functions';
import { useState, useEffect } from 'react';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
//import { history } from '../../_helpers/history';
import MODE from './Helpers/PageConstants';
import { showNoItemsPresent, showEditConfirmation, AddItemModal, showUndo} from './Helpers/Modals';
import POForm2 from './Forms/POForm/POForm2';
//import moment from 'moment';
import POForm1 from './Forms/POForm/POForm1';
import POForm1View from './Forms/POForm/POForm1View';
import axios from 'axios';


/*
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

mockOrder.issued_date = moment(mockOrder.issued_date);*/










const Order = () => {
    const { po_number, status } = useParams();
    const incompleteOrders = useSelector(state => state.incompleteOrdersState.incompleteOrders);
    const compeletOrders = useSelector(state => state.completeOrdersState.completeOrders);
    const [order, setOrder] = useState({items: []});
    const [orderOriginal, setOrderOriginal] = useState(order);
    const [mode, setMode] = useState(MODE.ADD);
    const [newItemFormVisible, setNewItemFormVisible] = useState(false);
    const [form_1] = Form.useForm();
    const [form_2] = Form.useForm();


    //for refreshing the item list
    useEffect(() => {     
        form_1.setFieldsValue({items: [...order.items]}); 
    });

    useEffect(() => {
        if(status === orderStatusConstants.COMPLETE){
            if(!incompleteOrders.length){
                axios.post('/api/orders/single-order', { po_number: po_number })
                .then(res => {
                    if(res.data.success !== false){
                        let order = setUndefinedValues(res.data);
                        setOrder(order);
                        setOrderOriginal(order);
                        form_1.setFieldsValue(order);
                        setMode(MODE.VIEW);
                    }
                    else console.log(res);
                })
                .catch(err => console.log(err) );
            }
            else{
                let order = compeletOrders.filter(o => {
                    return o.po_number === po_number;
                });
                if(order !== undefined){
                    order = setUndefinedValues(order);
                    setOrder(order);
                    setOrderOriginal(order);
                    form_1.setFieldsValue(order);
                    setMode(MODE.VIEW);
                }
            }
        }
        else if(status === orderStatusConstants.NEW || status === orderStatusConstants.SHIPPED){
            if(!incompleteOrders.length){
                axios.post('/api/orders/single-order', { po_number: po_number })
                .then(res => {
                    if(res.data.success !== false){
                        let order = setUndefinedValues(res.data);
                        setOrder(order);
                        setOrderOriginal(order);
                        form_1.setFieldsValue(order);
                        setMode(MODE.VIEW);
                    }
                    else console.log(res);
                })
                .catch(err => console.log(err) );
            }
            else{
                let order = incompleteOrders.find(o => {
                    return o.po_number === po_number;
                });
       
                if(order !== undefined){
                    order = setUndefinedValues(order);
                    setOrder(order);
                    setOrderOriginal(order);
                    form_1.setFieldsValue(order);
                    setMode(MODE.VIEW);
                }
            }
        }
        
    }, [compeletOrders, form_1, incompleteOrders, po_number, status]);

    
    

    //validates all of the form fields
    const handleSubmit = () => {                    
        if(order.items.length > 0){
            form_1.validateFields()
            .then(values => {
                showEditConfirmation(values, confirmSubmit);
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
        }
        else showNoItemsPresent(setNewItemFormVisible);
    }

    //after validating fields, this function submits the forms
    const confirmSubmit = (values) => {
        const editedOrder = JSON.stringify(order) !== JSON.stringify(orderOriginal);

        let address = {};
                address.po_address_line1 = values.po_address_line1;
                address.po_address_line2 = values.po_address_line2;
                address.po_attention_to = values.po_attention_to;
                address.po_country = values.po_country;
                address.po_postal_code = values.po_postal_code;
                address.po_state = values.po_state;
                address.po_suburb = values.po_suburb;

        if(mode===MODE.ADD){
            let order = {};
                order.c_email = values.c_email;
                order.carrier = values.carrier;
                order.items = [...values.items];
                order.status = values.status;
                order.tracking_number = values.tracking_number;
                order.address = address;

                console.log("submitting order details in add mode", order);

                //go to what ever list that order status belongs to  
        }
        else if(mode===MODE.EDIT){
            if(editedOrder){
                                            //This code is so the item names are not posted
                let order = {};
                    order.po_number = values.po_number;
                    order.c_email = values.c_email;
                    order.carrier = values.carrier;
                    order.items = [...values.items];
                    order.status = values.status;
                    order.tracking_number = values.tracking_number;
                    order.address = address;

                console.log("submitting order details in edit mode", order);
                setOrder(order);
                setOrderOriginal(order);
            }
        }
    }

    //toggles the edit view
    const toggleView = () => {
        if(mode===MODE.VIEW) setMode(MODE.EDIT);
        else setMode(MODE.VIEW);
    }





    //props for child components 
    const addItemModal_props = {
        order: order,
        setOrder: setOrder,
        visible: newItemFormVisible,
        setNewItemFormVisible: setNewItemFormVisible,
        form: form_2
    }

    const form_1_props = {
        order: order,
        orderOriginal: orderOriginal,
        mode: mode,
        form: form_1,
        setOrder: setOrder
    }

    const form_2_props = {
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
                <Button onClick={() => { 
                    showUndo(form_1, orderOriginal, setOrder);
                }} style={{width: "500px", fontWeight: "bold"}}>Undo Changes</Button>
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
                    {
                        mode===MODE.EDIT || mode===MODE.ADD
                        ? <><POForm1 {...form_1_props}/> {submitUndoButtons}</>
                        : <POForm1View order={order}/>
                    }
                </div>

                <h1 className="view-order-text">Ordered Products</h1>

                <div style = {{height: "400px", display: "table"}}>
                   <POForm2 {...form_2_props}/>
                </div>
            </div>

            <AddItemModal {...addItemModal_props} />
        </div>
    )
}

export default Order;


