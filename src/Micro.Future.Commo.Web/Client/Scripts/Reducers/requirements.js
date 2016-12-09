import {ADD_REQUIREMENT, DELETE_REQUIREMENT_SUCCESS, ADD_REQUIREMENT_SUCCESS, FETCH_REQUIREMENT_LIST_SUCCESS, UPDATE_REQUIREMENT_EXPAND_STATE} from '../Constants/ActionTypes';

const requirements = (state = [], action) => {
    switch (action.type) {
        case ADD_REQUIREMENT_SUCCESS: {
            return [
                ...state,
                action.requirement
            ];
        }
        case FETCH_REQUIREMENT_LIST_SUCCESS: {
            return action.requirements;
        }
        case DELETE_REQUIREMENT_SUCCESS: {
            return state.filter((r)=>{
                return r.requirementId !== action.requirementId
            });
        }
        case UPDATE_REQUIREMENT_EXPAND_STATE:{
            return state.map((r)=>{
                if(r.requirementId !== action.requirementId){
                    return r;
                }else{
                    return Object.assign({}, r, {expanded: action.expanded})
                }
            })
        }
        default:
            return state;
    }
};

export default requirements;