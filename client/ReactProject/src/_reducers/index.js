import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';
import categoryReducer from './categoryReducer';
import companyInfoReducer from './companyInfoReducer';
import completeOrdersReducer from './completeOrdersReducer';
import incompleteOrdersReducer from './incompleteOrdersReducer';
import { combineReducers } from 'redux';
import { authReducer } from './authReducer';

const allReducers = combineReducers({
    productState: productReducer,
    productDetailsState: productDetailsReducer,
    categoryState: categoryReducer,
    companyInfoState: companyInfoReducer,
    completeOrdersState: completeOrdersReducer,
    incompleteOrdersState: incompleteOrdersReducer,
    authReducer: authReducer,
});

export default allReducers;