import {
    REQUEST_REQUIREMENT,
    RECEIVE_REQUIREMENT,
    ADD_REQUIREMENT,
    ADD_REQUIREMENT_SUCCESS,
    ADD_REQUIREMENT_FAILURE,
    FETCH_REQUIREMENT_LIST,
    FETCH_REQUIREMENT_LIST_SUCCESS,
    FETCH_REQUIREMENT_LIST_FAILURE,
    ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS
} from '../Constants/ActionTypes';
import {TEXT, DATE, LABEL} from '../Constants/FilterTypes';
import {HOST} from '../appSettings';
import FilterProperty from '../Models/FilterProperty';
import { push } from 'react-router-redux';
import {ajaxError, showToastr} from './CommonActions';
import {resetForm, showSpinner} from '../Actions';
//requirement
export const addRequirementRequest = (list, selectedType, enterpriseId) => {
    let requirement = {};
    requirement.rules = [];
    requirement.type = selectedType;
    list.forEach((l) => {

        if (l.type === TEXT || l.type === DATE || l.type === LABEL) {
            if (l.value !== undefined && l.value !== null && l.value !== '') {
                if (l.filterProperty === FilterProperty.Requirement) {
                    requirement[l.key] = l.value;
                } else if (l.filterProperty === FilterProperty.Rule) {
                    requirement.rules.push({
                        ruleType: l.ruleType,
                        key: l.title,
                        directionType: l.ruleDirectionType,
                        value: l.value,
                        operationType: 2
                    });
                }
            }
        } else {
            let values = l.items.filter((item) => { return item.selected; }).map((i) => { return i.value; });
            if (l.filterProperty === FilterProperty.Requirement) {
                requirement[l.key] = values.join(',');
            } else if (l.filterProperty === FilterProperty.Rule) {
                requirement.rules.push({
                    key: l.key,
                    value: values.join(','),
                    directionType: l.ruleDirectionType,
                    operationType: 1
                });
            }
        }
    });
    if (enterpriseId) {
        requirement.enterpriseId = enterpriseId;
    }
    return $.post(HOST + 'api/Requirement', requirement);
};

export const addRequirementSuccess = (requirement) => {
    return {
        type: ADD_REQUIREMENT_SUCCESS,
        requirement: requirement
    };
};

export const addRequirementFailure = (error) => {
    return {
        type: ADD_REQUIREMENT_FAILURE,
        error: error
    };
};

export const addRequirementForCreateChainSuccess = (requirement) => {
    return {
        type: ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS,
        requirement: requirement
    }
}

export const addRequirement = (list, selectedType, enterpriseId) => {
    return (dispatch, getState) => {
        const createChainState = getState().chain.createChainState;
        if (selectedType === 1 && createChainState.length > 0 && createChainState[0].requirement && createChainState[0].requirement.type == 1) {
            dispatch(push('/createChain'));
            dispatch(resetForm());
            return dispatch(showToastr({
                message: "一条匹配链中只可以存在一个采购客户",
                toastType: 'toast-error',
                show: true
            }));
        } else if (selectedType === 2 && createChainState.length > 0 &&
            createChainState[createChainState.length - 1].requirement
            && createChainState[createChainState.length - 1].requirement.type == 2) {
            dispatch(push('/createChain'));
            dispatch(resetForm());
            return dispatch(showToastr({
                message: "一条匹配链中只可以存在一个销售客户",
                toastType: 'toast-error',
                show: true
            }));
        }
        dispatch(showSpinner(true));

        return addRequirementRequest(list, selectedType, enterpriseId).then(
            requirement => {
                dispatch(showSpinner(false));
                dispatch(resetForm());
                if (enterpriseId) {
                    dispatch(addRequirementForCreateChainSuccess(requirement));

                    dispatch(push('/createChain'));
                } else {
                    dispatch(addRequirementSuccess(requirement));
                    dispatch(push('/requirement'));
                }
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
};

export const receiveRequirement = (requirements) => {
    return {
        type: RECEIVE_REQUIREMENT,
        requirements: requirements
    };
};

export const fetchRequirementsRequest = (searchCriteria) => {
    const request = $.get(HOST + 'api/requirement', searchCriteria);
    return request;
};

export const fetchRequirementsSuccess = (requirements) => {
    return {
        type: FETCH_REQUIREMENT_LIST_SUCCESS,
        requirements: requirements
    };
};

export const fetchRequirementssFailure = (error) => {
    return {
        type: FETCH_REQUIREMENT_LIST_FAILURE,
        error: error
    };
};

export const fetchRequirements = (searchCriteria) => {
    return (dispatch) => {
        return fetchRequirementsRequest(searchCriteria).then(
            requirements => dispatch(fetchRequirementsSuccess(requirements)),
            error => ajaxError(dispatch, error)
        );
    };
};


