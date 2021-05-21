import React, { useState, useEffect } from 'react';
import { Upload, Button, Form, Input, Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../../_assets/CSS/pages/AddEditProduct/AddEditProduct.css';
import { EDIT, ADD } from './PageStates';
import { history } from '../../_helpers/history'; 
import { 
    getProduct, 
    _getProduct, 
    onPriceChange, 
    onPreview, 
    beforeUpload, 
    onRemove, 
    setFormValues, 
    checkProductsEqual, 
    addUriToFileList, 
    createFormDataEdit,
    deleteSizeOption,
    addSizeOption
} from './Functions';
import { getAllCategories } from '../../_actions/categoryActions';
import { removeSpaces } from '../../_services/SharedFunctions';
import { confirmEdit, confirmAdd } from './Modals'; 
import { createFormData, checkBlob } from './Functions';
import { useAuth, useAuthUpdate } from '../../SharedComponents/AuthContext/AuthContext';

const { Option, OptGroup } = Select;





const AddEditProduct = () => {

    const { p_code } = useParams();

    const dispatch = useDispatch();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    const productsList = useSelector(state => state.productState.products);
    const categories = useSelector(state => state.categoryState.categories);
    const emptyCategories = useSelector(state => state.categoryState.empty);        //for checking there are categories available 

    const [parentCategoires, setParentCategories] = useState([]);
    const [childCategories, setChildCategories] = useState([]);

    const [pageState, setPageState] = useState(null);
    const [product, setProduct] = useState(null);
    const [fileList, updateFileList] = useState([]);
    const [originalImageListLength, setOriginalImageListLength] = useState(0);      //used for checking if the newly edited file differs from the original
    const [newPage, setNewPage] = useState(true);                 //checks if the page is fresh 
    const [sizeOptions, setSizeOptions] = useState([]);

    const [form] = Form.useForm();





    useEffect(() => {                                                //Changes the page state to edit or Add. Will also determine if API call necessary
        if(p_code){
            if(productsList.length !== 0){                              //dont make API call if redux store is populated
                const product = _getProduct(p_code, productsList);
                if(checkBlob(product.p_image_uri) && newPage) window.location.reload(); //checks if the file list contains a blob. will not trigger unless the page is in a fresh state
                if(product !== undefined){
                    setProduct(product);            
                    setPageState(EDIT);
                }
                else{                                   //if some nonsense is typed in the URL
                    history.push('/editAddProducts');
                    window.location.reload();
                }                                
            }
            else getProduct(p_code, setProduct, setPageState);
        }
        else setPageState(ADD);

        if(!categories.length && !emptyCategories) dispatch(getAllCategories());        //sets up the parent and child categories in the select input
        else{   
            if(!parentCategoires.length){
                const parents = categories.filter(c => { return c.path === null });
                setParentCategories(parents);
            }
            if(!childCategories.length){
                const children = categories.filter(c => { return c.path !== null; });
                setChildCategories(children);
            }
        }

    }, [categories.length, dispatch, p_code, productsList, categories, childCategories.length, emptyCategories, parentCategoires.length, newPage]);
        
    useEffect(() => {                                                       
        if(pageState === EDIT && newPage){
            setFormValues(form, product, categories);       //sets the form values if in edit mode
            setOriginalImageListLength(product.p_image_uri.length);      
            setSizeOptions(product.p_size);
            addUriToFileList(product.p_image_uri, updateFileList);     //populates the file list
            
        } 
    }, [categories, product, form, pageState, newPage]);





    const selectCategories = parentCategoires.map(p => {                            //Options for the categories select input
        const sub_categories = childCategories
            .filter(c => { return c.path === `,${p.c_name},`})
            .map(c => {
                return <Option key={c._id} value={c._id}>{c.c_name}</Option>
            });

        return <OptGroup key={p._id} label={p.c_name}>{sub_categories}</OptGroup>
    });

    const sizeOptionsList = sizeOptions.map((s, i) => {
        return(
            <div key={i}>
                <span>{s}</span> 
                <Button type='text' danger onClick={() => {deleteSizeOption(s, sizeOptions, setSizeOptions)}}>x</Button>
            </div>
        );
    });

    
        




    const onFinish = newProduct => {                                                    //handles form submission
        newProduct.p_size = sizeOptions;                //adding size options to the form data

        if(pageState === EDIT){
            newProduct.p_code = product.p_code;             //set the new form p_code and p_image_uri fields to those of the original
            newProduct.p_image_uri = product.p_image_uri;   
            let number_of_new_images = 0;                   //used for checking if the product has been edited
         
            const formData = createFormDataEdit(newProduct, product, fileList);

            [...fileList].forEach(image => {   
                if(!image.uid.startsWith('EST')) number_of_new_images++;          
            });

            if(!checkProductsEqual(newProduct, product, number_of_new_images, originalImageListLength)){
                setNewPage(false);
                if(productsList.length !== 0) confirmEdit(newProduct, formData, auth.access_token, updateAuth, dispatch);    //if the Store contains the products, need to update this as well as do API call                                                                                 
                else confirmEdit(newProduct, formData, auth.access_token, updateAuth);    //if the Store does not contain products, just need to do API call. do not need to update store   
            }
        }

        if(pageState === ADD){                                      //if the page is in add mode, add the product
            setNewPage(false);
            let formData = createFormData(newProduct, fileList);
            
            for(let i = 0; i < fileList.length; i++)  newProduct.p_image_uri[i] = URL.createObjectURL(fileList[i].originFileObj);
           
            if(productsList.length !== 0) confirmAdd(newProduct, formData, auth.access_token, updateAuth, dispatch,);       //if there are products in redux store, add product there as well
            else confirmAdd(newProduct, formData, auth.access_token, updateAuth);              //else just make the request as usual
        };
    }






    return (
        <div>
            {pageState === EDIT ? <h1 id="ae-product-header-title">Editing Product: {product.p_code}</h1> : <></>}
            {pageState === ADD ? <h1 id="ae-product-header-title">Add Product</h1> : <></>}

            <Form
                encType='multipart/form-data'
                form = {form}
                onFinish={onFinish}
                onFinishFailed={err => ("Failed submit", err)}
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
                                        <Input onChange={e => {removeSpaces(e, form, 'p_code')}} style ={{width:"500px"}}/>
                                    </Form.Item>
                                </div>
                            :   <></>
                        }

                        <div><i style = {{color: 'red'}}>*</i> Units per item
                            <Form.Item 
                                name="p_unit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please add value to this field',
                                        validateTrigger: "onSubmit",
                                        whitespace: true
                                    },
                                    {
                                        validator: async (_, p_unit) => {
                                            const reg = /^\d+?\s\w+?\/\w+$/;
                                            if (!reg.test(p_unit) && p_unit !== "" && p_unit !== undefined){
                                                return Promise.reject(new Error("Please user the correct formatting"));
                                            }
                                        },
                                        validateTrigger: "onSubmit"
                                    }
                            ]}>
                                <Input placeholder="Valid input e.g., 10 items/box, 20 bags/container" maxLength={30}/>
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
                                    onPreview = {file => { onPreview(file, fileList, updateFileList, product, setProduct) }}
                                    onChange = {info => { updateFileList([...info.fileList]) }}
                                    beforeUpload = {beforeUpload}
                                    onRemove = {file => {onRemove(file, fileList, updateFileList, product, setProduct)}}
                                >
                                    {fileList.length < 6 && '+ Drag image or click'} 
                                </Upload>
                            </Form.Item>
                        
                            <div><i style = {{color: 'red'}}>*</i> Size Options</div> 
                            <Form.Item 
                                name="p_size"
                                rules={[
                                    {

                                        validator: async (_,) => {
                                            if (sizeOptions.length <= 0){
                                                return Promise.reject(new Error('Must have at least 1 size option'));
                                            } 
                                        },
                                        validateTrigger: "onSubmit",
                                        message: 'Please input at least 1 size option'
                                    }
                            ]}>
                                <Input id="size-option-input" placeholder={"Enter size options for this product"} style ={{width:"500px"}}/>     
                            </Form.Item>

                            <Button onClick={() => {addSizeOption(sizeOptions, setSizeOptions)}}>Add</Button>

                            <div style={{textAlign: 'left', paddingTop: '2%'}}>
                                {sizeOptionsList}
                            </div>
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
                                <Input maxLength={6} onChange={e => {onPriceChange(e, form)}}/>
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