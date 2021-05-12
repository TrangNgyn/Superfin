import { useEffect, useState } from "react";
import '../../_assets/CSS/pages/ManageOrdersCustomer/ManageOrdersCustomer.css';
import { Select, Button, Pagination, Spin } from 'antd';
import axios from 'axios';
import { filterOrders, sortOrders } from './Functions';
import { orderStatusConstants } from '../../_constants/orderStatus.constants';
import OrderView from './OrderView';

const {OptGroup, Option} = Select;
const itemsPerPage = 10;

const mockEmail = "its488@uowmail.edu.au";





const ManageOrdersCustomer = () => {

    const [orders, setOrders] = useState([]);
    const [ordersOriginal, setOrdersOriginal] = useState([]);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [noOrders, setNoOrders] = useState(false);
    const [page, setPage] = useState(0);

    const maxNumberOfPages = (Math.ceil(orders.length/itemsPerPage) - 1);
    let row = <></>;
    let renderableProducts = []




    const onPageChange = p => { setPage(p - 1) };

    useEffect(() => {
        if(!orders.length){
            setLoading(true);

            axios.post('api/orders/order-by-email', { email: mockEmail })
            .then(res => {
                if(res.data.hasOwnProperty('success')){
                    console.log(res);
                    setNoOrders(true);
                    setLoading(false);
                } 
                else{
                    const sortedOrders = res.data.sort((a,b) => { return new Date(b.issued_date) - new Date(a.issued_date)});
                    setOrders(sortedOrders);
                    setOrdersOriginal(sortedOrders);
                    setLoading(false);
                }
            })
            .catch(err => {
                console.log(err);
                setError(true);
                setLoading(false);
            });
        }
    }, [orders.length])





    if(orders.length !== 0){
        renderableProducts = orders.slice( page * itemsPerPage, 
            ((page + 1) * itemsPerPage) > orders.length ? orders.length : ((page + 1) * itemsPerPage));
        
        row = renderableProducts.map(o => {
            const date = new Date(o.issued_date);
            const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`

            return (
                <tr id="manage-orders-table-row" key = {o._id}>
                    <td>{o.po_number}</td>
                    <td><b>{o.status}</b></td>
                    <td>{dateString}</td>
                    <td><b>{o.tracking_number}</b></td>
                    <td>{o.carrier}</td>
                    <td>
                        <span className="manage-orders-view" onClick={() => {
                            setCurrentOrder(o);
                        }}>view</span>
                    </td>
                </tr>
            );
        });
    }





   
    return (
        <div >
            <div id="manage-orders-header">Manage Orders</div>

            {
                currentOrder === null
                ? <div>
                    <div>
                        <div id="manage-order-filters" style={{paddingLeft: "1%"}}>
                            <div style={{fontSize: "30px", fontWeight: "bold"}}>Orders</div>
                        </div>

                        <div id="manage-order-filters">
                            <Select style={{width: "300px"}} placeholder="Filter By" onSelect={ v => {
                                filterOrders(v, ordersOriginal, setOrders);
                                setPage(0);
                            }}>
                                    <Option value={orderStatusConstants.NEW}>New</Option>
                                    <Option value={orderStatusConstants.SHIPPED}>Shipped</Option>
                                    <Option value={orderStatusConstants.COMPLETE}>Complete</Option>
                            </Select>
                        </div>

                        <div id="manage-order-filters">
                            <Select style={{width: "300px"}} placeholder="Order By" onSelect={ v => {
                                sortOrders(v, orders, setOrders);
                                setPage(0);
                            }}>
                                <OptGroup label="Data Issued">
                                    <Option value="d_decending">Latest</Option>
                                    <Option value="d_ascending">Earliest</Option>
                                </OptGroup>
                            </Select>
                        </div >

                        <div id="manage-order-filters">
                            <Button onClick={() => {
                                setOrders(ordersOriginal);
                            }}>Reset Filters</Button>
                        </div>
                    </div>

                    <div id="manage-order-table-wrapper">
                        {
                            loading 
                            ? <div style = {{textAlign: 'center'}}><Spin size='large'/></div> 
                            : error
                            ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1>
                            : noOrders
                            ? <h1 style = {{textAlign: 'center', color: 'green'}}>You have no current order history</h1>
                            :
                            <table className="manage-order-table">
                                <tbody>
                                    <tr style = {{border: "solid black 1px", padding: "8px"}}>
                                        <th>PO Number</th>
                                        <th>Status</th> 
                                        <th>Date Issued</th>
                                        <th>Tracking Number</th> 
                                        <th>Carrier</th>
                                        <th>View Order Details</th>
                                    </tr>
                                    {row}
                                </tbody>
                            </table>
                        }
                    </div>

                    <div style={{textAlign: "center"}}>
                        <Pagination current={page + 1} defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange={onPageChange}/>
                    </div>
                </div>
                :   <OrderView order={currentOrder} setCurrentOrder={setCurrentOrder} setPage={setPage}/>
            }
        </div>
    );
}

export default ManageOrdersCustomer;