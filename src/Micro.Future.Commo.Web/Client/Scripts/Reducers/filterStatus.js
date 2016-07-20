import {TOGGLE_MULTIPLE_SELECTION, TOGGLE_COLLAPSE} from '../Constants/ActionTypes';
const initialState ={
    isCollapsed: false,
    isMultipleSelected: false
}
const filterStatus = (state = initialState, action) =>{
    switch(action.type){
        case TOGGLE_MULTIPLE_SELECTION: 
            return {
                isCollapsed: state.isMultipleSelected ? false : true,
                isMultipleSelected: !state.isMultipleSelected
            }
        case TOGGLE_COLLAPSE:
            return {
                isCollapsed: !state.isCollapsed,
                isMultipleSelected: false
            }

        default: 
            return state;
    }
}

export default filterStatus;