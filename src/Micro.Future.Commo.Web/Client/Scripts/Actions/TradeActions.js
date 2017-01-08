import {
    FETCH_TRADE_BAY_TYPE_SUCCESS,
    SELECT_TRADE_STATE,
    UPDATE_TRADE_STATE_SUCCESS,
    SET_SELECT_ENTERPRISE_TRADE,
    SET_SELECT_ADMIN_TRADE,

    UPDATE_ORDER_STATE_SUCCESS,
    UPLOAD_ORDER_IMAGES_SUCCESS,

    DELETE_ORDER_IMAGE_SUCCESS,

    SHOW_BIG_ORDER_IMAGE,
    HIDE_BIG_ORDER_IMAGE
} from '../Constants/ActionTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import {ajaxError, showToastr} from './CommonActions';
import {showSpinner} from '../Actions';


const fetchTradeByTypeSuccess = (trades) => {
    return {
        type: FETCH_TRADE_BAY_TYPE_SUCCESS,
        trades: trades
    }
}

const fetchTradeByTypeRequest = (typeId) => {
    return $.ajax({
        type: 'get',
        url: HOST + 'api/Trade/State/' + typeId
    });
}

export const fetchTradeByType = (typeId) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return fetchTradeByTypeRequest(typeId).then(
            trades => {
                dispatch(showSpinner(false));
                dispatch(fetchTradeByTypeSuccess(trades));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
};

export const selectTradeState = (item) => {
    return {
        type: SELECT_TRADE_STATE,
        item: item
    }
}

export const updateTradeState = (tradeId, newstate) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return updateTradeStateRequest(tradeId, newstate).then(
            res => {
                dispatch(updateTradeStateSuccess(tradeId));
                dispatch(showSpinner(false));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
}


const updateTradeStateRequest = (tradeId, newstate) => {
    const request = $.post(HOST + 'api/Trade/' + tradeId + '/State/' + newstate);
    return request;
};

export const updateTradeStateSuccess = (tradeId) => {
    return {
        type: UPDATE_TRADE_STATE_SUCCESS,
        tradeId: tradeId
    }
};

const fetchMyTradeByTypeRequest = (typeId) => {
    return $.ajax({
        type: 'get',
        url: HOST + 'api/Trade/Enterprise/State/' + typeId
    });
}

export const fetchMyTradeByType = (typeId) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return fetchMyTradeByTypeRequest(typeId).then(
            trades => {
                dispatch(showSpinner(false));
                dispatch(fetchTradeByTypeSuccess(trades));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
};

export const setSelectEnterpriseTrade = () => {

    return (dispatch, getState) => {
        const state = getState();
        return dispatch({
            type: SET_SELECT_ENTERPRISE_TRADE,
            enterpriseId: state.account.login.enterpriseId
        });
    }
};

export const setSelectAdminTrade = () => {
    return {
        type: SET_SELECT_ADMIN_TRADE
    }
}

export const updateOrderState = (tradeId, orderId, newstate) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return updateOrderStateRequest(tradeId, orderId, newstate).then(
            res => {
                dispatch(updateOrderStateSuccess(tradeId, orderId));
                dispatch(showSpinner(false));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
}


const updateOrderStateRequest = (tradeId, orderId, newstate) => {
    const request = $.post(HOST + 'api/Order/' + orderId + '/State/' + newstate);
    return request;
};

export const updateOrderStateSuccess = (tradeId, orderId) => {
    return {
        type: UPDATE_ORDER_STATE_SUCCESS,
        orderId: orderId,
        tradeId: tradeId
    }
};


const uploadOrderImagesRequest = (tradeId, orderId, imageType, model) => {
     const request = $.ajax({
        type: 'post',
        url: HOST + 'api/Order/' + orderId + '/Trade/' + tradeId + '/Files/Type/'+ imageType,
        contentType: false,
        processData: false,
        data: model,
        timeout: 600000
    });
    return request;
}

const uploadOrderImagesSuccess = (tradeId, orderId, orderImages)=>{
    return {
        type: UPLOAD_ORDER_IMAGES_SUCCESS,
        tradeId: tradeId,
        orderId: orderId,
        orderImages: orderImages

    };
};

export const uploadOrderImages = (tradeId, orderId, imageType, images) => {
    var model = new FormData();
    if(images !== null && images.length > 0){
        for(let i = 0; i< images.length; i++){
                 model.append('files[]', images[i]);
        }
    }
    return (dispatch) => {
        dispatch(showSpinner(true));
        return uploadOrderImagesRequest(tradeId, orderId, imageType, model).then(
            orderImages => {
                dispatch(showSpinner(false));
                dispatch(uploadOrderImagesSuccess(tradeId, orderId, orderImages));    
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
}

const deleteOrderImageRequest = (orderImageId)=>{
    return $.ajax({
        type: 'delete',
        url: HOST + 'api/Order/OrderImage/' + orderImageId
    });
}

const deleteOrderImageSuccess = (tradeId, orderId, orderImageId) => {
    return {
        type: DELETE_ORDER_IMAGE_SUCCESS,
        tradeId: tradeId,
        orderId: orderId,
        orderImageId: orderImageId
    }
}

export const deleteOrderImage = (tradeId, orderId, orderImageId) => {
     return (dispatch) => {
        return deleteOrderImageRequest(orderImageId).then(
            res => {
                dispatch(deleteOrderImageSuccess(tradeId, orderId, orderImageId));    
            },
            error => {
                ajaxError(dispatch, error);
            }
        );
    };
}

export const showBigImage = (imageUrl)=>{
     return {
         type: SHOW_BIG_ORDER_IMAGE,
         imageUrl: imageUrl
     }
 }

export const  hideBigImage = ()=>{
      return {
          type: HIDE_BIG_ORDER_IMAGE
      }
  }
