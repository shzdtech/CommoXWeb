import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {selectProductCode} from '../../Actions';
import BasisTab from '../../Components/Home/BasisTab';

const mapStateToProps = (state, ownProps) => {
    return {
        productCodeDropDown: state.home.productCodeDropDown
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectProductCode: (key, newValue) => {
            dispatch(selectProductCode(key, newValue));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(BasisTab);