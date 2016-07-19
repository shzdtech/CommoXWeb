import {TOGGLE_MULTIPLE_SELECTION, TOGGLE_COLLAPSE} from '../Constants/ActionTypes';

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