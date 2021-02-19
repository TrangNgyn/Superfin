import axios from 'axios';
import { EDIT } from './PageStates';

export const getProduct = (p_code, setProduct, setPageState) => {
    console.log("getting product " + p_code);
    
    axios.post('/api/products/product-by-id', { 
        p_code: p_code
    })
    .then(res => {
        console.log(res);
        setProduct({});
        setPageState(EDIT);
    })
    .catch(err => {
        console.log(err);
    })
}