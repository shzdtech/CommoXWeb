import React from 'react';
import { connect } from 'react-redux';
import Register from '../../Components/Account/Register';
import {updateEnterpriseInfo, updateEnterprise} from '../../Actions';

const mapStateToProps = (state, ownProps) => {
    return {
        enterpriseInfo: state.account.updateEnterprise
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeEnterpriseForm: (key, newValue) => {
            dispatch(updateEnterpriseInfo(key, newValue));
        },
        onSubmitEnterpriseForm: (enterpriseInfo) => {
            dispatch(updateEnterprise(enterpriseInfo));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Register);