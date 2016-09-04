import {
    REQUEST_REQUIREMENT,
    RECEIVE_REQUIREMENT,
    ADD_REQUIREMENT,
    ADD_REQUIREMENT_SUCCESS,
    ADD_REQUIREMENT_FAILURE,
    FETCH_REQUIREMENT_LIST,
    FETCH_REQUIREMENT_LIST_SUCCESS,
    FETCH_REQUIREMENT_LIST_FAILURE,
} from '../Constants/ActionTypes';
import {TEXT} from '../Constants/FilterTypes';
import {HOST} from '../appSettings';
import FilterProperty from '../Models/FilterProperty';
import { push } from 'react-router-redux';
import {ajaxError} from './CommonActions';
//requirement
export const addRequirementRequest = (list, selectedType) => {
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
                    ruleType: l.ruleType,
                    key: l.title,
                    value: values.join(','),
                    operationType: 2
                });
            }
        }
    });

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

export const addRequirement = (list, selectedType) => {
    return (dispatch) => {
        return addRequirementRequest(list, selectedType).then(
            requirement => {
                dispatch(addRequirementSuccess(requirement));
                dispatch(resetForm());
                dispatch(push('/requirements'));
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

export const fetchRequirementsRequest = () => {
    const request = $.get(HOST + 'api/requirement');
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

export const fetchRequirements = () => {
    return (dispatch) => {
        return fetchRequirementsRequest().then(
            requirements => dispatch(fetchRequirementsSuccess(requirements)),
            error => ajaxError(dispatch, error)
        );
    };
};


