import React from 'react';
import { connect } from 'react-redux';
import FundTrade from '../../Components/Trade/FundTrade';
import {fetchFinance} from '../../Actions/AdminActions';

const mapStateToProps = (state, ownProps) => {
    return {
        financeInfoList: state.home.financeInfoList || []
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFinance : () => {
            dispatch(fetchFinance());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(FundTrade);