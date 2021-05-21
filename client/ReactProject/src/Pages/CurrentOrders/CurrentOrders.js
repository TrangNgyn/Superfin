import { Select, Pagination, Input, Button, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIncompleteOrders } from '../../_actions/incompleteOrderActions';
import { handleOrder } from './Functions';
import { filterEmail } from '../../_services/SharedFunctions';
import OrderRow from './OrderRow';
import { useAuthUpdate, useAuth } from '../../SharedComponents/AuthContext/AuthContext';

const itemsPerPage = 10;
const { Option, OptGroup } = Select;

const CurrentOrders = () => {
    const dispatch = useDispatch();
    const updateAuth = useAuthUpdate();             //authorization data
    const auth = useAuth();

    const orders = useSelector(state => state.incompleteOrdersState.incompleteOrders);
    const error = useSelector(state => state.incompleteOrdersState.error);
    const loading = useSelector(state => state.incompleteOrdersState.loading);
    const [ordersList, setOrdersList] = useState([]);             
    const [page, setPage] = useState(0);
    const maxNumberOfPages = (Math.ceil(ordersList.length/itemsPerPage) - 1);
    let renderableProducts = [];
    let row = <></>

    useEffect(() => {
        if(!orders.length) dispatch(getIncompleteOrders(auth.access_token, updateAuth));
        else setOrdersList(orders);      
    }, [orders.length, orders, dispatch, auth.access_token]);
    
    const onChange = p => { setPage(p - 1) };

    if(orders.length !== 0){
        renderableProducts = ordersList.slice( page * itemsPerPage, 
            ((page + 1) * itemsPerPage) > ordersList.length ? ordersList.length : ((page + 1) * itemsPerPage));
        
        row = renderableProducts.map((o) => {
            const orderProps = {
                order: o,
                dispatch: dispatch,
                access_token: auth.access_token,
                updateAuth: updateAuth
            }
        
            return (
               <OrderRow key={o.po_number} {...orderProps}/>
            );
        });
    }
    
    return (
        <>
            <div className="page-title-holder fill">
                <h2>Current Orders</h2>
            </div>
            <div className="container flex-horizontal-box-container">
                <Select placeholder="Order By" className="box-item-xs-6 box-item-sm-4 box-item-md-4 box-item-lg-4 box-item-xl-3" onChange={v => {
                    handleOrder(v, ordersList, setOrdersList);
                }}>
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
                    id="filter-box-customer-email"
                    className="box-item-xs-6 box-item-sm-4 box-item-md-4 box-item-lg-4 box-item-xl-3"
                    allowClear
                    placeholder="Search Customer Email"
                    enterButton="Search"
                    onSearch={c_email => {
                        if (c_email !== "") filterEmail(ordersList, c_email, setOrdersList);
                    }}
                />
                <Button 
                    className="box-item-xs-3 box-item-sm-4 box-item-md-3 box-item-lg-2 box-item-xl-2"
                    type="secondary"
                    onClick={() => {
                        setOrdersList(orders); document.getElementById("filter-box-customer-email").value = "";
                    }}>Reset Filters</Button>
            </div>
            <div className="container table-container">
                {loading ? <div style={{ textAlign: 'center' }}><Spin size='large' /></div> : 
                    error ? <h1 style={{ textAlign: 'center', color: 'red' }}> Could not load data, please try refreshing page </h1>:
                        <table className="box-shadow center-content">
                            <thead>
                                <tr>
                                    <th>PO Number</th>
                                    <th>Customer Email</th>
                                    <th>Status</th>
                                    <th>Date Issued</th>
                                    <th>Tracking Number</th>
                                    <th>Carrier</th>
                                    <th>Send Tracking Details</th>
                                    <th>View Order</th>
                                </tr>
                            </thead>
                            <tbody>
                                {row}
                            </tbody>
                        </table>
                }
            </div>
            <Pagination current={page + 1} defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange={onChange} className="text-center" />
        </>
    );
}

export default CurrentOrders;