import React, { useState, useEffect } from 'react';
import { Upload, Button, Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import '../../_assets/CSS/pages/AddEditProduct/AddEditProduct.css';
import { EDIT, ADD } from './PageStates';
import { history } from '../../_helpers/history'; 
import { getProduct, _getProduct, onPriceChange, onPreview, beforeUpload, onRemove, setFormValues, checkProductsEqual, getProductId } from './Functions';
import { getAllCategories } from '../../_actions/categoryActions';
import { onlyNumbers } from '../../_services/SharedFunctions';
import { confirmEdit, confirmAdd } from './Modals'; 

import { createFormData } from './Functions';






const AddEditProduct = () => {
    
    const { p_code } = useParams();
    const dispatch = useDispatch();

    const productsList = useSelector(state => state.productState.products);
    const categories = useSelector(state => state.categoryState.categories);

    const [pageState, setPageState] = useState(null);
    const [product, setProduct] = useState(null);
    const [fileList, updateFileList] = useState([]);
    

    const [form] = Form.useForm();

    useEffect(() => {                                                //Changes the page state to edit or Add. Will also determine if API call necessary
        if(p_code){
            if(productsList.length !== 0){
                const product = _getProduct(p_code, productsList);
                if(product !== undefined){
                    setProduct(product);
                    setPageState(EDIT);
                }
                else{
                    history.push('/editAddProducts');
                    window.location.reload();
                }                                
            }
            else getProduct(p_code, setProduct, setPageState);

        }
        else setPageState(ADD);

        if(!categories.length) dispatch(getAllCategories());
    }, [categories.length, dispatch, p_code, productsList]);

    useEffect(() => {                                                       //sets the form values if in edit mode
        if(pageState === EDIT) setFormValues(form, product, categories);
    }, [categories, product, form, pageState]);

    let selectCategories = <></>;                                           //dynamically displays the category choices
    if(categories.length !== 0){
        selectCategories = categories.map(p => {
            return <Select.Option key={p.c_name} value={p.p_categories}>{p.c_name}</Select.Option>
        })
    }





    const onFinish = newProduct => {                                                    //handles form submission
        newProduct.p_categories = getProductId(newProduct.p_categories, categories);

       /* if(pageState === EDIT){
            newProduct.p_code = product.p_code;

            if(!checkProductsEqual(newProduct, product)){
                if(productsList.length !== 0) confirmEdit(newProduct, dispatch);    //if the Store contains the products, need to update this as well as do API call                                                                                    
                else confirmEdit(newProduct);    //if the Store does not contain products, just need to do API call. do not need to update store   
            }
        }*/
        
        if(pageState === ADD){
            let formData = createFormData(newProduct, fileList);
            
            for(let i = 0; i < fileList.length; i++){
                newProduct.p_image_uri[i] = URL.createObjectURL(fileList[i].originFileObj);
            }
           
            if(productsList.length !== 0) confirmAdd(newProduct, formData, dispatch);
            else confirmAdd(newProduct, formData);
        }
    };





    
    return (
        <div>
            {pageState === EDIT ? <h1 id="ae-product-header-title">Editing Product: {product.p_code}</h1> : <></>}
            {pageState === ADD ? <h1 id="ae-product-header-title">Add Product</h1> : <></>}

            <Form
                encType='multipart/form-data'
                form = {form}
                onFinish={onFinish}
                onFinishFailed={err => { console.log("Failed submit", err) }}
            >
                <div id="ae-product-form-wrapper">
                    <div className="ae-product-form">
                        <div className="ae-product-input">
                            <div><i style = {{color: 'red'}}>*</i> Product Name</div> 

                            <Form.Item 
                                name="p_name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the name of the product',
                                        validateTrigger: "onSubmit",
                                        whitespace: true
                                    }
                            ]}>
                                <Input style ={{width:"500px"}}/>
                            </Form.Item>
                        </div>
                        
                        {
                            pageState === ADD
                            ?   <div>  
                                    <div><i style = {{color: 'red'}}>*</i> Product Code</div> 
                                    <Form.Item 
                                        name="p_code"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input the product code',
                                                whitespace: true,
                                                validateTrigger: "onSubmit",
                                                
                                            }
                                    ]}>
                                        <Input style ={{width:"500px"}}/>
                                    </Form.Item>
                                </div>
                            :   <></>
                        }

                        <div> Units Sold
                            <Form.Item 
                                name="p_units_sold"
                                rules={[
                                    {
    
                                        message: 'No white spaces',
                                        validateTrigger: "onSubmit",
                                        whitespace: true
                                    }
                            ]}>
                                <Input onChange={e => {onlyNumbers(e, form, 'p_units_sold')}} maxLength={10} style ={{width:"500px"}}/>
                            </Form.Item>
                        </div>
                        
                        <div style = {{ width: "500px", paddingTop: "4%"}}>  
                            <Form.Item 
                                name="p_image_uri"
                                getValueFromEvent={info => { return info.fileList }}                                      //this name is subject to change
                                rules={[
                                    {
                                        validateTrigger: 'onSubmit',
                                        validator: async (_) => {
                                            if (fileList.length <= 0){
                                                return Promise.reject(new Error("You must have at least one image uploaded"));
                                            } 
                                        }
                                    }
                                ]}  
                            >
                                <Upload 
                                    fileList={fileList}
                                    listType = "picture-card"
                                    onPreview = {file => { onPreview(file, fileList, updateFileList) }}
                                    onChange = {info => { updateFileList([...info.fileList]) }}
                                    beforeUpload = {beforeUpload}
                                    onRemove = {file => {onRemove(file, fileList, updateFileList)}}
                                >
                                    {fileList.length < 6 && '+ Drag image or click'} 
                                </Upload>
                            </Form.Item>
                        </div>
                    </div>

                    <div className="ae-product-form">
                        <div className="ae-product-input">
                            <div><i style = {{color: 'red'}}>*</i> Unit Price</div> 

                            <Form.Item 
                                name="p_price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the price of the product',
                                        validateTrigger: "onSubmit",
                                        whitespace:true
                                    },

                                    {
                                        validator: async (_, value) => {
                                            if (isNaN(value)){
                                                return Promise.reject(new Error('Please only write numbers to the second decimal place'));
                                            } 
                                        }
                                    }
                            ]}>
                                <Input onChange={e => {onPriceChange(e, form)}} maxLength={10}/>
                            </Form.Item>
                        </div>

                        <div>
                            <div><i style = {{color: 'red'}}>*</i> Category</div>

                            <Form.Item 
                                name="p_categories"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the product category',
                                        validateTrigger: "onSubmit"
                                    }
                            ]}>
                                <Select placeholder="Select a category">
                                    {selectCategories}
                                </Select>
                            </Form.Item>
                        </div>
                     
                        <div> Product Description
                            
                            <Form.Item 
                                name="p_description"
                                rules={[
                                    {
                                        whitespace: true,
                                        message: 'No white spaces',
                                        validateTrigger: "onSubmit"
                                    }]}
                            >
                                <Input.TextArea style ={{width:"500px", height: "125px"}}/>
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" >
                                <b>
                                    {pageState === EDIT ? <>Edit </> : <></> }
                                    {pageState === ADD ? <>Add </> : <></> }
                                    Product
                                </b>
                            </Button>
                        </Form.Item>
                    </div>
                </div> 
            </Form>   
        </div>
    );
}
   
export default AddEditProduct;