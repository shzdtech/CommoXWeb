import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';
import { push } from 'react-router-redux'

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectDropdown: (key, event)=>{
            dispatch(push("/createuser"));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);