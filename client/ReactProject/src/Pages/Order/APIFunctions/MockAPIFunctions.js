import moment from 'moment';

export const getItemName = item_code => {
    //search for the name using item_code
    return "Product Name" + item_code;
}

export const getMockOrder = po_number => {
    //Do a check to make sure the po_number can be found
    const order = {
        po_number:"123abc",
        c_email:"superfin@gmail.com",
        issued_date: new Date(),
        status:"New",
        items: [{
                    item_code:"123abc",
                    quantity:"10",
                    special_requirements:"Add picture of happy dog"
                },
                {
                    item_code:"456def",
                    quantity:"4",
                    special_requirements:"Do not include lids"
                },
                {
                    item_code:"789ghi",
                    quantity:"7",
                    special_requirements:"I want these in red"
                },
                {
                    item_code:"012jkl",
                    quantity:"100",
                    special_requirements:""
                },
            
            ],
        tracking_number:"123abcdef456",
        carrier:"Fastway"
    }

    order.issued_date = moment(order.issued_date);

    order.items.forEach(i => {
        i.item_name = getItemName(i.item_code);
    });

    if(po_number === "123abc") return order;


    return {items:[]};
}

export const getCustomer = c_email => {
    //do a check to make sure the customer can be found
    const email = {
        email:"superfin@gmail.com",
        first_name:"Mr",
        last_name:"Finn",
        po_attention_to:"Leave by the front door",
        po_address_line1:"3 Happy Street",
        po_address_line2:"4 NotHappy Ave",
        po_suburb:"West Sydney",
        po_state:"NSW",
        po_postal_code:"2000",
        po_country:"Australia",
        mobile_number: "12345678"
    }

    if(c_email === "superfin@gmail.com") return email;
    return {};
}

export const poNumberUnique = po_number => {
    if(po_number === "123abc") return false;
    return true;
}

