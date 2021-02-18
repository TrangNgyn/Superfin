const CustomerFormViewMode = props => {
    return (
        <>
            <div className="view-order-field-header">First Name</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.first_name}</div>

            <div className="view-order-field-header">Last Name</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.last_name}</div>

            <div className="view-order-field-header">Attention To</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_attention_to}</div>

            <div className="view-order-field-header">Address Line 1</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_address_line1}</div>

            <div className="view-order-field-header">Address Line 2</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_address_line2}</div>

            <div className="view-order-field-header">Suburb</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_suburb}</div>

            <div className="view-order-field-header">State</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_state}</div>

            <div className="view-order-field-header">Post Code</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_postal_code}</div>

            <div className="view-order-field-header">Country</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.po_country}</div>

            <div className="view-order-field-header">Phone Number</div>
            <div className="view-order-field-header" style={{paddingBottom: "20px", fontWeight: "normal"}}>{props.customer.mobile_number}</div>
        </>
    );
}

export default CustomerFormViewMode;