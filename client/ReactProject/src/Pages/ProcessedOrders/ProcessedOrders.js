import '../../_assets/CSS/pages/ProcessedOrders/ProcessedOrders.css';
import { Select, Pagination, Input, Button, Spin } from 'antd';
import { history } from '../../_helpers/history';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompleteOrders } from '../../_actions/completeOrderActions';
import { filterEmail, setOrder } from './Functions'; 

const { Option, OptGroup } = Select;

const itemsPerPage = 10;





/*
    Tasks left
    Check filters work with larger amounts of data
*/

/*
    If time
    Could use some optimization
*/





const ProcessedOrders = () => {
    const dispatch = useDispatch();

    const orders = useSelector(state => state.completeOrdersState.completeOrders);
    const error = useSelector(state => state.completeOrdersState.error);
    const loading = useSelector(state => state.completeOrdersState.loading);

    const [page, setPage] = useState(0);
    const [ordersList, setOrdersList] = useState([]);

    const maxNumberOfPages = (Math.ceil(orders.length/itemsPerPage) - 1);

    let renderableProducts = [];
    let row = <></>





    useEffect(() => {
        if(!orders.length) dispatch(getCompleteOrders());
        else setOrdersList(orders);      
    }, [orders.length, orders, dispatch]);
    
    const onChange = p => { setPage(p - 1) };





    if(ordersList.length !== 0){
        renderableProducts = ordersList.slice( page * itemsPerPage, 
            ((page + 1) * itemsPerPage) > ordersList.length ? ordersList.length : ((page + 1) * itemsPerPage));
        
            row = renderableProducts.map(o => {
                const date = new Date(o.issued_date);
                const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
                
                return (
                    <tr key = {o.po_number} className="processed-orders-table-row">
                        <td>{o.po_number}</td>
                        <td>{o.c_email}</td>
                        <td>{dateString}</td>
                        <td>{o.trackingNumber}</td>
                        <td>{o.carrier}</td>
                        <td><b className="processed-orders-view" onClick={() => {
                            history.push(`/order/${o.po_number}/${o.status}`);
                        }}>View</b></td>
                    </tr>
                );
            });
    }





    return (
        <div>
            <div id="processed-orders-header">Processed Orders</div>

            <div>
                <table id="processed-orders-select-table" className="center-content">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{fontSize: "30px", fontWeight: "bold"}}>Orders</div>
                            </td>

                            <td>
                                <Select allowClear placeholder="Order By" style = {{width:"300px"}} onSelect={v => {setOrder(v, ordersList, setOrdersList)}}>
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
                                    id='processed-orders-email-filter'
                                    style = {{width:"300px"}}
                                    placeholder="Search Customer Email"
                                    enterButton="Search"
                                    onSearch = { c_email => { 
                                        if(c_email !== ""){
                                            filterEmail(ordersList, c_email, setOrdersList);
                                            setPage(0);
                                        } 
                                    }}
                                />
                            </td>

                            <td>
                                <Button onClick = { () => {
                                    setOrdersList(orders);
                                    document.getElementById('processed-orders-email-filter').value = "";
                                }}>Reset Filters</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>  
            </div>

            <div style = {{height: "400px", display: "table"}}>
                <table style={{width:"100%", textAlign: "center", tableLayout: "fixed"}}>
                    <tbody>
                        <tr style = {{border: "solid black 1px"}}>
                            <th>PO Number</th>
                            <th>Customer Email</th> 
                            <th>Date Issued</th>
                            <th>Tracking Number</th> 
                            <th>Carrier</th>
                            <th>View Order</th>
                        </tr>
                            
                        {row}
                    </tbody>
                </table>  

                {loading ? <div style = {{textAlign: 'center'}}><Spin size='large'/></div> : <></>}

                {error ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1> : <></>}
            </div>

            <div style = {{textAlign: "center"}}>
                <Pagination current={page+1} defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
            </div>
        </div>
    );
}

export default ProcessedOrders;