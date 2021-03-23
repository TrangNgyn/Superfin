import { emailNotFound } from './Modals';

export const filterEmail = (orders, c_email, setOrdersList) => {
    const filteredOrders =  orders.filter(order => {
        return order.c_email === c_email;
    });

    if(filteredOrders.length !== 0) setOrdersList(filteredOrders);
    else emailNotFound();
}

export const setOrder = (order, orderList, setOrdersList) => {
    switch(order){
        case 'd_decending':{
            const newList = [...orderList].sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)});
            setOrdersList(newList);
            break;
        }
        case 'd_ascending':{
            const newList = [...orderList].sort((a,b) => { return new Date(a.issued_date) - new Date(b.issued_date)});
            setOrdersList(newList);
            break;
        }
        case 'c_ascending':{
            const newList = [...orderList].sort((a,b) => (a.c_email > b.c_email) ? 1 : ((b.c_email > a.c_email) ? -1 : 0));
            setOrdersList(newList);
            break;
        }
        case 'c_decending':{
            const newList = [...orderList].sort((a,b) => (a.c_email < b.c_email) ? 1 : ((b.c_email < a.c_email) ? -1 : 0));
            setOrdersList(newList);
            break;
        }
        case 'cn_ascending':{
            const newList = [...orderList].sort((a,b) => (a.carrier > b.carrier) ? 1 : ((b.carrier > a.carrier) ? -1 : 0));
            setOrdersList(newList);
            break;
        }
        case 'cn_decending':{
            const newList = [...orderList].sort((a,b) => (a.carrier < b.carrier) ? 1 : ((b.carrier < a.carrier) ? -1 : 0));
            setOrdersList(newList);
            break;
        }
        default: {
            setOrdersList(orderList);
        }
    }
}