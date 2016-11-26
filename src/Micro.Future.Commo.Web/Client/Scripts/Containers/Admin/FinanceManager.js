import React from 'react';
import { connect } from 'react-redux';
import FinanceManager from '../../Components/Admin/FinanceManager';
import {changeFinanceInfo, submitFinance, deleteFinance, fetchFinance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        financeInfo: state.admin.financeInfo,
        financeInfoList: state.home.financeInfoList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeForm: (key, newValue) => {
            dispatch(changeFinanceInfo(key, newValue));
        },
        onSubmit: (financeInfo) => {
            dispatch(submitFinance(financeInfo));
        },
        onDelete: (id) => {
            dispatch(deleteFinance(id));
        },
        fetchFinance : () => {
            dispatch(fetchFinance());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FinanceManager);