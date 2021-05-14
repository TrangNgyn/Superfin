import { emailNotFound } from './SharedModals'; 

export const getCategoryName = (id, categories) => {
    const category = categories.find(category => {
        return category._id === id;
    });
    
    if(category === undefined) return "Category Not Found"
    else return category.c_name;    
}

//Event handler that only allows numbers as input
export const onlyNumbers = (e, form, field, index, subfield) => {
    const reg = /^[0-9]*$/;
    const str = e.target.value;
    let field_obj = {};

    if(typeof index !== 'undefined'){
        let arr = form.getFieldValue(field);
        let sub_obj = arr[index];
        
        if (str === '' || reg.test(str)) sub_obj[subfield] = str;  
        else sub_obj[subfield] = makeNumber(str);
        field_obj[field] = arr;    
    }

    else{
        if (str === '' || reg.test(str)) field_obj[field] = str;     
        else field_obj[field] = makeNumber(str); 
    }
    form.setFieldsValue(field_obj);
}

//Removes characters that are not numbers from a string
export const makeNumber = str => {
    for(let i = 0; i < str.length; i++){
        if(isNaN(str[i]) || str[i]===" "){
            str = str.substring(0, i) + str.substring(i+1, str.length);
            i--;
        }
    }
    return str;
}

//filters orders by email for current and previous orders pages
export const filterEmail = (orders, c_email, setOrdersList) => {
    const filteredOrders =  orders.filter(order => {
        return order.c_email === c_email;
    });

    if(filteredOrders.length !== 0) setOrdersList(filteredOrders);
    else emailNotFound();
}

export const removeSpaces = (e, form, field) => {
    const reg = /^[a-z0-9A-Z]+$/;
    const str = e.target.value
    let field_obj = {};

    if (str === '' || reg.test(str))field_obj[field] = str;
    else field_obj[field] = removeSpaceLogic(str);

    form.setFieldsValue(field_obj);
}

export const removeSpaceLogic = str => { 
    for(let i = 0; i < str.length; i++){
        if(str[i]===" " || !/^[a-z0-9A-Z]+$/.test(str[i])){
            str = str.substring(0, i) + str.substring(i+1, str.length);
            i--;
        }
    }
    return str;
}