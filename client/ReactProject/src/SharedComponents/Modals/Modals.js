import { Modal } from 'antd';
import { deleteProduct } from '../../_actions/productActions';

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