import '../../_assets/CSS/pages/ReenterPassword/ReenterPassword.css';
import { Form, Input, Button, Modal} from 'antd';

//Layout stuff//
const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 7,
    },
};

const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
};




const ReenterPassword = () => {

    const unMatchError = () => {
        Modal.error({
          title: 'Passwords do not match',
          content: 'Please double check you have spelt both passwords correctly',
        });
    }

    const successReset = () => {
        Modal.success({
            title: 'Success!',
            content: 'You can now use this password to log into your account',
        });
      }






    const onFinish = values => {
        if(values.newPassword !== values.reenterPassword) unMatchError()
        else{
            console.log('Success:', values); 
            successReset();
        }
    };
    
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };






    
    return (
        <div>
            <div style = {{height: "5px"}}/>

            <div id="reenter-header-title-wrapper">
                <h1 id="reenter-header-title">Re-Enter Password</h1>
            </div>

            <div id="reenter-devider-1"/>





            <Form
                {...layout}
                name="reenter-password"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{
                            required: true,
                            message: 'Please input your new password!',
                    },]}
                >
                    <Input.Password /> 
                </Form.Item>

                <Form.Item
                    label="Re-enter Password"
                    name="reenterPassword"
                    rules={[{
                        required: true,
                        message: 'Please re-enter your password!',
                    },]}
                >
                    <Input.Password />   
                </Form.Item >
                   
                <Form.Item {...tailLayout}>
                    <Button style = {{left:"28%", width:"150px"}} type="primary" htmlType="submit"> Reset Password</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default ReenterPassword;