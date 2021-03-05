import axios from 'axios';
import { EDIT } from './PageStates';
import { history } from '../../_helpers/history';
import { imageModal } from './Modals';
import { message } from 'antd';
import { getCategoryName } from '../../_services/SharedFunctions';

export const getProduct = (p_code, setProduct, setPageState) => {               //returns an individual product
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

export const _editProduct = product => {                                //edits a product
    return axios.post('/api/products/edit-product', product);
}

export const _addProduct = product => {
    return axios.post('api/products/add-product', product);
}


export const _getProduct = (p_code, productsList) => {                  //gets product from the Store
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

export const onPreview = async (file, fileList, updateFileList) => {        //handles image preview
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

export const beforeUpload = (file, fileList) => {                                       //handles image upload
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

export const onRemove = (file, fileList, updateFileList) => {               //handles image removal
    const newFileList = fileList.slice();
    newFileList.splice(fileList.indexOf(file), 1);
    updateFileList(newFileList);
}

export const setFormValues = (form, product, categories) => {                 //sets the values of the form to appropriate product values
    form.setFieldsValue({
        p_name: product.p_name,
        p_code: product.p_code,
        p_units_sold: product.p_units_sold.toString(),
        p_price: product.p_price.toString(),
        p_categories: getCategoryName(product.p_categories, categories),
        p_description: product.p_description,
        p_image_uri: []
    });
}

export const checkProductsEqual = (product_a, product_b) => {                   //checks if the product has been edited or not
        if(product_a.p_code === product_b.p_code && 
            product_a.p_categories === product_b.p_categories && 
            product_a.p_name === product_b.p_name &&
            product_a.p_description === product_b.p_description &&
            // JSON.stringify(product_a.p_image_uri) === JSON.stringify(product_b.p_image_uri) &&            //need to come back to this when images are ready
            product_a.p_price === product_b.p_price.toString() && 
            product_a.p_units_sold === product_b.p_units_sold.toString()){
                return true
            }
            return false;   
}

export const getProductId = (c_name, categories) => {
    const category = categories.find(category => {
        return category.c_name === c_name;
    });

    return category._id;
}
