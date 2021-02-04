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

export const makeNumber = str => {
    for(let i = 0; i < str.length; i++){
        if(isNaN(str[i]) || str[i]===" "){
            str = str.substring(0, i) + str.substring(i+1, str.length);
            i--;
        }
    }
    return str;
}