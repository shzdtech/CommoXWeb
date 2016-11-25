import React from 'react';
import { connect } from 'react-redux';
import ManageTrade from '../../Components/Order/ManageTrade';
import {fetchTradeByType, selectTradeState, updateTradeState, fetchMyTradeByType} from '../../Actions/TradeActions';

const mapStateToProps = (state, ownProps) => {
    return {
        trades: state.trade.trades,
        formItem: state.trade.tradeManager,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
         onFormItemSelected: (formItem, item) => {
            dispatch(selectTradeState(item));
            if(formItem.isMine){
                dispatch(fetchMyTradeByType(item.value));
            }else{                
                dispatch(fetchTradeByType(item.value));
            }
        },
        updateToNextState: (tradeId, newstate) => {
            dispatch(updateTradeState(tradeId, newstate));
        } 
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ManageTrade);