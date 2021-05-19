import '../../_assets/CSS/pages/CurrentOrders/CurrentOrders.css';
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
        <div>
            <div id="current-orders-header">Current Orders</div>

            <div>
                <table id="current-orders-select-table">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{fontSize: "30px", fontWeight: "bold"}}>Orders</div>
                            </td>

                            <td>
                                <Select placeholder="Order By" style = {{width:"300px"}} onChange={v => {
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
                            </td>

                            <td>
                                <Input.Search
                                    allowClear
                                    style = {{width:"300px"}}
                                    placeholder="Search Customer Email"
                                    enterButton="Search"
                                    onSearch = { c_email => { 
                                        if(c_email !== "") filterEmail(ordersList, c_email, setOrdersList);
                                    }}
                                />
                            </td>

                            <td>
                                <Button onClick = { () => {
                                    setOrdersList(orders);
                                }}>Reset Filters</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>  
            </div>

            <div style = {{height: "650px", display: "table"}}>
                <table style={{width:"100%", textAlign: "center", tableLayout: "fixed"}}>
                    <tbody>
                        <tr style = {{border: "solid black 1px"}}>
                            <th>PO Number</th>
                            <th>Customer Email</th>
                            <th>Status</th> 
                            <th>Date Issued</th>
                            <th>Tracking Number</th> 
                            <th>Carrier</th>
                            <th>Send Tracking Details</th>
                            <th>View Order</th>
                        </tr>
                        {row}
                    </tbody>
                </table>

                {loading ? <div style = {{textAlign: 'center'}}><Spin size='large'/></div> : <></>}

                {error ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> : <></>}  
            </div>

            <div style = {{textAlign: "center"}}>
                <Pagination  defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
            </div>
        </div>
    );
}

export default CurrentOrders;