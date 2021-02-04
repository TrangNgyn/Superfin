import { ExclamationCircleOutlined} from '@ant-design/icons';
import NewItemForm from '../Forms/NewItemForm/NewItemForm';
import { Modal } from 'antd';

export const showDeleteConfirm = (index, deleteOrderItem) => {
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

//Appears if user tries to submit order with no items
export const showNoItemsPresent = setNewItemFormVisible => {
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
 export const showEditConfirmation = (values, confirmSubmit) => {
    Modal.confirm({
        title: "Submit Order",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure you want to submit this order?",
        okText: 'Submit',
        cancelText: 'Cancel',

        onOk() { confirmSubmit(values) },
        onCancel() { console.log("Cancel submit") }
    });
}

export const emailDoesNotExist = () => {
    Modal.info({
        title: 'Email does not exist',
        content: <p>You can create a termporary customer by entering new details</p>
    });
}

export const AddItemModal = props => {
    return(
            <Modal title="Add Item" visible={props.visible} onOk={props.onOk} onCancel={props.onCancel}>
                <NewItemForm form={props.form} />
            </Modal>
    );
}   