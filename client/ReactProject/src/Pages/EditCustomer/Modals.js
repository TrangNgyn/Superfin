import { Modal } from 'antd';

export const editSuccessModal = () => {
    Modal.success({
        title: "Success!",
        content: 'You edited your details successfully!',
        onOk(){ window.location.reload() }
    });
}

export const editFailModal = () => {
    Modal.error({
        title: "Something went wrong!",
        content: "An error has occured. Please try to make your edits again, or contact support.",
        onOk(){ window.location.reload() }
    });
}

export const editConfirmModal = submit => {
    Modal.confirm({
        title: "Please confirm!",
        content: "Are you sure you want to make these changes?",
        onOk(){return submit()}
    });
}

export const changePasswordConfirmModal = submit => {
    Modal.confirm({
        title: "Please confirm",
        content: "Are you sure you want to change your password?",
        onOk(){ return submit()}
    });
}

export const changePasswordSuccess = () => {
    Modal.success({
        title: "Success!",
        content: 'You changed your password successfully!'
    });
}
