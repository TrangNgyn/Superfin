import React, { useState, useEffect } from 'react';
import { Upload, Button, Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import '../../_assets/CSS/pages/AddEditProduct/AddEditProduct.css';
import { useParams } from 'react-router-dom';
import { EDIT, ADD } from './PageStates';
import { history } from '../../_helpers/history'; 
import { getProduct, _getProduct, onPriceChange, onPreview, beforeUpload, onRemove } from './Functions';
import { getAllCategories } from '../../_actions/categoryActions';
import { onlyNumbers } from '../../_services/SharedFunctions';


const AddEditProduct = () => {
    
    const { p_code } = useParams();
    const dispatch = useDispatch();

    const productsList = useSelector(state => state.productState.products);
    const categories = useSelector(state => state.categoryState.categories);

    const [pageState, setPageState] = useState(null);
    const [product, setProduct] = useState(null);
    const [fileList, updateFileList] = useState([]);


    const [form] = Form.useForm();

    useEffect(() => {
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
    }, []);

    let selectCategories = <></>;
    if(categories.length !== 0){
        selectCategories = categories.map(p => {
            return <Select.Option key={p.c_name} value={p.c_name}>{p.c_name}</Select.Option>
        })
    }


    const onFinish = info => {                      //handles form submission
        console.log(info);
    };

    const onFinishFailed = errorInfo => {                     //handles form submission fail
        console.log('Submission Failed:', errorInfo);
    }


    /*
    const handleEditOk = () => {
        const values = form.getFieldsValue();
        console.log('Success:', values);

        console.log("clearing form fields...");
        form.resetFields();
        updateFileList([]);
    }


    const handleSubmitOk = () => {                         
        //submit the form here
        const values = form.getFieldsValue();
        console.log('Success:', values);

        console.log("clearing form fields...");
        form.resetFields();
        updateFileList([]);

    };*/

   


    









    
      return (
        <div>
            {pageState === EDIT ? <h1 id="ae-product-header-title">Editing Product: {product.p_code}</h1> : <></>}
            {pageState === ADD ? <h1 id="ae-product-header-title">Add Product</h1> : <></>}

            <Form
                form = {form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
             
            >
                <div id="ae-product-form-wrapper">
                    <div className="ae-product-form">
                        <div className="ae-product-input"> Product Name
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
                                <Input onChange={e => {onlyNumbers(e, form, 'p_units_sold')}} maxLength={4} style ={{width:"60px"}}/>
                            </Form.Item>
                        </div>
                        
                        <div style = {{ width: "500px", paddingTop: "4%"}}>  
                            <Form.Item 
                                name="p_image_uri"
                                getValueFromEvent={info => { return info.fileList }}                                      //this name is subject to change
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
                        <div className="ae-product-input"> Product Code
                                <Form.Item 
                                    name="p_code"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input the product code',
                                            whitespace: true,
                                            validateTrigger: "onSubmit"
                                        }
                                ]}>
                                    <Input style ={{width:"500px"}}/>
                                </Form.Item>
                         </div>

                        <div> Unit Price
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

                        <div> Product Category
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
                            <Button type="primary" htmlType="submit" ><b>Add/Edit Product</b></Button>
                        </Form.Item>
                    </div>
                </div> 
            </Form>   
        </div>
      );
    }
   
export default AddEditProduct;