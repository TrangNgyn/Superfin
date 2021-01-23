import '../../_assets/CSS/pages/EditCompanyInfo/EditCompanyInfo.css';
import { Form, Input, Button, Modal } from 'antd';
import { useState } from 'react';

//mock API call (delete later)
const getCompanyInfo = () => {
    return {
        c_number: "1234567890",
        c_address: "21 Happy Street, NSW QLD",
        c_email: "superfin@gmail.com",
        c_TandC: "this is a very large amount of text", 
        c_about: "I'm all about this large amount of text",
        c_delivery: "Delivery me: Quote by Parkway Drive. Also a large piece of text",
        c_blog: "The large nonexistent blog"
    };
}

//Form layout stuff
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const EditCompanyInfo = () => {

    const info = getCompanyInfo();          //mock API call

    const [form] = Form.useForm();

    const [companyInfo, setCompanyInfo] = useState(info);
    const [tempInfo, setTempInfo] = useState({});
    const [edited, setEdited] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);


   

    //form functions
    const onFinish = values => {
        console.log('Success:', values);

        if(edited){
            setTempInfo(values);
            showModal();
        } 

        setEdited(false);
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    



    //modal functions
    const showModal = () => {
        setIsModalVisible(true);
    };
    
    const handleOk = () => {
        setCompanyInfo(tempInfo);
        setTempInfo({});
        setIsModalVisible(false);
    };
    
    const handleCancel = () => {
        form.resetFields();
        setTempInfo({});
        setIsModalVisible(false);
    };
  





    return (
        <div>
            <Modal title="Company Info Edited" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Information within this page has been changed. Are you sure you wish to commit these changes?</p>
            </Modal>

            <h1 className="eci-text">Edit Company Information</h1>

            <p className="eci-text">The input fields contain the current company information. Edit these fields if you wish to make changes.</p>

            <Form
                {...layout}
                onChange={() => {
                    setEdited(true);
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                initialValues={ companyInfo }
                style = {{fontWeight: "bold"}}>
                
                <Form.Item label="Company Number" name="c_number">
                    <Input style = {{width: "500px"}} maxLength={20}/>
                </Form.Item>

                <Form.Item label="Company Address" name="c_address">
                    <Input  style = {{width: "500px"}} maxLength={500}/>
                </Form.Item>

                <Form.Item label="Company Email" name="c_email">
                    <Input  style = {{width: "500px"}} maxLength={50}/>
                </Form.Item>

                <Form.Item label="Terms and Conditions" name="c_TandC">
                    <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                </Form.Item>

                <Form.Item label="About Page Text" name="c_about">
                    <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                </Form.Item>

                <Form.Item label="Delivery and Dispatch" name="c_delivery" >
                    <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                </Form.Item>

                <Form.Item label="Company Blog" name="c_blog">
                    <Input.TextArea style = {{width: "500px"}} rows = {6} maxLength={30000}/>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit"> Set Company Information </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default EditCompanyInfo;