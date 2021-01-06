import '../../_assets/CSS/pages/ResetPasswordConfirmation/ResetPasswordConfirmation.css';

const ResetPasswordConfirmation = () => {
    return (
        <div>
            <div style = {{height: "5px"}}/>

                <div className="rpc-text-wrapper">
                    <h1 className="rpc-text">Reset Password</h1>
                </div>

                <div id="rpc-devider-1"/>

                <div className="rpc-text-wrapper">
                    <div className="rpc-text" style={{fontSize: "17px"}}>
                        A link as been sent to you registered email address
                    </div>

                    <div className="rpc-text" style={{fontSize: "17px", top:"30px"}}>
                        Please click <b id = "rpc-login-link">here</b> to login
                    </div>
                </div>
        </div>
    );
}

export default ResetPasswordConfirmation;