import { history } from  '../../_helpers/history';
import { Form } from 'antd';

//Layout stuff//
const layout = {
    labelCol: {
      span: 10
    },
    wrapperCol: {
      span: 14
    }
};

const ResetPasswordConfirmation = () => {

    const navigateLoginPage = () => {
        history.push('/login');
    }

    return (
        <>
            <div className="page-title-holder with-divider center-page">
                <h1>Reset Password Confirmation</h1>
            </div>  
            <div className="center-with-page-title-holder">
                <p>A link as been sent to you registered email address</p>
                <p>Please click <b onClick={navigateLoginPage}>here</b> to login</p>
            </div>
                    
                
        </>
    );
}

export default ResetPasswordConfirmation;