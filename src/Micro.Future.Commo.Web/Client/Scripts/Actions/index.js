import {
    TOGGLE_FILTER_LIST,
    TOGGLE_MULTIPLE_SELECTION,
    TOGGLE_COLLAPSE,
    SELECT_FILTER,
    REMOVE_FILTER,
    TYPE_ITEM,
    CHECK_ITEM,
    ADD_REQUIREMENT,
    ADD_REQUIREMENT_SUCCESS,
    ADD_REQUIREMENT_FAILURE,
    FETCH_REQUIREMENT_LIST,
    FETCH_REQUIREMENT_LIST_SUCCESS,
    FETCH_REQUIREMENT_LIST_FAILURE,
    RECEIVE_CHAIN_LIST,
    FETCH_CHAIN_LIST,
    FETCH_CHAIN_LIST_SUCCESS,
    FETCH_CHAIN_LIST_FAILURE,
    REQUEST_REQUIREMENT,
    RECEIVE_REQUIREMENT} from '../Constants/ActionTypes';

import {HOST} from '../appSettings';
import FilterProperty from '../Models/FilterProperty';

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

//chain actions
export const receiveChainList = (chainList) => {
    return {
        type: RECEIVE_CHAIN_LIST,
        chainList: chainList
    };
};

export const fetchChainsRequest = (requirementId) => {
    const request = $.get(HOST + 'api/requirement/' + requirementId + '/Chains');

    return request;
};

export const fetchChainsSuccess = (chains) => {
    return {
        type: FETCH_CHAIN_LIST_SUCCESS,
        chains: chains
    };
};

export const fetchChainsFailure = (error) => {
    return {
        type: FETCH_CHAIN_LIST_FAILURE,
        error: error
    };
};

export const fetchChains = (requirementId) => {
    return (dispatch) => {
        return fetchChainsRequest(requirementId).then(
            chains => dispatch(fetchChainsSuccess(chains)),
            error => dispatch(fetchChainsFailure(error))
        );
    };
};

//requirement
export const addRequirementRequest = (selectedFilters) => {
    let requirement = {};
    requirement.rules = [];
    selectedFilters.forEach((f) => {
        let values = f.selectedItems.map((item) => { return item.value; });
        if (f.filterProperty === FilterProperty.Requirement) {
            requirement[f.key] = values.join(',');
        } else if (f.filterProperty === FilterProperty.Rule) {
            requirement.rules.push({
                ruleType: f.ruleType,
                key: f.title,
                value: values.join(','),
                operationType: 2
            });
        }
    });

    return $.post(HOST + 'api/Requirement', requirement);
};

export const addRequirementSuccess = (requirement)=>{
    return {
        type: ADD_REQUIREMENT_SUCCESS,
        requirement: requirement
    };
};

export const addRequirementFailure = (error)=>{
    return {
        type: ADD_REQUIREMENT_FAILURE,
        error: error
    };
};

export const addRequirement = (selectedFilters) =>{
     return (dispatch) => {
        return addRequirementRequest(selectedFilters).then(
            requirement => dispatch(addRequirementSuccess(requirement)),
            error => dispatch(addRequirementFailure(error))
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
            error => dispatch(fetchRequirementssFailure(error))
        );
    };
};
