import React from 'react';
import { connect } from 'react-redux';
import Header from '../Components/Header';

const mapStateToProps = (state, ownProps) => {
    return {
        userInfo: state.account.login
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Header);