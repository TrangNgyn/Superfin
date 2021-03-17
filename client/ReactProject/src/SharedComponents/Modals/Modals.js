import { Modal } from 'antd';
import { deleteProduct } from '../../_actions/productActions';
import { deleteIncompleteOrder } from '../../_actions/incompleteOrderActions'; 
import { deleteCompleteOrder } from '../../_actions/completeOrderActions'; 
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
//All shared modals

export const deleteConfirm = (p_code, dispatch) => {
    Modal.confirm({
        title: `Deleting product: ${p_code}`,
        content: 'Are you sure you wish to delete this product?',
        okText: 'Delete',
        okType: 'danger',
        onOk() {
            dispatch(deleteProduct(p_code));
        }
    });
}

const deleteOrderSuccess = po_number => {
    Modal.info({
        title: 'Success',
        content: `Deleted order: ${po_number}`,
        okText: 'Ok',
    });
}

const deleteOrderFail = po_number => {
    Modal.info({
        title: 'Error',
        content: `Failed to delete product: ${po_number}. Please reload the page and try again or contact support.`,
        okText: 'Ok',
    });
}

export const deleteOrderConfirm = (po_number, status, dispatch) => {
    Modal.confirm({
        title: `Deleting order: ${po_number}`,
        content: 'Are you sure you wish to delete this order?',
        okText: 'Delete',
        okType: 'danger',
        onOk() {
            if(status===orderStatusConstants.COMPLETE){
                return dispatch(deleteCompleteOrder(po_number))
                .then(res => {
                    if(res.data.success) deleteOrderSuccess(po_number);
                    else deleteOrderFail(po_number);
                })
                .catch(() => {
                    deleteOrderFail(po_number);
                });
            }
            else{
                return dispatch(deleteIncompleteOrder(po_number))
                .then(res => {
                    if(res.data.success) deleteOrderSuccess(po_number);
                    else deleteOrderFail(po_number);
                })
                .catch(() => {
                    deleteOrderFail(po_number);
                });
            } 
        }
    });
} 

