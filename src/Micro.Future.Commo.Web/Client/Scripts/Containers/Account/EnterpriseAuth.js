import React from 'react';
import { connect } from 'react-redux';
import EnterpriseAuth from '../../Components/Account/EnterpriseAuth';
import {getUnauthedEnterprise, authenticateEnterprise} from '../../Actions/AccountActions';

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
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(EnterpriseAuth);