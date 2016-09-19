import React from 'react';
import { connect } from 'react-redux';
import ResetPassword from '../../Components/Account/ResetPassword';
import {changeResetPasswordForm, resetPassword, getResetPasswordVerficationCode} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        form: state.account.resetPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            dispatch(changeResetPasswordForm(key, newValue));
        },
        onSubmitForm: (form) => {
            dispatch(resetPassword(form));
        },
        getVerficationCode: (email) => {
            dispatch(getResetPasswordVerficationCode(email));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);