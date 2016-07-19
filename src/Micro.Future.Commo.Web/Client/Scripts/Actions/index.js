import {
    TOGGLE_MULTIPLE_SELECTION, 
    TOGGLE_COLLAPSE,
    ADD_FILTER} from '../Constants/ActionTypes';

export const toggleFilterMutipleSelection = ()=>{
    return {
        type: TOGGLE_MULTIPLE_SELECTION
    }
}

export const toggleFilterCollapse = ()=>{
    return {
        type: TOGGLE_COLLAPSE
    }
}

export const addFilter = (filter)=>{
    return {
        type: ADD_FILTER,
        filter: filter
    }
}