import axios from 'axios';
import { GET_COMPANY_INFO, SET_COMPANY_INFO, LOADING_COMPANY_INFO } from './actionTypes';

export const getCompanyInfo = () => dispatch => {
    dispatch({
        type: LOADING_COMPANY_INFO
    });
    
    return axios.get('/api/aboutus/')
        .then(res => {
            dispatch({
                type: GET_COMPANY_INFO,
                payload: res.data
            });

            dispatch({
                type: LOADING_COMPANY_INFO
            });

            return res;
        })
        .catch(err => {
            console.log(err);

            dispatch({
                type: LOADING_COMPANY_INFO
            });

            return err;
        });
}

export const setCompanyInfo = newInfo => dispatch => {
    return axios.post('/api/aboutus/edit-info', newInfo)
        .then(res => {
            if(res.data.success){
                dispatch({
                    type: SET_COMPANY_INFO,
                    payload: newInfo
                });
                return res;
            }
            else{
                console.log(res);
                return res;
            } 
        })
        .catch(err => {
            console.log(err);
            return err;
        });
}