import { ExclamationCircleOutlined} from '@ant-design/icons';
import NewItemForm from '../Forms/NewItemForm/NewItemForm';
import { orderStatusConstants } from '../../../_constants/orderStatus.constants';
import { Modal } from 'antd';
import MODE from './PageConstants';
import { addIncompleteOrder } from '../../../_actions/incompleteOrderActions';
import { history } from '../../../_helpers/history';
import axios from 'axios';
import { 
            DELETE_INCOMPLETE_ORDERS, 
            ADD_INCOMPLETE_ORDER, 
            ADD_COMPLETE_ORDER, 
            DELETE_COMPLETE_ORDER, 
            EDIT_COMPLETE_ORDER, 
            EDIT_INCOMPLETE_ORDER 
        } from '../../../_actions/actionTypes';




//Appears when confirming a delete on a PO item
export const showDeleteConfirm = (index, deleteOrderItem) => {
    Modal.confirm({
        title: 'Warning!',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to delete this item from this order?',
        okText: 'Delete',
        cancelText: 'No',

        onOk() { deleteOrderItem(index) }
    });
}

//Appears when confirming a delete on a PO item
export const showUndo = (form, orderOriginal, setOrder, mode) => {

    Modal.confirm({
        title: 'Warning!',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to undo changes',
        okText: 'Yes',
        cancelText: 'No',

        onOk() { 
            if(mode === MODE.ADD){
                form.resetFields();
                setOrder(orderOriginal); 
            } 
            else{
                form.setFieldsValue(orderOriginal);
                form.setFieldsValue(orderOriginal.address);
                setOrder(orderOriginal); 
            }
        }
    });
}

//Appears if user tries to submit order with no items
export const showNoItemsPresent = setNewItemFormVisible => {
    Modal.confirm({
        title: 'Error!',
        icon: <ExclamationCircleOutlined />,
        content: 'You must have at least one item in an order',
        okText: 'Add Item',
        cancelText: 'Back',

        onOk() { setNewItemFormVisible(true) }
    });
}

//Appears when email can't be found in PO form part 1
export const emailDoesNotExist = () => {
    Modal.info({
        title: 'Email does not exist',
        content: <p>You can create a termporary customer by entering new details</p>
    });
}

//Modal/form for adding new items to the PO
export const AddItemModal = props => {
    //adds an item after validating and updates the state
    const addItem = () => {
        props.form.validateFields()
            .then(new_item => {

               // new_item.item_name = getItemName(new_item.item_code);
                const new_items = [...props.order.items];
                new_items.unshift(new_item);

                const new_order = {...props.order};
                new_order.items = new_items;

                props.setOrder(new_order);
                props.setNewItemFormVisible(false);
                props.form.resetFields();
            })
            .catch((errorInfo) => {
                console.log(errorInfo);
            })
    }

    //resets the fields of the addItem form
    const cancelAddItem = () => {
        props.form.resetFields();
        props.setNewItemFormVisible(false);
    }

    return(
        <Modal title="Add Item" visible={props.visible} onOk={addItem} onCancel={cancelAddItem}>
            <NewItemForm form={props.form} />
        </Modal>
    );
}   

export const _addIncompleteOrder = (order, dispatch) => {
    Modal.confirm({
        title: 'Add Order?',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to add this order?',
        okText: 'Yes',
        cancelText: 'No',

        onOk() { 
            if(dispatch !== undefined){
                return dispatch(addIncompleteOrder(order))
                .then(res => {
                    if(res.data.success) addSuccess();
                    else addFail();
                })
                .catch(() => {
                    addFail();
                })
            }
            else{
                axios.post('/api/orders/create-order', order)
                .then(res => {
                    if(res.data.success) addSuccess();
                    else{
                        console.log(res);
                        addFail();
                    } 
                })
                .catch(err => {
                    console.log(err);
                    addFail();
                });
            }
        }
    });
}

const addSuccess = () => {
    Modal.info({
        title: "Add Successful",
        content: 'Successfully added order',
        okText: "Ok",
        onOk(){ history.push('/admin') }
    });
}


const addFail = () => {
    Modal.info({
        title: "ERROR",
        content: 'There was a problem adding this order. Please try again or contact support.',
        okText: "Ok",
        onOk(){ 
            history.push('/order');
            window.location.reload();
        }
    });
}

export const _editOrder = (order, dispatch, prev, curr, completeLength, incompleteLength, setOrder, setOrderOriginal, setMode) => {
    Modal.confirm({
        title: 'Edit Order?',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to edit this order?',
        okText: 'Yes',
        cancelText: 'No',
        onOk() { 
            return axios.post('/api/orders/edit-order', order)
            .then(res => {
                if(res.data.success){
                    if((prev === orderStatusConstants.NEW || prev === orderStatusConstants.SHIPPED) && curr === orderStatusConstants.COMPLETE){
                        //then remove from current order list... add to complete order list
                        if(incompleteLength > 0){
                            //remove
                            dispatch({
                                type: DELETE_INCOMPLETE_ORDERS,
                                payload: order.po_number
                            });
                        }
                        if(completeLength > 0){
                            //add
                            dispatch({
                                type: ADD_COMPLETE_ORDER,
                                payload: order
                            });
                        }
                    }
                    else if(prev === orderStatusConstants.COMPLETE && (curr === orderStatusConstants.SHIPPED || curr === orderStatusConstants.NEW)){
                        //remove from complete order list and add to current order list
                        if(incompleteLength > 0){
                            //add to current list
                            dispatch({
                                type: ADD_INCOMPLETE_ORDER,
                                payload: order
                            });
                        }
                        if(completeLength > 0){
                            dispatch({
                                type: DELETE_COMPLETE_ORDER,
                                payload: order.po_number
                            });
                        }
                    }
                    else if((curr === orderStatusConstants.SHIPPED || curr === orderStatusConstants.NEW) 
                    && (prev === orderStatusConstants.SHIPPED || prev === orderStatusConstants.NEW)){
                        //need to replace in current order
                        if(incompleteLength > 0){
                            dispatch({
                                type: EDIT_INCOMPLETE_ORDER,
                                payload: order
                            });
                        }
                    }
                    else{
                        //need to replace in complete orders
                        if(completeLength > 0){
                            dispatch({
                                type: EDIT_COMPLETE_ORDER,
                                payload: order
                            });
                        }
                    }
                    setOrder(order);
                    setOrderOriginal(order);
                    setMode(MODE.VIEW);
                    editSuccess(order);
                }
                else{
                    console.log(res);
                    editFail();
                }
            })
            .catch(err => {
                console.log(err);
                editFail();
            });
        }
    });
}

const editSuccess = order => {
    Modal.info({
        title: "Edit Successful",
        content: 'Successfully edited order',
        okText: "Ok",
        onOk(){
            history.push(`/order/${order.po_number}/${order.status}`);
        }
    });
}


const editFail = () => {
    Modal.info({
        title: "ERROR",
        content: 'There was a problem editing this order. Please try again or contact support.',
        okText: "Ok",
        onOk(){ 
            history.push('/order');
            window.location.reload();
        }
    });
}