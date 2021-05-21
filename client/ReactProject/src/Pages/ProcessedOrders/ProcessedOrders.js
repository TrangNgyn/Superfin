import { Select, Pagination, Input, Button, Spin } from 'antd';
import { history } from '../../_helpers/history';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompleteOrders } from '../../_actions/completeOrderActions';
import { filterEmail, setOrder } from './Functions';
import { useAuthUpdate, useAuth } from '../../SharedComponents/AuthContext/AuthContext'; 

const { Option, OptGroup } = Select;

const itemsPerPage = 10;

const ProcessedOrders = () => {
    const dispatch = useDispatch();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    const orders = useSelector(state => state.completeOrdersState.completeOrders);
    const error = useSelector(state => state.completeOrdersState.error);
    const loading = useSelector(state => state.completeOrdersState.loading);

    const [page, setPage] = useState(0);
    const [ordersList, setOrdersList] = useState([]);

    const maxNumberOfPages = (Math.ceil(orders.length/itemsPerPage) - 1);

    let renderableProducts = [];
    let row = <></>

    useEffect(() => {
        if(!orders.length) dispatch(getCompleteOrders(auth.access_token, updateAuth));
        else setOrdersList(orders);      
    }, [orders.length, orders, dispatch, auth.access_token, updateAuth]);
    
    const onChange = p => { setPage(p - 1) };

    if(ordersList.length !== 0){
        renderableProducts = ordersList.slice( page * itemsPerPage, 
            ((page + 1) * itemsPerPage) > ordersList.length ? ordersList.length : ((page + 1) * itemsPerPage));
        
            row = renderableProducts.map(o => {
                const date = new Date(o.issued_date);
                const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                
                return (
                    <tr key = {o.po_number}>
                        <td>{o.po_number}</td>
                        <td>{o.c_email}</td>
                        <td>{dateString}</td>
                        <td><strong>{(o.tracking_number === null || (o.tracking_number !== null && o.tracking_number.length === 0)) ? <em>Not Available</em> : o.tracking_number}</strong></td>
                        <td>{(o.carrier === null || (o.carrier !== null && o.carrier.length === 0)) ? <em>Not Available</em> : o.carrier}</td>
                        <td><Button type="secondary" onClick={() => {
                            history.push(`/order/${o.po_number}/${o.status}`);
                        }}> View </Button></td>
                    </tr>
                );
            });
    }

    return (
        <>
            <div className="page-title-holder fill">
                <h2>Processed Orders</h2>
            </div>
            <div className="container flex-horizontal-box-container">
                <Select allowClear placeholder="Order By" className="box-item-xs-6 box-item-sm-4 box-item-md-4 box-item-lg-4 box-item-xl-3"
                onSelect={v => {setOrder(v, ordersList, setOrdersList)}}>
                    <OptGroup label="Data Issued">
                        <Option value="d_decending">Latest</Option>
                        <Option value="d_ascending">Earliest</Option>
                    </OptGroup>
                    <OptGroup label="Customer Email">
                        <Option value="c_ascending">A-Z</Option>
                        <Option value="c_decending">Z-A</Option>
                    </OptGroup>
                    <OptGroup label="Carrier Name">
                        <Option value="cn_ascending">A-Z</Option>
                        <Option value="cn_decending">Z-A</Option>
                    </OptGroup>  
                </Select>
            
                <Input.Search
                    id='processed-orders-email-filter'
                    className="box-item-xs-6 box-item-sm-4 box-item-md-4 box-item-lg-4 box-item-xl-3"
                    placeholder="Search Customer Email"
                    enterButton="Search"
                    onSearch = { c_email => { 
                        if(c_email !== ""){
                            filterEmail(ordersList, c_email, setOrdersList);
                            setPage(0);
                        } 
                    }}
                />
            
                <Button
                    className="box-item-xs-3 box-item-sm-4 box-item-md-3 box-item-lg-2 box-item-xl-2"
                    type="secondary"
                    onClick = { () => {
                    setOrdersList(orders);
                    document.getElementById('processed-orders-email-filter').value = "";
                }}>Reset Filters</Button>
            </div>

            <div className="container table-container">
                {loading ? <div style={{ textAlign: 'center' }}><Spin size='large' /></div> :
                    error ? <h1 style={{ textAlign: 'center', color: 'red' }}> Could not load data, please try refreshing page </h1> :
                        <table className="box-shadow center-content">
                            <thead>
                                <tr>
                                    <th>PO Number</th>
                                    <th>Customer Email</th> 
                                    <th>Date Issued</th>
                                    <th>Tracking Number</th> 
                                    <th>Carrier</th>
                                    <th>View Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {row}
                            </tbody>
                        </table>
                }
                <Pagination current={page + 1} defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange={onChange} className="text-center" />
            </div>
        </>
    );
}

export default ProcessedOrders;