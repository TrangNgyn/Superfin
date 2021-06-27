import { Modal} from 'antd';
import { onRemove } from './Functions'; 
import { history } from '../../_helpers/history';
import { _editProduct, _addProduct } from './Functions';
import { editProduct, addProduct } from '../../_actions/productActions'; 
import { _logout } from '../../_services/SharedFunctions';

export const imageModal = (src, file, fileList, updateFileList, product, setProduct) => {           //displays the preview of the image
    Modal.confirm({
        title: 'Image Preview',
        icon: null,
        content: <img alt="example" style={{ width: '100%' }} src={src} />,
        okText:"Keep Image",
        cancelText: "Delete Image",
        onOk() {},
        onCancel() {
            onRemove(file, fileList, updateFileList, product, setProduct)
        },
    });
}

const editSuccess = p_code => {                                 
    Modal.info({
        title: "Edit Successful",
        content: `Successfully edited product: ${p_code}`,
        okText: "Ok",
        onOk(){ history.push('/admin') }
    });
}

const addSuccess = p_code => {
    Modal.info({
        title: "Add Successful",
        content: `Successfully added product: ${p_code}`,
        okText: "Ok",
        onOk(){ history.push('/admin') }
    });
}


const editFail = p_code => {
    Modal.info({
        title: "ERROR",
        content: `There was a problem editing product: ${p_code}. Please try again or contact support.`,
        okText: "Ok",
        onOk(){ history.push('/admin') }
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
        onOk(){ history.push('/admin') }
    });
}

 

export const confirmEdit = (newProduct, formData, access_token, updateAuth, dispatch) => {                //confirms the edit
    const config = { 
        headers:{ 
            authorization : `Bearer ${access_token}`,
            'content-type': 'multipart/form-data'
        }
    };

    Modal.confirm({
        title: `Editing product: ${newProduct.p_code}`,
        content: 'Are you sure you want to make these edits?',
        onOk() {
            if(dispatch !== undefined){                                     //if dispatch is defined then need to send product to the redux store (as well as the db)
                
                return dispatch(editProduct(newProduct, formData, access_token, updateAuth))
                .then(res => {
                    if(res.data.success){
                        editSuccess(newProduct.p_code);
                    } 
                    else { 
                        console.log("Error", res);
                        editFail(newProduct.p_code);
                    }
                })
                .catch(err => {
                    console.log("Error", err);
                    if(err.response.status === 401) _logout(updateAuth);
                    else editFail(newProduct.p_code);
                });
            }
            else{                                               //else just push it to the db
                return _editProduct(formData, config)
                .then(res => {
                    if(res.data.success) editSuccess(newProduct.p_code);
                    else{
                        console.log(res);
                        editFail(newProduct.p_code);
                    }
                })
                .catch(err => {
                    console.log(err);
                    if(err.response.status === 401) _logout(updateAuth);
                    else editFail(newProduct.p_code);
                });
            } 
        },
        onCancel() {}
    })
}

export const confirmAdd = (newProduct, formData, access_token, updateAuth, dispatch) => {
    const config = { headers:{ authorization : `Bearer ${access_token}` }};

    Modal.confirm({
        title: `Adding product: ${newProduct.p_code}`,
        content: 'Are you sure you want to add this product?',

        onOk() {
            if(dispatch !== undefined){                                             //if dispatch is defined need to send it to the redux store (as well as the db)
                return dispatch(addProduct(formData, newProduct, access_token))
                .then(res => {
                    if(res.data.success) addSuccess(newProduct.p_code);
                    else { 
                        console.log("Error", res);
                        addFailPcode(newProduct.p_code);
                    }
                })
                .catch(err => {
                    console.log("Error", err);
                    if(err.response.status === 401) _logout(updateAuth);
                    else addFail(newProduct.p_code);
                });
            }
            else{                                                                 //else just push it directly to the db
                return _addProduct(formData, config)
                .then(res => {
                    if(res.data.success) addSuccess(newProduct.p_code);
                    else{
                        console.log("Error", res);
                        addFailPcode(newProduct.p_code);
                    }

                })
                .catch(err => {
                    console.log("Error", err);
                    if(err.response.status === 401) _logout(updateAuth);
                    else addFail(newProduct.p_code);
                });
            } 
        },
        onCancel() {},
    })
}