 //Handles ordering select input
 export const handleOrder = (order, orderList, setOrdersList) => {
    switch(order){
        case 'no_tracking':
            var status = 'NEW';
            const newList = [...orderList].sort((a,b) => (a.status === status) ? -1 : ((b.status === status) ? 1 : 0));
            setOrdersList(newList);
            break;
        case 'd_decending':
            
            break;
        case 'd_ascending':
            //
            break;
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
    }
}