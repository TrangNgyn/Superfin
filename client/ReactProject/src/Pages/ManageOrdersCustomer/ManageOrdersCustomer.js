import { useEffect, useState } from "react";
import './ManageOrdersCustomer.css';
import { Select, Button, Pagination, Spin } from 'antd';
import axios from 'axios';

const {OptGroup, Option} = Select;






const mockdata = [];

for(let i = 0; i < 10; i++){
    const order = {
        po_number: i + "_ponumber",
        status: "NEW",
        date: "14/11/1993",
        tracking: "fjsda8734rljwebfao98sdf",
        carrier: "AUSTRALIA POST",
    }
    mockdata[i] = order;
}






axios.post('api/orders/order-by-email', { email: "its488@uowmail.edu.au" })
.then(res => {
    console.log('all good',res);
})
.catch(err => {
    console.log('all bad', err);
});

const ManageOrdersCustomer = () => {

    const [orders, setOrders] = useState(mockdata);
    const [ordersOriginal] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(0);

    const maxNumberOfPages = 0;
    let renderableProducts = [];
    let row = <></>;

    const onPageChange = p => { setPage(p - 1) };

    row = orders.map((p, i) => {
        return (
            <tr id="manage-orders-table-row" key = {i}>
                <td>{p.po_number}</td>
                <td>{p.status}</td>
                <td>{p.date}</td>
                <td>{p.tracking}</td>
                <td>{p.carrier}</td>
                <td>view</td>
            </tr>
        );
    });

    useEffect(() => {

    }, [])

    return (
        <div >
            <div id="manage-orders-header">Manage Orders</div>
    
            <div>
                <div style={{display: 'inline-block', paddingLeft: "1%", paddingTop: "2%"}}>
                    <div style={{fontSize: "30px", fontWeight: "bold"}}>Orders</div>
                </div>

                <div style={{display: 'inline-block', paddingLeft: "2%", paddingTop: "2%"}}>
                    <Select style={{width: "300px"}} placeholder="Filter By" >
                            <Option value="new">New</Option>
                            <Option value="shipped">Shipped</Option>
                            <Option value="complete">Complete</Option>
                    </Select>
                </div>

                <div style={{display: 'inline-block', paddingLeft: "2%", paddingTop: "2%"}}>
                    <Select style={{width: "300px"}} placeholder="Order By">
                        <OptGroup label="Data Issued">
                            <Option value="d_decending">Latest</Option>
                            <Option value="d_ascending">Earliest</Option>
                        </OptGroup>
                    </Select>
                </div >

                <div style={{display: 'inline-block', paddingLeft: "2%", paddingTop: "2%"}}>
                    <Button>Reset Filters</Button>
                </div>
            </div>




   
            <div style={{overflowX: 'auto', paddingTop: "2%", height: "500px"}}>
                {
                    loading 
                    ? <div style = {{textAlign: 'center'}}><Spin size='large'/></div> 
                    : error
                    ? <h1 style = {{textAlign: 'center', color: 'red'}}>Could not load data, please try refreshing page</h1>
                    : 
                    <table style={{width:"100%", borderCollapse: 'collapse', textAlign: 'center'}}>
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
                <Pagination defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange={onPageChange}/>
            </div>
        </div>
    );
}

export default ManageOrdersCustomer;