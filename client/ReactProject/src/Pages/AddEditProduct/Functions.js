import axios from 'axios';
import { EDIT } from './PageStates';
import { history } from '../../_helpers/history';
import { imageModal } from './Modals';
import { message } from 'antd';

/*
const config = {            
    headers: {
        'content-type': 'multipart/form-data'
    }
}*/

export const getProduct = (p_code, setProduct, setPageState) => {               //returns an individual product
    axios.post('/api/products/product-by-id', { 
        p_code: p_code
    })
    .then(res => {
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

export const _editProduct = (product, config) => {                                //api for edit a product
    return axios.post('/api/products/edit-product', product, config);
}

export const _addProduct = (formData, config) => {                                        //api for add a product
    return axios.post('api/products/add-product', formData, config);
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

export const onPreview = async (file, fileList, updateFileList, product, setProduct) => {        //handles image preview
    let src = file.url;
    if(!src){
        src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        imageModal(src, file, fileList, updateFileList);                //viewing a new file
    }
    else imageModal(src, file, fileList, updateFileList, product, setProduct);                //viewing a pre-established file
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

export const onRemove = (file, fileList, updateFileList, product, setProduct) => {               //handles image removal
    const index = fileList.indexOf(file);

    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    updateFileList(newFileList);

    if(file.uid.startsWith("EST")){                             //delete from p_image_uri if file is pre-established (not a newly added file)
        const new_p_image_uri = product.p_image_uri.slice();
        const newProduct = product;

        new_p_image_uri.splice(index, 1);
        newProduct.p_image_uri = new_p_image_uri;

        setProduct(newProduct);
    }
}

export const setFormValues = (form, product) => {                 //sets the values of the form to appropriate values when in edit mode
    let p_units_sold = "";

    form.setFieldsValue({
        p_name: product.p_name,
        p_code: product.p_code,
        p_units_sold: p_units_sold,
        p_price: product.p_price.toString(),
        p_categories: product.p_categories,
        p_description: product.p_description,
        p_unit: product.p_unit,
        p_image_uri: []
    });
}

export const checkProductsEqual = (product_a, product_b, numberOfNewImages, originalFileLength) => {                   //checks if the product has been edited or not
        if(product_a.p_code === product_b.p_code && 
            product_a.p_categories === product_b.p_categories && 
            product_a.p_name === product_b.p_name &&
            product_a.p_description === product_b.p_description &&
            JSON.stringify(product_a.p_image_uri) === JSON.stringify(product_b.p_image_uri) &&           
            product_a.p_price === product_b.p_price.toString() && 
            product_a.p_image_uri.length + numberOfNewImages === product_b.p_image_uri.length &&
            product_a.p_image_uri.length === originalFileLength &&
            product_a.p_unit === product_b.p_unit &&
            JSON.stringify(product_a.p_size) === JSON.stringify(product_b.p_size)){
                return true
            }
            return false;   
}

export const createFormData = (newProduct, fileList) => {               //create form data for add mode
    let formData = new FormData();

    newProduct.p_size.forEach(s => {
        formData.append('p_size[]', s);               //appending all sizes to the form data
    });

    [...fileList].forEach(image => {
        formData.append("images", image.originFileObj);
    });

    formData.append("p_name", newProduct.p_name);
    formData.append("p_code", newProduct.p_code);
    formData.append("p_units_sold", newProduct.p_units_sold);
    formData.append("p_price", newProduct.p_price);
    formData.append("p_categories", newProduct.p_categories);
    formData.append("p_description", newProduct.p_description);
    formData.append("p_unit", newProduct.p_unit);

    return formData;
}

export const createFormDataEdit = (newProduct, product, fileList) => {              //create form data for edit mode
    let formData = new FormData();

    formData.append("p_name", newProduct.p_name);
    formData.append("p_code", newProduct.p_code);
    formData.append("p_units_sold", newProduct.p_units_sold);
    formData.append("p_price", newProduct.p_price);
    formData.append("p_categories", newProduct.p_categories);
    formData.append("p_description", newProduct.p_description);
    formData.append("p_unit", newProduct.p_unit);

    newProduct.p_size.forEach(s => {
        formData.append('p_size[]', s);               //appending all sizes to the form data
    });

    if(product.p_image_uri <= 0) formData.append("p_image_uri", []);
    else{
        [...product.p_image_uri].forEach(image => {
            formData.append("p_image_uri", image); 
        });
    }
    
    [...fileList].forEach(image => {    //If the image file starts with EST it is a preexisting image that does not need to be added
        if(!image.uid.startsWith('EST')){
            formData.append("image", image.originFileObj);
            newProduct.p_image_uri.push(URL.createObjectURL(image.originFileObj));       //adding blobs to newProduct so the store contains image URLS 
        } 
    });

    return formData;
}

export const checkBlob = (p_image_uri) => {                                     //for checking the p_image_uri field for blobs
    for(let i = 0; i < p_image_uri.length; i++){
        if(p_image_uri[i].includes("blob")){
            return true;
        }
    }
    return false;
}

export const addUriToFileList = (p_image_uri, updateFileList) => {              //adds pretend images to the updload input 
    const newFileList = [];
    p_image_uri.forEach((uri, i) => {
        newFileList.push(
            {
                uid: `EST_${i}`,
                name: `image_${i}`,
                status: 'done',
                url: uri,
            }
        )
    });
    updateFileList(newFileList);
}

export const deleteSizeOption = (s, sizeOptions, setSizeOptions) => {
    const temp = [...sizeOptions];
    const i = temp.indexOf(s);
    if(i !== -1) temp.splice(i, 1);
    setSizeOptions(temp);
}

export const addSizeOption = (sizeOptions, setSizeOptions) => {
    const s = document.getElementById('size-option-input').value;
    if(s === "") return;
    setSizeOptions([...sizeOptions, s]);
}