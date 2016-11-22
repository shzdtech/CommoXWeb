import {
    GET_ALL_TRADE_SUCCESS
} from '../Constants/ActionTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import {ajaxError, showToastr} from './CommonActions';
import {showSpinner} from '../Actions';


const getAllTradesSuccess = (id) => {
    return {
        type: GET_ALL_TRADE_SUCCESS,
        trades: trades
    }
}

const getAllTradesRequest = () => {
    return $.ajax({
        type: 'get',
        url: HOST + 'api/Trade'
    });
}

export const getAllTrades = () => {
    return (dispatch) => {
        return getAllTradesRequest().then(
            trades => {
                dispatch(getAllTradesSuccess(trades));
            },
            error => ajaxError(dispatch, error)
        );
    };
};