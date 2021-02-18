const POFormPart1ViewMode = props => {
    return (
        <>
            <div className="view-order-field-header">Purchase Order Number</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_number}</div>

            <div className="view-order-field-header">Customer Email</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.c_email}</div>

            <div className="view-order-field-header">Issue Date</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.issued_date.format("DD/MM/YYYY").toString()}</div>

            <div className="view-order-field-header">Status</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.status}</div>

            <div className="view-order-field-header">Carrier</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.carrier}</div>

            <div className="view-order-field-header">Tracking Number</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.tracking_number}</div>
        </>
    );
}

export default POFormPart1ViewMode;