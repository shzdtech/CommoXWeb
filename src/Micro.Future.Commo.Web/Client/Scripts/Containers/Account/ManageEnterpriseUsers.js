import React from 'react';
import { connect } from 'react-redux';
import ManageEnterpriseUsers from '../../Components/Account/ManageEnterpriseUsers'
import {getEnterpriseUser, deleteEnterpriseUser} from '../../Actions/AccountActions';

const mapStateToProps = (state, ownProps) => {
    return {
        enterpriseUsers: state.account.enterpriseUsers
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEnterpriseUser: ()=>{
            dispatch(getEnterpriseUser());
        },
        onDeleteEnterpriseUser: (userId) => {
            dispatch(deleteEnterpriseUser(userId));
        },
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ManageEnterpriseUsers);