import axios from 'axios';
import { EDIT } from './PageStates';
import { history } from '../../_helpers/history';
import { imageModal } from './Modals';
import { message } from 'antd';

export const getProduct = (p_code, setProduct, setPageState) => {
    console.log("getting product " + p_code);
    
    axios.post('/api/products/product-by-id', { 
        p_code: p_code
    })
    .then(res => {
        console.log(res);
        if(res.data.p_code === p_code){
            setProduct(res.data);
            setPageState(EDIT);
        }
        else{
            history.push('/editAddProducts');
            window.location.reload();
        } 
    })
    .catch(err => {
        console.log(err);
        history.push('/editAddProducts');
        window.location.reload();
    })
}

export const _getProduct = (p_code, productsList) => {
    return productsList.find(product => {
        return product.p_code === p_code;
    });
}

export const onPriceChange = (e, form) => {                            //controling user price input
    const reg = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
    let str = e.target.value;

    if (str === '' || reg.test(str)) form.setFieldsValue({p_price: str});
    else{
        str = str.substring(0, str.length - 1);
        if(!reg.test(str)) form.setFieldsValue({p_price: ''});
        else form.setFieldsValue({p_price: str});   
    }  
}

export const onPreview = async (file, fileList, updateFileList) => {
    let src = file.url;
    if(!src){
        src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        imageModal(src, file, fileList, updateFileList);
    }  
}

export const beforeUpload = (file, fileList) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if(!isJpgOrPng) message.error('You can only upload JPG/PNG file!');

    const isLt2M = file.size / 1024 / 1024 < 2;
    if(!isLt2M) message.error('Image must smaller than 2MB!');

    if(!isJpgOrPng || !isLt2M) {
        file = null;
        fileList.pop();
    }

    return false;
}

export const onRemove = (file, fileList, updateFileList) => {
    const newFileList = fileList.slice();
    newFileList.splice(fileList.indexOf(file), 1);
    updateFileList(newFileList);
}