const POForm1View = props => {
    const date = new Date(props.order.issued_date);
    return (
        <>  
            <div className="view-order-column">
                <div className="view-order-field-header">Purchase Order Number</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_number}</div>

                <div className="view-order-field-header">Customer Email</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.c_email}</div>

                <div className="view-order-field-header">Issue Date</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</div>

                <div className="view-order-field-header">Status</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.status}</div>

                <div className="view-order-field-header">Carrier</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.carrier}</div>

                <div className="view-order-field-header">Tracking Number</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.tracking_number}</div>
            </div>
                <div className="view-order-column">

                <div className="view-order-field-header">Address Line 1</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_address_line1}</div>

                <div className="view-order-field-header">Address Line 2</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_address_line2}</div>

                <div className="view-order-field-header">Attention To</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_attention_to}</div>

                <div className="view-order-field-header">Suburb</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_suburb}</div>

                <div className="view-order-field-header">State</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_state}</div>

                <div className="view-order-field-header">Post Code</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_postcode}</div>

                <div className="view-order-field-header">Country</div>
                <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.address.po_country}</div>
            </div>
        </>
    );
}

export default POForm1View;