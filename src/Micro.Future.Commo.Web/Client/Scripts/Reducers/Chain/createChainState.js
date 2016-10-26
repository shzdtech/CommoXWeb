import { ADD_CREATE_CHAIN_ELEMENT, REMOVE_CREATE_CHAIN_ELEMENT, ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS,
    SELECT_REQUIREMENT_TO_CREATE} from '../../Constants/ActionTypes';

const createChainState = (state = [], action) => {
    switch (action.type) {
        case ADD_CREATE_CHAIN_ELEMENT: {
            if (state.length > 0 && state[state.length - 1].requirement && state[state.length - 1].requirement.type == 2) {
                return [...state.slice(0, state.length - 1),
                    action.node, state[state.length - 1]];
            }

            return [...state, action.node];
        }
        case REMOVE_CREATE_CHAIN_ELEMENT: {
            return [...state.slice(0, action.index), ...state.slice(action.index + 1, state.length)];
        }

        case ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS:
        case SELECT_REQUIREMENT_TO_CREATE: {
            if (action.requirement.type === 1) {
                return [{ type: 1, requirement: action.requirement }, ...state];
            } else if (action.requirement.type === 3 && state.length > 0 &&
                state[state.length - 1].requirement
                && state[state.length - 1].requirement.type == 2) {
                return [...state.slice(0, state.length - 1),
                    { type: 1, requirement: action.requirement }, state[length - 1]];
            } else {
                return [...state, { type: 1, requirement: action.requirement }];
            }
        }
        default:
            return state;
    }
}

export default createChainState;