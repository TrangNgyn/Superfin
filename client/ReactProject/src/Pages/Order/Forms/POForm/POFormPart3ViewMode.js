const POFormPart3ViewMode = props => {
    return (
        <>
            <div className="view-order-field-header">Attention To</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_attention_to}</div>

            <div className="view-order-field-header">Address Line 1</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_address_line1}</div>

            <div className="view-order-field-header">Address Line 2</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_address_line2}</div>

            <div className="view-order-field-header">Suburb</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_suburb}</div>

            <div className="view-order-field-header">State</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_state}</div>

            <div className="view-order-field-header">Post Code</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_postal_code}</div>

            <div className="view-order-field-header">Country</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.order.po_country}</div>
        </>
    );
}

export default POFormPart3ViewMode;