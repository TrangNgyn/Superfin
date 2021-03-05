import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import companyInfoReducer from './companyInfoReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer,
    companyInfoState: companyInfoReducer
});

export default allReducers;