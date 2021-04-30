import { Modal } from 'antd';
import { addParent, addChild, deleteParent, deleteChild } from './Functions'; 

export const confirmParent = (c_name, form) => {
    Modal.confirm({
        title: 'Adding parent category',
        content: `Are you sure you want to add a parent category with name: "${c_name}" to the database?`,
        onOk() {
            return addParent(c_name, form);
        }
    })
}

export const confirmChild = (c_name, parent, form) => {
    Modal.confirm({
        title: 'Adding sub-category',
        content: `Are you sure you want to add sub-category with name: "${c_name}" under the parent category "${parent}" to the database?`,
        onOk() {
            return addChild(c_name, parent, form);
        }
    })
}

export const confirmDeleteParent = c_name => {
    Modal.confirm({
        title: 'WARNING! Deleting parent category.',
        content: `Are you sure you want to delete parent category with name: "${c_name}"? Deleting this category will also delete its sub-categories and any product that falls under these sub-categories. This action cannot be reversed.`,
        okType: 'danger',
        onOk() {
           return deleteParent(c_name);
        }
    })
}


export const confirmDeleteChild = c_name => {
    Modal.confirm({
        title: 'WARNING! Deleting sub-category.',
        content: `Are you sure you want to delete sub-category with name: "${c_name}"? Deleting this category will also delete any product that falls under this sub-category. This action cannot be reversed.`,
        okType: 'danger',
        onOk() {
           return deleteChild(c_name);
        }
    })
}

export const errorModal = () => {
    Modal.error({
      title: 'Something went wrong!',
      content: 'Try refreshing page or contact support',
    });
}

export const successModal = (message) => {
    Modal.info({
        title: 'Success!',
        content: <p>{message}</p>,
        onOk() {
            window.location.reload();
        }
    });
  }