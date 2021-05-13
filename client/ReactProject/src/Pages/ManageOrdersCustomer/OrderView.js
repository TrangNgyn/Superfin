import { Button, Descriptions } from 'antd';

const OrderView = props => {
    
    if(props.order === null) return <></>

    const date = new Date(props.order.issued_date);

    const itemRow = props.order.items.map((item, index) => {
        return (
            <tr key={index}>
                <td>{item.item_code}</td>
                <td>{item.quantity}</td>
                <td><textarea id="manage-order-details-panel-special-spec" disabled>{item.special_requirements}</textarea></td>   
            </tr>
        ); 
    })

    return (
        <>
            <div className="container box-shadow" id="manage-order-details-panel">
                <Button onClick={() => {
                    props.setCurrentOrder(null);
                    props.setPage(0);
                }}>Back to Orders</Button>
                <Descriptions title={<h3>Order Details</h3>}>
                    <Descriptions.Item label="Purchase Order Number">{props.order.po_number}</Descriptions.Item>
                    <Descriptions.Item label="Customer Email">{props.order.c_email}</Descriptions.Item>
                    <Descriptions.Item label="Issue Date">{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Descriptions.Item>
                    <Descriptions.Item label="Status">{props.order.status}</Descriptions.Item>
                    <Descriptions.Item label="Carrier">{props.order.carrier}</Descriptions.Item>
                    <Descriptions.Item label="Tracking Number">{props.order.tracking_number}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 1">{props.order.address.po_address_line1}</Descriptions.Item>
                    <Descriptions.Item label="Address Line 2">{props.order.address.po_address_line2}</Descriptions.Item>
                    <Descriptions.Item label="Attention To">{props.order.address.po_attention_to}</Descriptions.Item>
                    <Descriptions.Item label="Suburb">{props.order.address.po_suburb}</Descriptions.Item>
                    <Descriptions.Item label="State">{props.order.address.po_state}</Descriptions.Item>
                    <Descriptions.Item label="Post Code">{props.order.address.po_postal_code}</Descriptions.Item>
                    <Descriptions.Item label="Country">{props.order.address.po_country}</Descriptions.Item>
                </Descriptions>
                <table>
                    <thead>
                        <tr>
                            <th>Item Code</th> 
                            <th>Quantity</th>
                            <th>Special Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemRow}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrderView;