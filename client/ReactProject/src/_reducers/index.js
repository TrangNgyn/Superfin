import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    productState: productReducer,
    categoryState: categoryReducer
});

export default allReducers;