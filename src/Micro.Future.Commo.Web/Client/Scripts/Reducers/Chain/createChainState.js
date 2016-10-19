import { ADD_CREATE_CHAIN_ELEMENT, REMOVE_CREATE_CHAIN_ELEMENT } from '../../Constants/ActionTypes';

const createChainState = (state = [], action) => {
    switch (action.type) {
        case ADD_CREATE_CHAIN_ELEMENT: {
            return [...state, action.node];
        }
        case REMOVE_CREATE_CHAIN_ELEMENT: {
            return [...state.slice(0, action.index), ...state.slice(action.index + 1, state.length)];
        }
        default:
            return state;
    }
}

export default createChainState;