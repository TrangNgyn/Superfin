import { GET_PRODUCTS, DEFAULT_ORDER, LOADING_PRODUCTS, DELETE_PRODUCT, ORDER_BY, ERROR } from './actionTypes';
import axios from 'axios';

export const getAllProducts = () => dispatch  => {
    console.log("get products...");
    dispatch(setIsLoading(true));

    axios.get('api/products/all-product')
    .then(res => {
        dispatch({
            type: GET_PRODUCTS,
            payload: res.data.products
        })
    })
    .catch(() => {
        dispatch(setIsLoading(false));
        dispatch({
            type: ERROR
        })
    });
};

export const setDefaultOrder = () => {
    return {
        type: DEFAULT_ORDER
    }
}

export const deleteProduct = p_code => dispatch => {
    axios.post('api/products/delete-product', {
        p_code: p_code
    })
    .then(res => {
        if(res.data.succes){                            //This may need to be changed to 'success'
            dispatch({
                type: DELETE_PRODUCT,
                payload: p_code
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
}

export const setIsLoading = val => {
    return {
        type: LOADING_PRODUCTS,
        payload: val
    }
}

export const price_a = () => {
    return {
        type: ORDER_BY.PRICE_A
    }
}

export const price_d = () => {
    return {
        type: ORDER_BY.PRICE_D
    }
}

export const name_a = () => {
    return {
        type: ORDER_BY.NAME_A
    }
}

export const name_d = () => {
    return {
        type: ORDER_BY.NAME_D
    }
}

export const code_a = () => {
    return {
        type: ORDER_BY.CODE_A
    }
}

export const code_d = () => {
    return {
        type: ORDER_BY.CODE_D
    }
}

