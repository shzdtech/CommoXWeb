import React from 'react';
import { connect } from 'react-redux';
import Login from '../../Components/Account/Login'
import {loginAction} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (email, password) => {
            dispatch(loginAction(email, password));
        }   
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Login);