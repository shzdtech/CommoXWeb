import React from 'react';
import { connect } from 'react-redux';
import CreateUser from '../../Components/Account/CreateUser'
import {changeCreateUserForm, submitCreateUser} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        newUser: state.account.newUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitCreateUser: (user)=>{
            dispatch(submitCreateUser(user));
        },
        onChangeCreateUserForm: (key, newValue) => {
            dispatch(changeCreateUserForm(key, newValue));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateUser);