import initialChains from '../../chainList';
import {RECEIVE_CHAIN_LIST,
    FETCH_CHAIN_LIST_SUCCESS,
    CREATE_CHAIN_MANUALLY_SUCCESS,
    CONFIRM_CHAIN_SUCCEDD,
    CONFIRM_CHAIN_FAILURE,
    CHANGE_CHAIN_STATUS_SUCCESS,
    CHANGE_CHAIN_STATUS_FAILURE,
    UNLOCK_CHAIN_SUCCESS,
    REPLACE_REQUIREMENT_SUCCESS} from '../../Constants/ActionTypes';

const chain = (state = {}, action) => {
    switch (action.type) {
        case CONFIRM_CHAIN_SUCCEDD: {
            if (state.chainId !== action.chainId) {
                return state;
            }
            if (action.accept) {
                state = Object.assign({}, state)
                state.requirements.map((r) => {
                    if (r.requirementId === action.requirementId) {
                        r.accept = true;
                    }
                    return r;
                });
                return state;
            }
            return Object.assign({}, state, { reject: true });
        }
        case REPLACE_REQUIREMENT_SUCCESS: {
            if (state.chainId !== action.chainId) {
                return state;
            } else {
                state = Object.assign({}, state)
                state.requirements[action.index] = action.requirement;
                return state;
            }
        }
        default:
            return state;
    }
}

const chains = (state = [], action) => {
    switch (action.type) {
        //case RECEIVE_CHAIN_LIST:
        //   return action.chainList
        case FETCH_CHAIN_LIST_SUCCESS:
            return action.chains;
        case CONFIRM_CHAIN_SUCCEDD:
        case REPLACE_REQUIREMENT_SUCCESS:
            return state.map((s) => {
                return chain(s, action);
            });
        case CHANGE_CHAIN_STATUS_SUCCESS:
        case UNLOCK_CHAIN_SUCCESS:
            return state.filter((s) => {
                return s.chainId !== action.chain.chainId;
            });
        default:
            return state;
    }
}

export default chains;