import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import EnterpriseAuth from '../../Components/Account/EnterpriseAuth';
import {getUnauthedEnterprise, authenticateEnterprise, setEnterprise} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        enterprises: state.account.authEnterprises
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUnauthedEnterprise: () => {
            dispatch(getUnauthedEnterprise());
        },
        authenticateEnterprise: (enterpriseId, state) => {
            dispatch(authenticateEnterprise(enterpriseId, state));
        },
        viewEnterpriseDetail: (enterprise) => {
            
            dispatch(push('viewEnterprise'));
            dispatch(setEnterprise(enterprise));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EnterpriseAuth);