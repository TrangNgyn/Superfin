import productReducer from "./productReducer";
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    productState: productReducer
});

export default allReducers;