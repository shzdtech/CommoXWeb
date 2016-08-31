import React from 'react';
import { connect } from 'react-redux';
import CreateUser from '../../Components/Account/CreateUser'
import {typeUserEmail, submitCreateUser} from '../../Actions';

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
        onChangeForm: (key, newValue) => {
            dispatch(typeUserEmail(newValue.value));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(CreateUser);