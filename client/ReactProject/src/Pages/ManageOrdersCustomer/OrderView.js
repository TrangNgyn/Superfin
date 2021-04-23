import { Button } from 'antd';
import '../../_assets/CSS/pages/ManageOrdersCustomer/ManageOrdersCustomer.css';

const OrderView = props => {
    
    if(props.order === null) return <></>

    const date = new Date(props.order.issued_date);

    const itemRow = props.order.items.map((item, index) => {
        return (
            <tr key = {index} className="view-order-table-row">
                <td>{item.item_code}</td>
                <td>{item.quantity}</td>
                <td>{item.special_requirements}</td>   
            </tr>
        ); 
    })





    return (
        <div>
            <h1 className="manage-order-text">Order Details</h1>
            <div id="manage-order-row">
                <div className="manage-order-column">
                    <div className="manage-order-field-header">Purchase Order Number</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_number}</div>

                    <div className="manage-order-field-header">Customer Email</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.c_email}</div>

                    <div className="manage-order-field-header">Issue Date</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>

                    <div className="manage-order-field-header">Status</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.status}</div>

                    <div className="manage-order-field-header">Carrier</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.carrier}</div>

                    <div className="manage-order-field-header">Tracking Number</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.tracking_number}</div>
                </div>
                <div className="manage-order-column">
                    <div className="manage-order-field-header">Address Line 1</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_address_line1}</div>

                    <div className="manage-order-field-header">Address Line 2</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_address_line2}</div>

                    <div className="manage-order-field-header">Attention To</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_attention_to}</div>

                    <div className="manage-order-field-header">Suburb</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_suburb}</div>

                    <div className="manage-order-field-header">State</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_state}</div>

                    <div className="manage-order-field-header">Post Code</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_postal_code}</div>

                    <div className="manage-order-field-header">Country</div>
                    <div className="manage-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_country}</div>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
                <Button onClick={() => {
                    props.setCurrentOrder(null);
                    props.setPage(0);
                }}>Back to Orders</Button>
            </div>
            
            <h1 className="manage-order-text">Ordered Products</h1>
            <div style={{overflowX: 'auto'}}>
                <table className="manage-order-table">
                    <tbody>
                        <tr style = {{border: "solid black 1px"}}>
                            <th>Item Code</th> 
                            <th>Quantity</th>
                            <th>Special Requirements</th>
                        </tr>
                        {itemRow}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderView;