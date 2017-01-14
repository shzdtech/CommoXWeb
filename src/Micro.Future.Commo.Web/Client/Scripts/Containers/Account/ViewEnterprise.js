import React from 'react';
import { connect } from 'react-redux';
import ViewEnterprise from '../../Components/Account/ViewEnterprise';
import {getEnterprise} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        enterpriseInfo: state.account.viewEnterprise,
        userInfo: state.account.login,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        componentRendered: () => {
            dispatch(getEnterprise());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ViewEnterprise);