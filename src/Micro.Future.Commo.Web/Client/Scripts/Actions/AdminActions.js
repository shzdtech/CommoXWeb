import {
    CHANGE_ACCEPTANCE_FORM,
    SUBMIT_ACCEPTANCE_FORM,
    SUBMIT_ACCEPTANCE_FORM_SUCCESS,
    FETCH_ACCEPTANCE_LIST_SUCCESS,
    CHANGE_FINANCE_FORM,
    SUBMIT_FINANCE_FORM,
    SUBMIT_FINANCE_FORM_SUCCESS,
    FETCH_FINANCE_LIST_SUCCESS,
    DELETE_ACCEPTANCE_SUCCESS,
    DELETE_FINANCE_SUCCESS,

    CHANGE_ACCEPTANCE_BANK_FORM,
    SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS,
    FETCH_ACCEPTANCE_BANK_LIST_SUCCESS,
    DELETE_ACCEPTANCE_BANK_SUCCESS
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

const submitFinanceRequest = (model) => {
    const request = $.post(HOST + 'api/Finance', model);
    return request;
};

const submitFinanceSuccess = (financeInfo) => {
    return {
        type: SUBMIT_FINANCE_FORM_SUCCESS,
        financeInfo: financeInfo
    };
};

export const submitFinance = (financeInfo) => {
    var model = {};
    for (var key in financeInfo) {
        if (financeInfo[key].value === undefined) {
            model[key] = null;
        } else {
            model[key] = financeInfo[key].value;
        }
    }

    return (dispatch) => {
        return submitFinanceRequest(model).then(
            response => {
                model.productId = response;
                dispatch(submitFinanceSuccess(model));
            },
            error => ajaxError(dispatch, error)
        );
    };
};


const submitAcceptanceRequest = (acceptanceInfo) => {
    const request = $.post(HOST + 'api/Acceptance', acceptanceInfo);
    return request;
};

const submitAcceptanceSuccess = (acceptanceInfo) => {
    return {
        type: SUBMIT_ACCEPTANCE_FORM_SUCCESS,
        acceptanceInfo: acceptanceInfo
    };
};

export const submitAcceptance = (acceptanceInfo) => {
    var model = {};
    for (var key in acceptanceInfo) {
        if (acceptanceInfo[key].value === undefined) {
            model[key] = null;
        } else {
            model[key] = acceptanceInfo[key].value;
        }
    }

    return (dispatch) => {
        return submitAcceptanceRequest(model).then(
            response => {
                model.acceptanceId = response;
                dispatch(submitAcceptanceSuccess(model));
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

const deleteFinanceSuccess = (id) => {
    return {
        type: DELETE_FINANCE_SUCCESS,
        financeId: id
    }
}

const deleteFinanceRequest = (id) => {
    return $.ajax({
        type: 'delete',
        url: HOST + 'api/Finance/' + id
    });
}

export const deleteFinance = (id) => {
    return (dispatch) => {
        return deleteFinanceRequest(id).then(
            response => {
                dispatch(deleteFinanceSuccess(id));
            },
            error => ajaxError(dispatch, error)
        );
    };
};

const deleteAcceptanceSuccess = (id) => {
    return {
        type: DELETE_ACCEPTANCE_SUCCESS,
        acceptanceId: id
    }
}

const deleteAcceptanceRequest = (id) => {
    return $.ajax({
        type: 'delete',
        url: HOST + 'api/Acceptance/' + id
    });
}

export const deleteAcceptance = (id) => {
    return (dispatch) => {
        return deleteAcceptanceRequest(id).then(
            response => {
                dispatch(deleteAcceptanceSuccess(id));
            },
            error => ajaxError(dispatch, error)
        );
    };
};


export const changeAcceptanceBankInfo = (keyName, value) => {
    return {
        type: CHANGE_ACCEPTANCE_BANK_FORM,
        keyName: keyName,
        value: value
    };
};

const submitAcceptanceBankRequest = (acceptanceBankInfo) => {
    const request = $.post(HOST + 'api/Acceptance/Bank', acceptanceBankInfo);
    return request;
};

const submitAcceptanceBankSuccess = (acceptanceBankInfo) => {
    return {
        type: SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS,
        acceptanceBankInfo: acceptanceBankInfo
    };
};

export const submitAcceptanceBank = (acceptanceBankInfo) => {
    var model = {};
    for (var key in acceptanceBankInfo) {
        if (acceptanceBankInfo[key].value === undefined) {
            model[key] = null;
        } else {
            model[key] = acceptanceBankInfo[key].value;
        }
    }

    return (dispatch) => {
        return submitAcceptanceBankRequest(model).then(
            response => {
                dispatch(submitAcceptanceBankSuccess(response));
            },
            error => ajaxError(dispatch, error)
        );
    };
};

const fetchAcceptanceBankRequest = () => {
    const request = $.get(HOST + 'api/Acceptance/Bank');
    return request;
};

const fetchAcceptanceBankSuccess = (acceptanceBankList) => {
    return {
        type: FETCH_ACCEPTANCE_BANK_LIST_SUCCESS,
        acceptanceBankList: acceptanceBankList
    };
};

export const fetchAcceptanceBank = () => {
    return (dispatch) => {
        return fetchAcceptanceBankRequest().then(
            response => {
                dispatch(fetchAcceptanceBankSuccess(response));
            },
            error => ajaxError(dispatch, error)
        );
    };
};


const deleteAcceptanceBankSuccess = (id) => {
    return {
        type: DELETE_ACCEPTANCE_BANK_SUCCESS,
        bankId: id
    }
}

const deleteAcceptanceBankRequest = (id) => {
    return $.ajax({
        type: 'delete',
        url: HOST + 'api/Acceptance/Bank/' + id
    });
}

export const deleteAcceptanceBank = (id) => {
    return (dispatch) => {
        return deleteAcceptanceBankRequest(id).then(
            response => {
                dispatch(deleteAcceptanceBankSuccess(id));
            },
            error => ajaxError(dispatch, error)
        );
    };
};