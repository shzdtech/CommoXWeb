import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { push } from 'react-router-redux';
import {signOut, checkEnterpriseAuthenticated} from '../Actions/AccountActions';
import {makeChain} from '../Actions/ChainActions';
import {hideToastr} from '../Actions/CommonActions';

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login,
        showSpinner: state.common.showSpinner,
        toastrOptions: state.common.toastr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectDropdown: (key, event)=>{
            if(key === "createUser"){
                dispatch(push("/createuser"));
            }else if(key === "changePassword"){
                dispatch(push("/changepassword"));
            }else if(key === "updateEnterprise"){
                dispatch(push("/updateEnterprise"));
            }else if(key === "signOut"){
                dispatch(signOut());
            }else if(key === "makeChain"){
                dispatch(makeChain());
            }else if(key=== "financeManage"){
                dispatch(push("/financeManage"));
            }else if(key === "acceptanceManage"){
                dispatch(push("/acceptanceManage"));
            }   
        },
        hideToastr: () => {
            dispatch(hideToastr());
        },
        checkEnterpriseAuthenticated: () => {
            dispatch(checkEnterpriseAuthenticated());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);