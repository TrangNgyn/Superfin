import React, { useState } from 'react';
import { Upload, Button, message, Form, Input, Select, Modal} from 'antd';
import '../../_assets/CSS/pages/AddEditProduct/AddEditProduct.css';
import { useParams } from 'react-router-dom';









 


const AddEditProduct = () => {
    const {_id} = useParams();

    _id ? console.log("_id", _id) : console.log("no _id found, rendering a blank form"); 

    //mock fetch function for categories
    const getCategories = () => {
        return  [
            {
                c_name:"Bags",
                c_description:"Paper bags",
                c_image:"https://media.tenor.com/images/07ab3cb87a5c02b4603982a6d33ed405/tenor.gif"
            },

            {
                c_name:"Boxes",
                c_description:"Paper boxes",
                c_image:"https://media.tenor.com/images/07ab3cb87a5c02b4603982a6d33ed405/tenor.gif"
            },

            {
                c_name:"Clams",
                c_description:"Paper clamsaa",
                c_image:"https://media.tenor.com/images/07ab3cb87a5c02b4603982a6d33ed405/tenor.gif"
            }
        ];
    }

    //loading the categories
    const categories = getCategories().map(p => {
        return <Select.Option key={p.c_name} value={p.c_name}>{p.c_name}</Select.Option>
    });










   










    const [fileList, updateFileList] = useState([]);
                                                                //props and state for the image uploader
    const normFile = (info) => {
        return info.fileList;
    };
                                                            
    const props = {
        fileList,

        listType: "picture-card",

        onRemove: file => {
            const newFileList = fileList.slice();
            newFileList.splice(fileList.indexOf(file), 1);
            updateFileList(newFileList);
        },

        beforeUpload: (file, fileList) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if(!isJpgOrPng) message.error('You can only upload JPG/PNG file!');

            const isLt2M = file.size / 1024 / 1024 < 2;
            if(!isLt2M) message.error('Image must smaller than 2MB!');

            if(!isJpgOrPng || !isLt2M) {
                file = null;
                fileList.pop();
            }

            return false;
        },

        onChange: (info) => { 
            updateFileList([...info.fileList]);
        },

        onPreview: async file => {
            let src = file.url;
            if (!src) {
              src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
              });
            }
            const image = new Image();
            image.src = src;
            const imgWindow = window.open(src);
            imgWindow.document.write(image.outerHTML);
          }
      };



    





    //form stuff
    const [form] = Form.useForm();
    const [isSubmitModalVisible, setIsSubmitModalVisible] = useState(false);
    const [isEditProductVisible, setIsEditProductVisible] = useState (false);

    const onFinish = () => {                      //handles form submission
        const p_code = form.getFieldValue('p_code');
        if(check_p_codeExists(p_code)){
            showEditProduct();
            return;
        }
        else showSubmitModal();
    };

    const onFinishFailed = (errorInfo) => {                     //handles form submission fail
        console.log('Submission Failed:', errorInfo);
    }

    const check_p_codeExists = (p_code) => {
        //This will check if the product code exists. Currently is mock.
        console.log("checking p_code...");
        if(p_code === "123abc") return true;
    }

    const showEditProduct = () => {
        setIsEditProductVisible(true);
    }

    const handleEditOk = () => {
        const values = form.getFieldsValue();
        console.log('Success:', values);

        console.log("clearing form fields...");
        form.resetFields();
        updateFileList([]);

        setIsEditProductVisible(false);
    }

    const handleEditCancel = () => {
        setIsEditProductVisible(false);
    }


    const showSubmitModal = () => {             //brings up the submission modal
        setIsSubmitModalVisible(true);
    };

    const handleSubmitOk = () => {                          //handles ok click
        //submit the form here
        const values = form.getFieldsValue();
        console.log('Success:', values);

        console.log("clearing form fields...");
        form.resetFields();
        updateFileList([]);

        setIsSubmitModalVisible(false);
    };

    const handleSubmitCancel = () => {                              //handles cancel click
        setIsSubmitModalVisible(false);
        console.log("product submission cancelled");
    };

    const onPriceChange = e => {                            //controling user price input
        const reg = /^(\d+(\.\d{0,2})?|\.?\d{1,2})$/;
        let str = e.target.value;

        if (str === '' || reg.test(str)) form.setFieldsValue({p_price: str});
        else{
            str = str.substring(0, str.length - 1);
            if(!reg.test(str)) form.setFieldsValue({p_price: ''});
            else form.setFieldsValue({p_price: str});   
        }  
    }

    function hasWhiteSpace(s) {
        return /\s/g.test(s);
    }

    









    const fetchProduct = e => {
        if(check_p_codeExists(e)){
            /*make API call
            const fakeProduct = {
                p_code:"123abc",
                p_name:"Brown bag",
                p_price:"11.50",
                p_units_sold:"3",
                p_categories:"Bags",
                p_image_uri:["", "", ""],
                p_description:"Brown paper bags"
            };*/
        }
        else{
            product_does_not_exist();
        }
        
 
    }

    function product_does_not_exist() {                                           //Modal for already existing p_code
        Modal.error({
          title: 'That product cannot be found',
          content: 'Please make sure you have typed the code correctly',
        });
    }








      return (
        <div>
            <Modal title="Are you sure you want to submit this product?" visible={isSubmitModalVisible} onOk={handleSubmitOk} onCancel={handleSubmitCancel}>
                <p>Select 'Ok' to submit, or 'Cancel' to cancel form submission</p>
            </Modal>

            <Modal title="You have choosen to edit an already existing product" visible={isEditProductVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                <p>If you wish to make a new product, change the product code to something unique</p>
                <p>Select 'Ok' to make changes to product, or 'Cancel' to continue editing.</p>
            </Modal>




            <h1 id="ae-product-header-title">Add/Edit Product</h1>






 
            <div style = {{paddingLeft: "15%"}}>
                <Input.Search
                placeholder="Search a product code to edit product"
                enterButton="Search"
                onSearch={fetchProduct}
                style={{ width:"500px" }}/>
           </div>











        
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
                                    }
                            ]}>
                                <Input style ={{width:"500px"}}/>
                            </Form.Item>
                        </div>
                        
                        <div style = {{ width: "500px", paddingTop: "4%"}}>  
                            <Form.Item 
                                name="p_image_uri"
                                getValueFromEvent={normFile}                                      //this name is subject to change
                                rules={[
                                    {
                                        validator: async () => {
                                            if (fileList <= 0) return Promise.reject(new Error('Please upload an image'));
                                        }
                                    }
                                ]}>
                                <Upload {...props}>
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
                                        },
                                        {
                                            validator: async (_, value) => {
                                                if (hasWhiteSpace(value)){
                                                    return Promise.reject(new Error('This field cannot contain spaces'));
                                                } 
                                            }
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
                                    },

                                    {
                                        validator: async (_, value) => {
                                            if (isNaN(value)){
                                                return Promise.reject(new Error('Please only write numbers to the second decimal place'));
                                            } 
                                        }
                                    }
                            ]}>
                                <Input onChange={onPriceChange} maxLength={10}/>
                            </Form.Item>
                        </div>

                        <div> Product Category
                            <Form.Item 
                                name="p_categories"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the product category',
                                    }
                            ]}>
                                <Select placeholder="Select a category">
                                    {categories}
                                </Select>
                            </Form.Item>
                        </div>
                     
                        <div> Product Description
                            <Form.Item
                                name="p_description"                                  
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input the product description',
                                    }
                            ]}>
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