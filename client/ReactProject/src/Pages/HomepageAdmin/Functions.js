import { history } from '../../_helpers/history';

export const navigateEditOrder = (po_number, status) => {
    history.push(`/order/${po_number}/${status}`);
    window.scrollTo(0, 0);
}

export const navigateAddOrder = () => {
    history.push('/order');
    window.scrollTo(0, 0);
}

export const navigateFullList = complete => {
    let location = '/currentOrders';
    if(complete) location = '/processedOrders';
    
    history.push(location);
    window.scrollTo(0, 0);
}