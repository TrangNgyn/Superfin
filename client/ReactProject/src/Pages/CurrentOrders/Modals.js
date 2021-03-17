import { Modal } from 'antd';

export const confirmTracking = values => {
    Modal.confirm({
        title: 'Tracking number: ' + values.trackingNumber,
        content: 'Are you sure you want to send this tracking number to ' + values.order.c_email,
        onOk() {
            //API request here to change the tracking number in DB
           /* const newList = [...ordersList];
            const changeableItem = newList.find(order => order.po_number === values.order.po_number);
            const index = newList.indexOf(changeableItem);
            newList[index].trackingNumber = values.trackingNumber;
            setIndex([...indexs, index]);
            setOrdersList(newList);*/
        },
        onCancel() {
            console.log('Cancel');
        }
    });
}