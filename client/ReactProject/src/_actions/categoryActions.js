import axios from 'axios';
import { GET_CATEGORIES, LOADING_CATEGORIES, ERROR_CATEGORIES, EMPTY_CATEGORIES } from './actionTypes';

export const getAllCategories = () => dispatch => {
    dispatch(setCategoriesLoading());
    
    axios.get('/api/categories/all-categories')
    .then(res => {
        if(res.data.length === 0){
            dispatch({
                type: EMPTY_CATEGORIES
            });
        }
        else{
            dispatch({
                type: GET_CATEGORIES,
                payload: res.data
            });
        }
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

