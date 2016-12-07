import React from 'react';
import { connect } from 'react-redux';
import ManageTrade from '../../Components/Order/ManageTrade';
import {fetchTradeByType, selectTradeState, updateTradeState, 
    fetchMyTradeByType, updateOrderState, uploadOrderImages, deleteOrderImage,
    showBigImage,
    hideBigImage
} from '../../Actions/TradeActions';

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
        },
        updateOrderToNextState:(tradeId, orderId, newstate) => {
             dispatch(updateOrderState(tradeId, orderId, newstate));
        },
        uploadOrdersImage: (tradeId, orderId, imageType, images) => {
            dispatch(uploadOrderImages(tradeId, orderId, imageType, images))
        },
        deleteOrderImages: (tradeId, orderId, imageId) => {
            dispatch(deleteOrderImage(tradeId, orderId, imageId));
        },
        showBigImage:(imageUrl)=>{
            dispatch(showBigImage(imageUrl));
        },
        hideBigImage: ()=>{
            dispatch(hideBigImage());
        }
    };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(ManageTrade);