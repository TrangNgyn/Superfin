import { Modal } from 'antd';
import { history } from '../../_helpers/history';

export const emailTakenModal = () => {
    Modal.confirm({
        title: 'Email taken!',
        content: (
            <div>This email is already in our system. Please either login or use a different email addresss</div>
        ),
        okText: 'Login',
        cancelText: 'Use another email',
        onOk() {
            history.push('/login');
        },
    });
}

export const signupSuccess = name => {
    Modal.success({
        title: 'Signup Success!',
        content: (
            <div>{`Welcome to SuperFin ${name}! You will now be directed to the login screen.`}</div>
        ),
        okText: 'Okay',
        onOk() {
            history.push('/login');
        },
    });
}