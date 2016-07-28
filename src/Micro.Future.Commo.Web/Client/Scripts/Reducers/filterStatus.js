import {TOGGLE_MULTIPLE_SELECTION, TOGGLE_COLLAPSE} from '../Constants/ActionTypes';

const filterStatus = (state, action) =>{
    switch(action.type){
        case TOGGLE_MULTIPLE_SELECTION: 
            return Object.assign({}, state, {
                isCollapsed: state.isMultipleSelected ? false : true,
                selectedItems: state.isMultipleSelected ? state.selectedItems : [],
                isMultipleSelected: !state.isMultipleSelected
            });
        case TOGGLE_COLLAPSE:
            return  Object.assign({}, state, {
                isCollapsed: !state.isCollapsed,
                isMultipleSelected: false,
                selectedItems: []
            });

        default: 
            return state;
    }
};

export default filterStatus;