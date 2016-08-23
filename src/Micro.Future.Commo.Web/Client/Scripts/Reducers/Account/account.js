import { combineReducers } from 'redux';
import login from './login';
import register from './register';

const account = combineReducers({
    login,
    register
});

export default account;