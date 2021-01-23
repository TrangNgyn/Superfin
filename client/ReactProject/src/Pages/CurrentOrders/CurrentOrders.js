import '../../_assets/CSS/pages/CurrentOrders/CurrentOrders.css';
import { Select, Pagination, Input, Button, Form, Modal} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { history } from '../../_helpers/history';

const { Option, OptGroup } = Select;
const { confirm } = Modal;



//mock API call
const fetchPastOrders = () => {
    let pastOrders = [];

    for(let i = 0; i < 100; i++){
        let tracking = null;
        let status = "new";

        if(i%2===0){
            tracking = "123abc";
            status = "in transit"
        }
        
        const order = {
            po_number: "abc" + i,
            c_email: "email@email.com",
            issued_date: new Date(),
            status: status,
            items: [{itemName: "box"}, {itemName: "bag"}, {itemName: "cup"}, {itemName: "clam"}],
            trackingNumber: tracking,
            carrier: "generic carrier"
        }
        pastOrders.push(order);
    }
    return pastOrders;
}








const mockOrders = fetchPastOrders();

const CurrentOrders = () => {
    const [ordersList, setOrdersList] = useState(mockOrders);
    const [searchList, setSearchList] = useState([]);
    const [indexs, setIndex] = useState([]);                
    const [page, setPage] = useState(0);
    

    //Popup when user sends tracking number
    function showConfirm(values) {
        confirm({
            title: 'Tracking number: ' + values.trackingNumber,
            content: 'Are you sure you want to send this tracking number to ' + values.order.c_email,
            onOk() {
                //API request here to change the tracking number in DB
                const newList = [...ordersList];
                const changeableItem = newList.find(order => order.po_number === values.order.po_number);
                const index = newList.indexOf(changeableItem);

                newList[index].trackingNumber = values.trackingNumber;
                setIndex([...indexs, index]);
                setOrdersList(newList);
            },
            onCancel() {
                console.log('Cancel');
            }
        });
    }
  
   




    //Handles ordering select input
    const handleOrder = value => {
        console.log(`selected ${value}`);

        switch(value){
            case "no_tracking": {
                break;
            }
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
    





    const row = renderableProducts.map((o) => {
        const formRef = React.createRef();

        const onFinish = values => {
            const formValues = {
                trackingNumber: values.trackingNumber,
                order: o
            }
            showConfirm(formValues);
            formRef.current.resetFields();
        }

        const onFinishFail = () => {
            setTimeout(() => {
                formRef.current.resetFields();  
            }, 3000)
        }
        
        let trackingNumber;
      
        if(o.trackingNumber){
            const tickIndex = ordersList.indexOf(o); //This is for setting the green tick next to an item
            indexs.indexOf(tickIndex) > -1 ? trackingNumber = <div> {o.trackingNumber} <CheckCircleOutlined style = {{color: "green"}}/></div>
            : trackingNumber = o.trackingNumber;   
        } 
        else{
           trackingNumber = <div>
                <Form onFinish={onFinish} onFinishFailed={onFinishFail} ref={formRef}>
                    <div style={{display: 'inline-block'}}>
                        <Form.Item
                            style = {{marginBottom: 0}}
                            name="trackingNumber"
                            rules={[
                                { required: true, 
                                    message: 'Invalid Input', 
                                    whitespace: true, 
                                    validateTrigger: 'onSubmit',
                                    max: 1000,
                                }
                            ]}>
                            <Input id={o.po_number}/>
                        </Form.Item>
                    </div>

                    <div style={{display: 'inline-block'}}>
                        <Form.Item style = {{marginBottom: 0}}>  
                            <Button type="primary" htmlType="submit">Send</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        }

        return (
            <tr className="current-orders-table-row" key = {o.po_number}>
             
                <td>{o.po_number}</td>
                <td>{o.c_email}</td>
                <td>{o.status}</td>
                <td>{o.issued_date.toString()}</td>
                <td>{trackingNumber}</td>
                <td>{o.carrier}</td>
                <td><b className="current-orders-view" onClick={() => {
                    history.push('/order/' + o.po_number);
                }}>View</b></td>
            </tr>
        );
    });












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
                                <Select placeholder="Order By" style = {{width:"300px"}} onChange={handleOrder}>
                                    <OptGroup label="Tracking Number">
                                        <Option value="no_tracking">Not Sent</Option>
                                    </OptGroup>
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

export default CurrentOrders;