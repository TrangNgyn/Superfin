import productReducer from './productReducer';
import productDetailsReducer from './productDetailsReducer';
import categoryReducer from './categoryReducer';
import companyInfoReducer from './companyInfoReducer';
import completeOrdersReducer from './completeOrdersReducer';
import incompleteOrdersReducer from './incompleteOrdersReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    productState: productReducer,
    productDetailsState: productDetailsReducer,
    categoryState: categoryReducer,
    companyInfoState: companyInfoReducer,
    completeOrdersState: completeOrdersReducer,
    incompleteOrdersState: incompleteOrdersReducer,
    cartState: cartReducer,
});

export default allReducers;