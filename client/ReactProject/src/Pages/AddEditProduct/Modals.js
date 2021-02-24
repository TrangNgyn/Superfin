import { Modal} from 'antd';
import { onRemove } from './Functions'; 
import { history } from '../../_helpers/history';
import { _editProduct, _addProduct } from './Functions';
import { editProduct, addProduct } from '../../_actions/productActions'; 

export const imageModal = (src, file, fileList, updateFileList) => {
    Modal.confirm({
        title: 'Image Preview',
        icon: null,
        content: <img alt="example" style={{ width: '100%' }} src={src} />,
        okText:"Keep Image",
        cancelText: "Delete Image",
        onOk() {},
        onCancel() {
            onRemove(file, fileList, updateFileList)
        },
    });
}

const editSuccess = p_code => {
    Modal.info({
        title: "Edit Successful",
        content: `Successfully edited product: ${p_code}`,
        okText: "Ok",
        onOk(){ history.push('/manageProducts') }
    });
}

const addSuccess = p_code => {
    Modal.info({
        title: "Add Successful",
        content: `Successfully added product: ${p_code}`,
        okText: "Ok",
        onOk(){ history.push('/manageProducts') }
    });
}


const editFail = p_code => {
    Modal.info({
        title: "ERROR",
        content: `There was a problem editing product: ${p_code}. Please try again or contact support.`,
        okText: "Ok",
        onOk(){ history.push('/manageProducts') }
    });
}

const addFailPcode = p_code => {
    Modal.info({
        title: "ERROR",
        content: `There was a problem adding product: ${p_code}. Please make sure the item code is not taken.`,
        okText: "Ok"
    });
}

const addFail = p_code => {
    Modal.info({
        title: "ERROR",
        content: `There was a problem adding product: ${p_code}. Please try again or contact support.`,
        okText: "Ok",
        onOk(){ history.push('/manageProducts') }
    });
}



export const confirmEdit = (newProduct, dispatch) => {
    Modal.confirm({
        title: `Editing product: ${newProduct.p_code}`,
        content: 'Are you sure you want to make these edits?',
        onOk() {
            if(dispatch !== undefined){
                return dispatch(editProduct(newProduct))
                .then(res => {
                    if(res.data.success) editSuccess(newProduct.p_code);
                    else { 
                        console.log("Error", res);
                        editFail(newProduct.p_code);
                    }
                })
                .catch(err => {
                    console.log("Error", err);
                    editFail(newProduct.p_code);
                });
            }
            else{
                return _editProduct(newProduct)
                .then(res => {
                    if(res.data.success) editSuccess(newProduct.p_code);
                    else{
                        console.log("Error", res);
                        editFail(newProduct.p_code);
                    }

                })
                .catch(err => {
                    console.log("Error", err);
                    editFail(newProduct.p_code);
                });
            } 
        },
        onCancel() {},
    })
}

export const confirmAdd = (newProduct, dispatch) => {
    Modal.confirm({
        title: `Adding product: ${newProduct.p_code}`,
        content: 'Are you sure you want to add this product?',
        onOk() {
            if(dispatch !== undefined){
                return dispatch(addProduct(newProduct))
                .then(res => {
                    if(res.data.success) addSuccess(newProduct.p_code);
                    else { 
                        console.log("Error", res);
                        addFailPcode(newProduct.p_code);
                    }
                })
                .catch(err => {
                    console.log("Error", err);
                    addFail(newProduct.p_code);
                });
            }
            else{
                return _addProduct(newProduct)
                .then(res => {
                    if(res.data.success) addSuccess(newProduct.p_code);
                    else{
                        console.log("Error", res);
                        addFailPcode(newProduct.p_code);
                    }

                })
                .catch(err => {
                    console.log("Error", err);
                    addFail(newProduct.p_code);
                });
            } 
        },
        onCancel() {},
    })
}
