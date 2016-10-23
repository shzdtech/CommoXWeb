import { ADD_CREATE_CHAIN_ELEMENT, REMOVE_CREATE_CHAIN_ELEMENT, ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS ,
    SELECT_REQUIREMENT_TO_CREATE} from '../../Constants/ActionTypes';

const createChainState = (state = [], action) => {
    switch (action.type) {
        case ADD_CREATE_CHAIN_ELEMENT: {
            return [...state, action.node];
        }
        case REMOVE_CREATE_CHAIN_ELEMENT: {
            return [...state.slice(0, action.index), ...state.slice(action.index + 1, state.length)];
        }
        
        case ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS: 
        case SELECT_REQUIREMENT_TO_CREATE: {
            return [...state, {type: 1, requirement: action.requirement}];
        }
        default:
            return state;
    }
}

export default createChainState;