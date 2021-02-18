import axios from 'axios';
import { GET_CATEGORIES } from './actionTypes';

export const getAllCategories = () => dispatch => {
    axios.get('api/categories/all-categories')
    .then(res => {
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.categories
        });
    })
    .catch(err => {
        console.log(err);
    })
}

