import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { push } from 'react-router-redux';
import {signOut} from '../Actions/AccountActions';
import {makeChain} from '../Actions/ChainActions';

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login
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
            }
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);