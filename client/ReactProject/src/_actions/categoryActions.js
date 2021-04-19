import axios from 'axios';
import { GET_CATEGORIES, LOADING_CATEGORIES, ERROR_CATEGORIES } from './actionTypes';

export const getAllCategories = () => dispatch => {
    dispatch(setCategoriesLoading());
    
    axios.get('/api/categories/all-categories')
    .then(res => {
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data.categories
        });
    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: ERROR_CATEGORIES
        });
    })
}

export const setCategoriesLoading = () => {
    return {
        type:LOADING_CATEGORIES,
    }
}

