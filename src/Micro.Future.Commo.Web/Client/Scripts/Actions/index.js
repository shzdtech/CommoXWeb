import {
    TOGGLE_FILTER_LIST,
    TOGGLE_MULTIPLE_SELECTION,
    TOGGLE_COLLAPSE,
    SELECT_FILTER,
    REMOVE_FILTER,
    TYPE_ITEM,
    CHECK_ITEM,
    SEARCH_BY_FILTER_SUCCESS,
    SEARCH_BY_FILTER_FAILURE,

    CONFIRM_CHAIN_SUCCEDD,
    CONFIRM_CHAIN_FAILURE,
    CHANGE_FORM_TYPE,
    SELECT_FORM_ITEM,
    TYPE_FORM_ITEM,
    RESET_FORM
} from '../Constants/ActionTypes';
import {TEXT} from '../Constants/FilterTypes';
import {HOST} from '../appSettings';
import FilterProperty from '../Models/FilterProperty';
import { push } from 'react-router-redux';
import auth from '../auth';
import {ajaxError} from './CommonActions';

//filter actions
export const toggleFilterMutipleSelection = (filter) => {
    return {
        filter: filter,
        type: TOGGLE_MULTIPLE_SELECTION
    };
};

export const toggleFilterCollapse = (filter) => {
    return {
        filter: filter,
        type: TOGGLE_COLLAPSE
    };
};

export const selectFilter = (filter) => {
    return {
        type: SELECT_FILTER,
        filter: filter
    };
};

export const checkItem = (isChecked, filter, item) => {
    return {
        type: CHECK_ITEM,
        isChecked: isChecked,
        filter: filter,
        item: item
    };
};

export const typeItem = (filter, item) => {
    return {
        type: TYPE_ITEM,
        filter: filter,
        item: item
    };
};

export const removeFilter = (filter) => {
    return {
        type: REMOVE_FILTER,
        filter: filter
    };
};

export const toggleFilterList = () => {
    return {
        type: TOGGLE_FILTER_LIST
    };
};

const searchByFilterRequest = (searchCriteria) => {
    return $.get(HOST + 'api/requirement/SearchResult', searchCriteria);
};

const searchByFilterSuccess = (requirements) => {
    return {
        type: SEARCH_BY_FILTER_SUCCESS,
        requirements: requirements
    };
};

const searchByFilterFailure = (error) => {
    return {
        type: SEARCH_BY_FILTER_FAILURE,
        error: error
    };
};

export const searchByFilter = (searchCriteria)=>{
    return (dispatch) => {
            return searchByFilterRequest(searchCriteria).then(
                requirements => dispatch(searchByFilterSuccess(requirements)),
                error => ajaxError(dispatch, error)
            );
        };
};

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


//form
export const changeFormType = (formType) => {
    return {
        type: CHANGE_FORM_TYPE,
        formType: formType
    };
};

export const selectFormItem = (formItem, item) => {
    return {
        type: SELECT_FORM_ITEM,
        formItem: formItem,
        item: item
    };
};

export const typeFormItem = (formItem, value) => {
    return {
        type: TYPE_FORM_ITEM,
        formItem: formItem,
        value: value
    }
};

export const resetForm = () => {
    return {
        type: RESET_FORM
    };
};

