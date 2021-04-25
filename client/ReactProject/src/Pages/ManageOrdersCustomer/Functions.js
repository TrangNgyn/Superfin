export const sortOrders = (value, orders, setOrders) => {
    if(value === "d_decending"){
        const sortedOrders = orders.sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)});
        setOrders([...sortedOrders]);
    }
    else{
        const sortedOrders = orders.sort((a,b) => { return new Date(a.issued_date) - new Date(b.issued_date)});
        setOrders([...sortedOrders]);
    }
}

export const filterOrders = (status, orders, setOrders) => {
    const filteredOrders = orders.filter(order => {
        return order.status === status
    });
    setOrders(filteredOrders);
}   