import {SELECT_FILTER, CHECK_ITEM, TOGGLE_MULTIPLE_SELECTION, TOGGLE_COLLAPSE} from '../Constants/ActionTypes';
import initialFilters from '../filterList';
import filterStatus from './filterStatus';

const selectedItems = (state = [], action) => {
 switch (action.type) {
        case CHECK_ITEM:
            if(action.isChecked){
                  return [
              ...state,
              action.item
            ];
            }else{
     return state.filter((item) =>{
                item.id !== action.item.id;
            });
            }
        default:
            return state;
    }
};

const filterReducer = (state, action) =>{
     switch (action.type) {
        case SELECT_FILTER:
            if(state.id !== action.filter.id){
                return state;
            }
            return Object.assign({}, action.filter, {selected: true});
        case CHECK_ITEM:
            if(state.id !== action.filter.id){
                return state;
            }
            return Object.assign({}, state, {selectedItems: selectedItems(state.selectedItems, action)});
        case TOGGLE_MULTIPLE_SELECTION:
        case TOGGLE_COLLAPSE:
              if(state.id !== action.filter.id){
                  return state;
              }
            return filterStatus(state, action);
        default:
            return state;
    }
};

const filters = (state = initialFilters, action) => {
    switch (action.type) {
        case CHECK_ITEM:
        case SELECT_FILTER:
        case TOGGLE_MULTIPLE_SELECTION:
        case TOGGLE_COLLAPSE: 
            return state.map((s)=>{
                return filterReducer(s, action);
            });
        default:
            return state;
    }
};

export default filters;
