import { useEffect, useState } from "react";
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
                <tr key = {o._id}>
                    <td>{o.po_number}</td>
                    <td><strong>{o.status}</strong></td>
                    <td>{dateString}</td>
                    <td><strong>{(o.tracking_number === null || (o.tracking_number !== null && o.tracking_number.length === 0)) ? <em>Not Available</em> : o.tracking_number}</strong></td>
                    <td>{(o.carrier === null || (o.carrier !== null && o.carrier.length === 0)) ? <em>Not Available</em> : o.carrier}</td>
                    <td>
                        <Button type="secondary" onClick={() => {setCurrentOrder(o);}}> View Order Details </Button>
                    </td>
                </tr>
            );
        });
    }
   
    return (
        <>
            <div className="page-title-holder fill">
                <h2>Manage Orders</h2>
            </div>
            {
                currentOrder === null ?
                <>
                    <div className="container flex-horizontal-box-container">
                        <Select className="box-item-xs-6 box-item-sm-4 box-item-md-4 box-item-lg-4 box-item-xl-3" placeholder="Filter By" onSelect={ v => {
                            filterOrders(v, ordersOriginal, setOrders);
                            setPage(0);
                        }}>
                                <Option value={orderStatusConstants.NEW}>New</Option>
                                <Option value={orderStatusConstants.SHIPPED}>Shipped</Option>
                                <Option value={orderStatusConstants.COMPLETE}>Complete</Option>
                        </Select>
                        <Select className="box-item-xs-6 box-item-sm-4 box-item-md-4 box-item-lg-4 box-item-xl-3" placeholder="Order By" onSelect={ v => {
                            sortOrders(v, orders, setOrders);
                            setPage(0);
                        }}>
                            <OptGroup label="Data Issued">
                                <Option value="d_decending">Latest</Option>
                                <Option value="d_ascending">Earliest</Option>
                            </OptGroup>
                        </Select>
                        <Button className="box-item-xs-3 box-item-sm-4 box-item-md-3 box-item-lg-2 box-item-xl-2" type="secondary" onClick={() => {
                            setOrders(ordersOriginal);
                        }}>Reset Filters</Button>
                    </div>

                    <div className="container table-container">
                        {
                            loading 
                            ? <div style = {{textAlign: 'center'}}><Spin size='large'/></div> 
                            : error
                            ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1>
                            : noOrders
                            ? <h1 style = {{textAlign: 'center', color: 'green'}}>You have no current order history</h1>
                            :
                            <table className="box-shadow center-content">
                                <thead>
                                    <tr>
                                        <th>PO Number</th>
                                        <th>Status</th> 
                                        <th>Date Issued</th>
                                        <th>Tracking Number</th> 
                                        <th>Carrier</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                        }
                    </div>
                    <Pagination current={page + 1} defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange={onPageChange} className="text-center"/>
                </>
                :   <OrderView order={currentOrder} setCurrentOrder={setCurrentOrder} setPage={setPage}/>
            }
        </>
    );
}

export default ManageOrdersCustomer;