import { orderStatusConstants } from '../../../_constants/orderStatus.constants';

export const setUndefinedValues = order => {
    const newOrder = order;
    if(newOrder.items){
        for(let i = 0; i < newOrder.items.lenth; i++){
            if(newOrder.items[i].special_requirements === undefined) newOrder.items[i].special_requirements = "";
        }
    }
    else newOrder.items = [];

    if(newOrder.tracking_number === undefined) newOrder.tracking_number = "";
    if(newOrder.carrier === undefined) newOrder.carrier = "";

    return newOrder;
}

export const createAddress = values => {
    let address = {};
    address.po_address_line1 = values.po_address_line1;
    address.po_address_line2 = values.po_address_line2;
    address.po_attention_to = values.po_attention_to;
    address.po_country = values.po_country;
    address.po_postcode = values.po_postcode;
    address.po_state = values.po_state;
    address.po_suburb = values.po_suburb;
    return address;
}

export const createOrderAdd = (values, address) => {
    let order = {};
    order.c_email = values.c_email;
    order.carrier = "";
    order.items = [...values.items];
    order.status = orderStatusConstants.NEW;
    order.tracking_number = "";
    order.address = address;
    return order;
}

export const createOrderEdit = (values, address, orderOriginal) => {
    let order = {};
    order.po_number = values.po_number;
    order.c_email = values.c_email;
    order.carrier = values.carrier;
    order.items = [...values.items];
    order.status = values.status;
    order.tracking_number = values.tracking_number;
    order.address = address;
    order.issued_date = orderOriginal.issued_date;
    return order;
}