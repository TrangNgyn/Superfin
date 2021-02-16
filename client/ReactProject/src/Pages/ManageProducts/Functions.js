//Filter and sort functions

import { code_a, code_d, name_a, name_d, price_a, price_d } from '../../_actions/productActions';

export const handleFilter = value => {
    switch(value){
        case "in_stock": {
            //fetch from db all products in stock
            break;
        }
        case "out_stock": {
            break;
        }
        case "category_1": {
            break;
        }
        case "category_2": {
            break;
        }
        case "i_ascending": {
            break;
        }
        case "category_4": {
            break;
        }
        default:{
            //return all products
        }
    }
}

export const handleOrder = (value, dispatch) => {
    switch(value){
        case "p_decending": {
            dispatch(price_d());
            break;
        }
        case "p_ascending": {
            dispatch(price_a());
            break;
        }
        case "n_ascending": {
            dispatch(name_a());
            break;
        }
        case "n_decending": {
            dispatch(name_d());
            break;
        }
        case "i_ascending": {
            dispatch(code_a());
            break;
        }
        case "i_decending": {
            dispatch(code_d());
            break;
        }
        default: return;
    }
}