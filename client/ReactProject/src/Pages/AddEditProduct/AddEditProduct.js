import '../../_assets/CSS/pages/AddEditProduct/AddEditProduct.css';
import { Upload, message, Input, Button, Form} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {useState} from 'react';
import AltImage from '../../_assets/Images/No_Image.jpg';

const AddEditProduct = () => {
    const [fileList, setFileList] = useState([]);             //holds the image file

    const onRemove = () => { setFileList([]) }

    const beforeUpload = file => {                                                    //checks file before adding to state
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if(!isJpgOrPng) message.error('You can only upload JPG/PNG file!');

        const isLt2M = file.size / 1024 / 1024 < 2;
        if(!isLt2M) message.error('Image must smaller than 2MB!');

        if(isJpgOrPng && isLt2M)setFileList([file]);
        else if(fileList) return false;
        else setFileList([]);

        return false;
    }

    const normFile = (e) => { return  e.fileList[e.fileList.length -1] };       //This is so the form submits a single image file rather than its default array

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }

    const draggerPlaceHolder = (
        <div className="ae-product-dragger-inner">
            <UploadOutlined />
            <h1>Drag image file here or click to select file</h1>
            <h3>Max file size: 2mb</h3>
            <h3>File types supported: .jpeg .png</h3>
        </div>
    );


  






  return(
    <div>
        <div style = {{height: "5px"}}/>
        <div id="ae-product-title-wrapper">
            <h1 id="ae-product-header-title">Add Product</h1>
        </div>
        <div style = {{height: "75px"}}></div>




        <Form 
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
                remember: true,
            }}
        >
            
        
        

            <div style={{display: "flex", paddingBottom: "40px"}}>                          {/*Item name input */}
                <div className="ae-product-input-container">
                    <div className="ae-product-input-title">Item Name</div>
                    <Form.Item 
                        name="p_item_name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name of the item',
                            },
                    ]}>
                        <Input style ={{width:"500px"}}/>
                    </Form.Item>
                </div>

                <div className="ae-product-input-container">                                {/*Item code input */}
                    <div className="ae-product-input-title">Item Code</div>
                    <Form.Item
                        name="_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the item code',
                            }
                    ]}>
                        <Input type = "text" style ={{width:"500px"}}/>
                    </Form.Item>
                </div>
            </div>
            




            <div style = {{display:"flex"}}>                                                {/*Image input */}
                <div className="ae-product-input-container">        
                    <Form.Item 
                        name="p_image_uri"                                      //this name is subject to change
                        getValueFromEvent={normFile} 
                        rules={[
                            {
                                required: true,
                                message: 'Please input your image',
                            },
                    ]}>
                        <Upload.Dragger onRemove = {onRemove} beforeUpload = {beforeUpload} fileList={fileList} >
                            { fileList[0] ? <div className="ae-product-dragger-inner">
                                                <img src={URL.createObjectURL(fileList[0])} style={{height: "250px", width: "250px"}} alt={AltImage}/>
                                                <div>To remove, hover over file name below and click the trash icon</div>
                                            </div> : draggerPlaceHolder }
                        </Upload.Dragger>
                    </Form.Item>
                    <div style ={{height: "40px"}} ></div>
                </div>





                <div className="ae-product-input-container">                                    {/*All other input fields*/}
                    <div className="ae-product-input-container-2">
                        <div className="ae-product-input-title">Unit Price</div>
                        <Form.Item
                            name="p_price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the item price',
                                }
                        ]}>
                            <Input type = "text" style ={{width:"500px"}}/>
                        </Form.Item>
                    </div>
                    
                    <div className="ae-product-input-container-2">
                        <div className="ae-product-input-title">Category</div>
                        <Form.Item
                            name="p_categories"                                            //check with Oli for correct name
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the item category',
                                }
                        ]}>
                            <Input type = "text" style ={{width:"500px"}}/>
                        </Form.Item>
                    </div>

                    <div className="ae-product-input-container-2">
                        <div className="ae-product-input-title">Description</div>
                        <Form.Item
                            name="p_description"                                            //check with Oli for correct name
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input the item description',
                                }
                        ]}>
                            <Input.TextArea type = "text" style ={{width:"500px", height: "125px"}}/>
                        </Form.Item>
                    </div>

                    <div className="ae-product-input-container-2">
                        <Form.Item>
                            <Button type="primary" htmlType="submit"><b>Add Product</b></Button>
                        </Form.Item>
                    </div>
                </div>     
            </div>
        </Form>
    </div>
  );
}

export default AddEditProduct;