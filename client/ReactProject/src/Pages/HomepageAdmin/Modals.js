import { Modal } from 'antd';
import { addTracking } from '../../_actions/incompleteOrderActions';
import { _logout } from '../../_services/SharedFunctions';

const sumbitTrackingFailed = po_number => {
    Modal.info({
        title: `Error`,
        content: `Order: ${po_number} tracking information could not be submitted. Please try reloading the page or contact support.`,
        okText: 'Ok',
    });
}

const sumbitTrackingSuccess = po_number => {
    Modal.info({
        title: `Success`,
        content: `Order: ${po_number} tracking information was submitted`,
        okText: 'Ok',
    });
}

export const confirmSubmitTracking = (tracking, dispatch, token, updateAuth) => {

    Modal.confirm({
        title: `Are you sure you want to submit the following details for order: ${tracking.po_number}`,
        content: `Tracking Number: ${tracking.tracking_number}, Carrier: ${tracking.carrier}?`,
        okText: 'Submit',
        onOk() {
            return dispatch(addTracking(tracking, token, updateAuth))
            .then(res => {
                if(res.data.success) sumbitTrackingSuccess(tracking.po_number);
                else sumbitTrackingFailed(tracking.po_number);
            })
            .catch(() => { 
                sumbitTrackingFailed(tracking.po_number);
            });
        }
    });
}