import { Form, Input, Button, Modal} from 'antd';

//Layout stuff//
const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 14
    }
};

const actionButtonsLayout = {
    wrapperCol: {
        span: 22
    }
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
        <>
            <div className="page-title-holder with-divider center-page">
                <h1>Re-enter Password</h1>
            </div>

            <Form
                {...layout}
                name="authentication-form"
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
                
                <Form.Item {...actionButtonsLayout}>
                    <Button type="primary" htmlType="submit">Reset</Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default ReenterPassword;