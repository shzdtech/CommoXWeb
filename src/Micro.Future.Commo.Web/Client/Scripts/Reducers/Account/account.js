import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import updateEnterprise from './updateEnterprise';
import newUser from './newUser';
import password from './password';

const account = combineReducers({
    login,
    register,
    updateEnterprise,
    newUser,
    password
});

export default account;