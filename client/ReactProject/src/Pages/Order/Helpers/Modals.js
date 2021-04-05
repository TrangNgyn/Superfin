import { ExclamationCircleOutlined} from '@ant-design/icons';
import NewItemForm from '../Forms/NewItemForm/NewItemForm';
import { Modal } from 'antd';





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
export const showUndo = (form, orderOriginal, setOrder) => {
    Modal.confirm({
        title: 'Warning!',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to undo these edits',
        okText: 'Yes',
        cancelText: 'No',

        onOk() { 
            form.setFieldsValue(orderOriginal);
            setOrder(orderOriginal); 
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

 //Modal for confirming edits. Calls the API
 export const showEditConfirmation = (values, confirmSubmit) => {
    Modal.confirm({
        title: "Submit Order",
        icon: <ExclamationCircleOutlined />,
        content: "Are you sure you want to submit this order?",
        okText: 'Submit',
        cancelText: 'Cancel',

        onOk() { confirmSubmit(values) }
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