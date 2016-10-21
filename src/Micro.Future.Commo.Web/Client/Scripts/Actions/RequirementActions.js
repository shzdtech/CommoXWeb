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
import {TEXT} from '../Constants/FilterTypes';
import {HOST} from '../appSettings';
import FilterProperty from '../Models/FilterProperty';
import { push } from 'react-router-redux';
import {ajaxError} from './CommonActions';
import {resetForm} from '../Actions';
//requirement
export const addRequirementRequest = (list, selectedType, enterpriseId) => {
    let requirement = {};
    requirement.rules = [];
    requirement.type = selectedType;
    list.forEach((l) => {

        if (l.type === TEXT) {
            if (l.value !== undefined && l.value !== null && l.value !== '') {
                if (l.filterProperty === FilterProperty.Requirement) {
                    requirement[l.key] = l.value;
                } else if (l.filterProperty === FilterProperty.Rule) {
                    requirement.rules.push({
                        ruleType: l.ruleType,
                        key: l.title,
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
    return (dispatch) => {
        return addRequirementRequest(list, selectedType, enterpriseId).then(
            requirement => {
                dispatch(resetForm());
                if (enterpriseId) {
                    dispatch(addRequirementForCreateChainSuccess(requirement));
                    dispatch(push('/createChain'));
                } else {            
                    dispatch(addRequirementSuccess(requirement));
                    dispatch(push('/requirements'));
                }
            },
            error => ajaxError(dispatch, error)
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


