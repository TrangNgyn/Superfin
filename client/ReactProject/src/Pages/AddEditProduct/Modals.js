import { Modal} from 'antd';
import { onRemove } from './Functions'; 
import { history } from '../../_helpers/history';
import { _editProduct } from './Functions';
import { editProduct } from '../../_actions/productActions'; 

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

export const editSuccess = p_code => {
    Modal.info({
        title: "Edit Successful",
        content: `Successfully edited product: ${p_code}`,
        okText: "Ok",
        onOk(){ history.push('/manageProducts') }
    });
}

export const editFail = p_code => {
    Modal.info({
        title: "ERROR",
        content: `There was a problem editing product: ${p_code}. Please try again or contact support.`,
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