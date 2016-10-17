import React from 'react';
import { connect } from 'react-redux';
import FinanceManager from '../../Components/Admin/FinanceManager';
import {changeFinanceInfo, submitFinance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        financeInfo: state.admin.financeInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            dispatch(changeFinanceInfo(key, newValue));
        },
        onSubmit: (financeInfo) => {
            dispatch(submitFinance(financeInfo));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FinanceManager);