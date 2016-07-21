import {
    TOGGLE_MULTIPLE_SELECTION, 
    TOGGLE_COLLAPSE,
    SELECT_FILTER,
    REMOVE_FILTER,
    CHECK_ITEM} from '../Constants/ActionTypes';

export const toggleFilterMutipleSelection = (filter)=>{
    return {
        filter: filter,
        type: TOGGLE_MULTIPLE_SELECTION
    };
};

export const toggleFilterCollapse = (filter)=>{
    return {
        filter: filter,
        type: TOGGLE_COLLAPSE
    };
};

export const selectFilter = (filter)=>{
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

export const removeFilter = (filter) => {
    return {
        type: REMOVE_FILTER,
        filter: filter,
    };
};