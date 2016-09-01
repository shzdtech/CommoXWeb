import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { push } from 'react-router-redux';
import {signOut} from '../Actions';

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectDropdown: (key, event)=>{
            if(key === "1"){
                dispatch(push("/createuser"));
            }
            else if(key === "2"){
                dispatch(push("/changepassword"));
            }else if(key === "3"){
                dispatch(signOut());
            }
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);