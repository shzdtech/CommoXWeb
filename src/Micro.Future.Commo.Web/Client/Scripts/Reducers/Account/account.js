import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import newUser from './newUser';
import password from './password';

const account = combineReducers({
    login,
    register,
    newUser,
    password
});

export default account;