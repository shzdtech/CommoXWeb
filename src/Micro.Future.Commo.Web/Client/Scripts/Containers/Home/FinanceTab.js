import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import {fetchFinance} from '../../Actions/AdminActions';
import FinanceTab from '../../Components/Home/FinanceTab';

const mapStateToProps = (state, ownProps) => {
    return {
        financeInfoList: state.home.financeInfoList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFinanceList: () => {
            dispatch(fetchFinance());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FinanceTab);