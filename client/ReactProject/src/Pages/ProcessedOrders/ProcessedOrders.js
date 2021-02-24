import '../../_assets/CSS/pages/ProcessedOrders/ProcessedOrders.css';
import { Select, Pagination, Input, Button } from 'antd';
import { history } from '../../_helpers/history';
import { useState } from 'react';

const { Option, OptGroup } = Select;






//mock API call
const fetchPastOrders = () => {
    let pastOrders = [];

    for(let i = 0; i < 1000; i++){
        const order = {
            po_number: "abc" + i,
            c_email: "email@email.com",
            issued_date: new Date(),
            status: "complete",
            items: [{itemName: "box"}, {itemName: "bag"}, {itemName: "cup"}, {itemName: "clam"}],
            trackingNumber: "123abc",
            carrier: "generic carrier"
        }
        pastOrders.push(order);
    }

    const order2 = {
        po_number: "abc",
        c_email: "searchemail@email.com",
        issued_date: new Date(),
        status: "complete",
        items: [{itemName: "box"}, {itemName: "bag"}, {itemName: "cup"}, {itemName: "clam"}],
        trackingNumber: "123abc",
        carrier: "generic carrier"
    }

    const order3 = {
        po_number: "abc",
        c_email: "searchemail@email.com",
        issued_date: new Date(),
        status: "complete",
        items: [{itemName: "box"}, {itemName: "bag"}, {itemName: "cup"}, {itemName: "clam"}],
        trackingNumber: "123abc",
        carrier: "generic carrier"
    }

    pastOrders.push(order2);
    pastOrders.push(order3);

    return pastOrders;
}











const ProcessedOrders = () => {
    const mockOrders = fetchPastOrders();

    const [ordersList] = useState(mockOrders);
    const [searchList] = useState([]);
    const [page, setPage] = useState(0);
    
    //Handles ordering select input
    const handleOrder = value => {
        console.log(`selected ${value}`);

        switch(value){
            case "d_decending": {
                //re order state array
                break;
            }
            case "d_ascending": {
                break;
            }
            case "c_ascending": {
                break;
            }
            case "c_decending": {
                break;
            }
            case "cn_ascending": {
                break;
            }
            case "cn_decending": {
                break;
            }
            default: return;
        }
    }



    //search email functions
    const customerEmailSearch = email => {
        console.log(email);
    }

    const clearSearch = () => {
        console.log("clearing search");
    }   

    const clearSearchButton = <div style = {{textAlign: "center", marginTop: "5px"}}>
        <Button type="primary" onClick={clearSearch}>Clear Search</Button>
    </div>





    //renderable items 
    const onChange = p => { setPage(p - 1) };
    const itemsPerPage = 10;
   
    
    const maxNumberOfPages = (Math.ceil(ordersList.length/itemsPerPage) - 1);

    const renderableProducts = ordersList.slice( page * itemsPerPage, 
        ((page + 1) * itemsPerPage) > ordersList.length ? ordersList.length : ((page + 1) * itemsPerPage));
    
    const row = renderableProducts.map((o, i) => {
        return (
            <tr key = {o.po_number + i} className="processed-orders-table-row">
                <td>{o.po_number}</td>
                <td>{o.c_email}</td>
                <td>{o.issued_date.toString()}</td>
                <td>{o.trackingNumber}</td>
                <td>{o.carrier}</td>
                <td><b className="processed-orders-view" onClick={() => {
                    history.push('/order/' + o.po_number);
                }}>View</b></td>
            </tr>
        );
    });
 
    

    

    

    return (
        <div>
            <div id="processed-orders-header">Processed Orders</div>

            <div>
                <table id="processed-orders-select-table">
                    <tbody>
                        <tr>
                            <td>
                                <div style={{fontSize: "30px", fontWeight: "bold"}}>Orders</div>
                            </td>

                            <td>
                                <Select placeholder="Order By" style = {{width:"300px"}} onChange={handleOrder}>
                                    <OptGroup label="Data Issued">
                                        <Option value="d_decending">Latest</Option>
                                        <Option value="d_ascending">Earliest</Option>
                                    </OptGroup>
                                    <OptGroup label="Customer ID">
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
                                    style = {{width:"300px"}}
                                    placeholder="Search Customer Email"
                                    enterButton="Search"
                                    onSearch={customerEmailSearch}
                                />
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
            </div>

            <div style = {{textAlign: "center"}}>
                <Pagination  defaultCurrent={1} total={(maxNumberOfPages + 1) * 10} onChange = {onChange}/>
            </div>

            {searchList.length > 0 ? clearSearchButton : <></>}
        </div>
    );
}

export default ProcessedOrders;