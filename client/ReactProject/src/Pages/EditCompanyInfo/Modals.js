import { Modal } from 'antd';
import { postCompanyInfo } from './Functions';
import { history } from '../../_helpers/history';

export const errorLoading = () => {
    Modal.error({
        title: 'ERROR',
        content: 'Could not load company information. Please try reloading the page.',
    });    
}

export const editSuccess = () => {
    Modal.info({
        title: 'Success',
        content: 'Company information was edited successfully.',
        onOk(){
            history.push('/admin');
        }
    });    
}

export const editFail = () => {
    Modal.error({
        title: 'ERROR',
        content: 'There was a problem posting company information. Please try again.',
    });    
}

export const confirmEdit = (newInfo, access_token, updateAuth) => {
    Modal.confirm({
        title: 'Confirm',
        content: 'Are you sure you want to edit the company information?',
        onOk(){
            return postCompanyInfo(newInfo, access_token, updateAuth);
        }
    });
}