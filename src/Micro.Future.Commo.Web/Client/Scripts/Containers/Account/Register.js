import React from 'react';
import { connect } from 'react-redux';
import Register from '../../Components/Account/Register';
import {changeEnterpriseInfo, registerEnterprise, getVerficationCode} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        enterpriseInfo: state.account.register
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeEnterpriseForm: (key, newValue) => {
            dispatch(changeEnterpriseInfo(key, newValue));
        },
        onSubmitEnterpriseForm: (enterpriseInfo) => {
            dispatch(registerEnterprise(enterpriseInfo));
        },
        getVerficationCode: (email) => {
            dispatch(getVerficationCode(email));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);