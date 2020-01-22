import {combineReducers} from 'redux';
import quoteReducer from './reducer';
import authReducer from './authReducer'
import errReducer from './errReducer'
export default combineReducers(
    {
    quote:quoteReducer,
    auth:authReducer,
    err:errReducer
    })