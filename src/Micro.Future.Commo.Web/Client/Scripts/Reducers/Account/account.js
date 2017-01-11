import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import updateEnterprise from './updateEnterprise';
import authEnterprises from './authEnterprises'
import newUser from './newUser';
import password from './password';
import resetPassword from './resetPassword';
import enterpriseList from './enterpriseList';
import enterpriseUsers from './enterpriseUsers';

const account = combineReducers({
    login,
    register,
    updateEnterprise,
    authEnterprises,
    enterpriseList,
    newUser,
    password,
    resetPassword,
    enterpriseUsers
});

export default account;