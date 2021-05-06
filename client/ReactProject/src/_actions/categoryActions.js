import axios from 'axios';
import { GET_CATEGORIES, GET_SUB_CATEGORIES, LOADING_CATEGORIES, ERROR_CATEGORIES, EMPTY_CATEGORIES } from './actionTypes';

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

export const getAllChildren = (category_name) => dispatch => {
    dispatch(setCategoriesLoading());
    if (category_name.length !== 0 && category_name !== "") {
        axios.get('/api/categories/all-children?c_name=' + encodeURI(category_name))
        .then(res => {
            if(res.data.length === 0){
                dispatch({
                    type: EMPTY_CATEGORIES
                });
            }
            else{
                dispatch({
                    type: GET_SUB_CATEGORIES,
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
    } else {
        console.error("Category name must not be empty!")
    }
    
}

export const setCategoriesLoading = () => {
    return {
        type:LOADING_CATEGORIES,
    }
}

