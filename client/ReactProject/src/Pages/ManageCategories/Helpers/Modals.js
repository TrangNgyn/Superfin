import { Modal } from 'antd';
import { addCategory, deleteCategory } from './Functions';

export const confirmAddingCategory = (values, form, access_token, updateAuth) => {
    Modal.confirm({
        title: 'Adding parent category',
        content: `Are you sure you want to add a category with name: [${values.categoryName}] to the database?`,
        onOk() {
            return addCategory(values, form, access_token, updateAuth);
        }
    })
}

export const confirmDeleteCategory = (value, access_token, updateAuth) => {
    Modal.confirm({
        title: 'WARNING! Deleting category [' + value.categoryToDelete + ']!',
        content: `Are you sure you want to delete the category with name: [${value.categoryToDelete}]? Deleting this category will also delete its sub-categories and any products that falls under these sub-categories. This action cannot be reversed!`,
        okType: 'danger',
        onOk() {
            return deleteCategory(value.categoryToDelete, access_token, updateAuth);
        }
    })
}

export const errorModal = () => {
    Modal.error({
      title: 'Something went wrong!',
      content: 'Try refreshing page or contact support!',
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