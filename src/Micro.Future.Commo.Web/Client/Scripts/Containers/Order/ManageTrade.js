import React from 'react';
import { connect } from 'react-redux';
import ManageTrade from '../../Components/Order/ManageTrade';
import {getAllTrades, authenticateEnterprise} from '../../Actions/TradeActions';

const mapStateToProps = (state, ownProps) => {
    return {
        trades: state.trade.trades
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllTrades: () => {
            dispatch(getAllTrades());
        },
        authenticateEnterprise: (enterpriseId, state) => {
            dispatch(authenticateEnterprise(enterpriseId, state));
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ManageTrade);