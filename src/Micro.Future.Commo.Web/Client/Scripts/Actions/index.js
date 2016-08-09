import {
    TOGGLE_FILTER_LIST,
    TOGGLE_MULTIPLE_SELECTION,
    TOGGLE_COLLAPSE,
    SELECT_FILTER,
    REMOVE_FILTER,
    TYPE_ITEM,
    CHECK_ITEM,
    ADD_REQUIREMENT,
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

export const fetchChainsRequest = () => {
    var requirementId = 6; //temp
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
    payload: error
  };
};

export const fetchChains = ()=>{
    return (dispatch) =>{
        return fetchChainsRequest().then(
            chains => dispatch(fetchChainsSuccess(chains)),
            error => dispatch(fetchChainsFailure(error))
        );
    };
};

//requirement
export const addRequirement = (selectedFilters) => {
    return {
        type: ADD_REQUIREMENT,
        selectedFilters: selectedFilters
    };
};

export const requestRequirement = () => {
    return {
        type: REQUEST_REQUIREMENT
    };
};

export const receiveRequirement = (requirements) => {
    return {
        type: RECEIVE_REQUIREMENT,
        requirements: requirements
    };
};

export const fetchRequirementsRequest = () => {
    var requirementId = 6; //temp
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
    payload: error
  };
};

export const fetchRequirements = ()=>{
    return (dispatch) =>{
        return fetchRequirementsRequest().then(
            requirements => dispatch(fetchRequirementsSuccess(requirements)),
            error => dispatch(fetchRequirementssFailure(error))
        );
    };
};
