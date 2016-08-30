import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import user from './user';

const account = combineReducers({
    login,
    register,
    user
});

export default account;