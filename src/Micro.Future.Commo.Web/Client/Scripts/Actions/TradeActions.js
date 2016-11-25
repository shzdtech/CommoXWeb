import {
    FETCH_TRADE_BAY_TYPE_SUCCESS,
    SELECT_TRADE_STATE,
    UPDATE_TRADE_STATE_SUCCESS,
    SET_SELECT_ENTERPRISE_TRADE,
    SET_SELECT_ADMIN_TRADE
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
    return {
        type: SET_SELECT_ENTERPRISE_TRADE
    }
};

export const setSelectAdminTrade = () => {
    return {
        type: SET_SELECT_ADMIN_TRADE
    }
}
