import '../../_assets/CSS/pages/Order/Order.css';
import { Form, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setUndefinedValues } from './Helpers/Functions';
import { useState, useEffect } from 'react';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
import { useAuth, useAuthUpdate } from '../../SharedComponents/AuthContext/AuthContext';
import MODE from './Helpers/PageConstants';
import { showNoItemsPresent, AddItemModal, showUndo} from './Helpers/Modals';
import POForm2 from './Forms/POForm/POForm2';
import POForm1 from './Forms/POForm/POForm1';
import POForm1View from './Forms/POForm/POForm1View';
import axios from 'axios';
import { _addIncompleteOrder, _editOrder } from './Helpers/Modals';
import { createAddress, createOrderAdd, createOrderEdit } from './Helpers/Functions';
import { _logout } from '../../_services/SharedFunctions';










const Order = () => {
    const dispatch = useDispatch();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();
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
        const config = { headers:{ authorization : `Bearer ${auth.access_token}` }};

        if(status === orderStatusConstants.COMPLETE){
            if(!incompleteOrders.length){
                axios.post('/api/orders/single-order', { po_number: po_number }, config)
                .then(res => {
                    if(res.data.success !== false){
                        let order = setUndefinedValues(res.data);
                        setOrder(order);
                        setOrderOriginal(order);
                        setMode(MODE.VIEW);
                    }
                    else console.log(res);
                })
                .catch(err => {
                    console.log(err);
                    if(err.response.status === 401) _logout(updateAuth);
                });
            }
            else{
                let order = compeletOrders.find(o => {
                    return o.po_number === po_number;
                });
                if(order !== undefined){
                    order = setUndefinedValues(order);
                    setOrder(order);
                    setOrderOriginal(order);
                    setMode(MODE.VIEW);
                }
            }
        }
        else if(status === orderStatusConstants.NEW || status === orderStatusConstants.SHIPPED){

            if(!incompleteOrders.length){
                axios.post('/api/orders/single-order', { po_number: po_number }, config)
                .then(res => {
                    if(res.data.success !== false){
                        let order = setUndefinedValues(res.data);
                        setOrder(order);
                        setOrderOriginal(order);
                        setMode(MODE.VIEW);
                    }
                    else console.log(res);
                })
                .catch(err => {
                    console.log(err);
                    if(err.response.status === 401) _logout(updateAuth);
                });
            }
            else{
                let order = incompleteOrders.find(o => {
                    return o.po_number === po_number;
                });
       
                if(order !== undefined){
                    order = setUndefinedValues(order);
                    setOrder(order);
                    setOrderOriginal(order);
                    setMode(MODE.VIEW);
                }
            }
        }
        
    }, [compeletOrders, form_1, incompleteOrders, po_number, status, auth.access_token]);

    
    

    //validates all of the form fields
    const handleSubmit = () => {                  
        if(order.items.length > 0){
            form_1.validateFields()
            .then(values => {
                confirmSubmit(values);
            })
            .catch(errorInfo => {
                console.log(errorInfo);
            });
        }
        else showNoItemsPresent(setNewItemFormVisible);
    }

    //after validating fields, this function submits the forms
    const confirmSubmit = values => {
        const editedOrder = JSON.stringify(order) !== JSON.stringify(orderOriginal);
        let address = createAddress(values);

        if(mode===MODE.ADD){
            let order = createOrderAdd(values, address);
            console.log(order);
            if(incompleteOrders.length > 0){
                order.issued_date = new Date();
                _addIncompleteOrder(order, dispatch);
            }
            else _addIncompleteOrder(order);
        }
        else if(mode===MODE.EDIT){
            if(editedOrder){
                let order = createOrderEdit(values, address, orderOriginal);
                const prev = orderOriginal.status;
                const curr = values.status;
                _editOrder(order, dispatch, prev, curr, compeletOrders.length, incompleteOrders.length, setOrder, setOrderOriginal, setMode, auth.access_token, updateAuth);
            }
        }
    }

    //toggles the edit view
    const toggleView = () => {
        if(mode===MODE.VIEW){
            setMode(MODE.EDIT);
            form_1.setFieldsValue(order);
            form_1.setFieldsValue(order.address);
        } 
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
                    if(JSON.stringify(order) !== JSON.stringify(orderOriginal)) showUndo(form_1, orderOriginal, setOrder, mode);
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


