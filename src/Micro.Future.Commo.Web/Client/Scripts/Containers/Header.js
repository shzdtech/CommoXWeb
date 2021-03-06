import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { push } from 'react-router-redux';
import {signOut, checkEnterpriseAuthenticated} from '../Actions/AccountActions';
import {makeChain, typeCreateChainOption} from '../Actions/ChainActions';
import {setSelectEnterpriseTrade, setSelectAdminTrade} from '../Actions/TradeActions';
import {hideToastr} from '../Actions/CommonActions';
import {resetForm} from '../Actions';

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login,
        showSpinner: state.common.showSpinner,
        toastrOptions: state.common.toastr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectDropdown: (key, event) => {
            if(key === "authEnterprise"){
                dispatch(push("/authEnterprise"));
            }else if(key === "manageTrade"){
                dispatch(setSelectAdminTrade());
                dispatch(push("/manageTrade"));
            }else if (key === "createUser") {
                dispatch(push("/createuser"));
            } else if (key === "changePassword") {
                dispatch(push("/changepassword"));
            } else if (key === "updateEnterprise") {
                dispatch(push("/updateEnterprise"));
            } else if (key === "signOut") {
                dispatch(signOut());
            } else if (key === "makeChain") {
                dispatch(makeChain());
            } else if (key === "financeManage") {
                dispatch(push("/financeManage"));
            } else if (key === "acceptanceManage") {
                dispatch(push("/acceptanceManage"));
            } else if (key === "acceptanceBankManage") {
                dispatch(push("/acceptanceBankManage"));
            } else if (key === "chainManager") {
                dispatch(push("/chainManager"));
            } else if (key === "createChainManually") {
                dispatch(typeCreateChainOption({
                    id: 4
                }, true));
                dispatch(push("/createChain"));
            } else if (key === "matchChainManually") {
                
                dispatch(typeCreateChainOption({
                    id: 4
                }, false));
                dispatch(push("/createChain"));
            }else if(key === 'myTrades'){
                dispatch(setSelectEnterpriseTrade());
                dispatch(push('manageTrade'));
            }
        },
        hideToastr: () => {
            dispatch(hideToastr());
        },
        checkEnterpriseAuthenticated: () => {
            dispatch(checkEnterpriseAuthenticated());
        },
        addRequirement: ()=> {
            dispatch(resetForm());
            dispatch(push('addRequirement'));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);