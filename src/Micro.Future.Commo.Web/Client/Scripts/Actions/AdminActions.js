import {
    CHANGE_ACCEPTANCE_FORM,
    SUBMIT_ACCEPTANCE_FORM,
    SUBMIT_ACCEPTANCE_FORM_SUCCESS,
    FETCH_ACCEPTANCE_LIST_SUCCESS,
    CHANGE_FINANCE_FORM,
    SUBMIT_FINANCE_FORM,
    SUBMIT_FINANCE_FORM_SUCCESS,
    FETCH_FINANCE_LIST_SUCCESS
} from '../Constants/ActionTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import {ajaxError, showToastr} from './CommonActions';
import {showSpinner} from '../Actions';

export const changeFinanceInfo = (keyName, value) => {
    return {
        type: CHANGE_FINANCE_FORM,
        keyName: keyName,
        value: value
    };
};

export const changeAcceptanceInfo = (keyName, value) => {
    return {
        type: CHANGE_ACCEPTANCE_FORM,
        keyName: keyName,
        value: value
    };
};

const submitFinanceRequest = (financeInfo) => {
    var model = {};
    for (var key in financeInfo) {
        if (financeInfo[key].value === undefined) {
            model[key] = null;
        } else {
            model[key] = financeInfo[key].value;
        }
    }

    const request = $.post(HOST + 'api/Finance', model);
    return request;
};

const submitFinanceSuccess = () => {
    return {
        type: SUBMIT_FINANCE_FORM_SUCCESS
    };
};

export const submitFinance = (financeInfo) => {
    return (dispatch) => {
        return submitFinanceRequest(financeInfo).then(
            response => {
                dispatch(showToastr({
                    message: '产品添加成功，请至首页查看',
                    toastType: 'toast-success',
                    show: true,
                    autoClose: true
                }));
                dispatch(submitFinanceSuccess(response));
            },
            error => ajaxError(dispatch, error)
        );
    };
};


const submitAcceptanceRequest = (acceptanceInfo) => {
    var model = {};
    for (var key in acceptanceInfo) {
        if (acceptanceInfo[key].value === undefined) {
            model[key] = null;
        } else {
            model[key] = acceptanceInfo[key].value;
        }
    }

    const request = $.post(HOST + 'api/Acceptance', model);
    return request;
};

const submitAcceptanceSuccess = () => {
    return {
        type: SUBMIT_ACCEPTANCE_FORM_SUCCESS
    };
};

export const submitAcceptance = (financeInfo) => {
    return (dispatch) => {
        return submitAcceptanceRequest(financeInfo).then(
            response => {
                dispatch(showToastr({
                    message: '产品添加成功，请至首页查看',
                    toastType: 'toast-success',
                    show: true,
                    autoClose: true
                }));
                dispatch(submitAcceptanceSuccess(response));
            },
            error => ajaxError(dispatch, error)
        );
    };
};

const fetchAcceptanceRequest = () => {
    const request = $.get(HOST + 'api/Acceptance');
    return request;
};

const fetchAcceptanceSuccess = (acceptanceList) => {
    return {
        type: FETCH_ACCEPTANCE_LIST_SUCCESS,
        acceptanceList: acceptanceList
    };
};

export const fetchAcceptance = () => {
    return (dispatch) => {
        return fetchAcceptanceRequest().then(
            response => {
                dispatch(fetchAcceptanceSuccess(response));
            },
            error => ajaxError(dispatch, error)
        );
    };
};


const fetchFinanceRequest = () => {
    const request = $.get(HOST + 'api/Finance');
    return request;
};

const fetchFinanceSuccess = (financeInfoList) => {
    return {
        type: FETCH_FINANCE_LIST_SUCCESS,
        financeInfoList: financeInfoList
    };
};

export const fetchFinance = () => {
    return (dispatch) => {
        return fetchFinanceRequest().then(
            response => {
                dispatch(fetchFinanceSuccess(response));
            },
            error => ajaxError(dispatch, error)
        );
    };
};