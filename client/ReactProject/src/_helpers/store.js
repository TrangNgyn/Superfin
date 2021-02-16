import thunk from 'redux-thunk';
import allReducers from '../_reducers';
import { createStore, applyMiddleware } from 'redux';

export const store = createStore(allReducers, applyMiddleware(thunk));