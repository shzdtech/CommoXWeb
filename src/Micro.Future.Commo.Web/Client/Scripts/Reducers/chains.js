import initialChains from '../chainList';
import {RECEIVE_CHAIN_LIST,
    FETCH_CHAIN_LIST_SUCCESS,
    CONFIRM_CHAIN_SUCCEDD,
    CONFIRM_CHAIN_FAILURE,
    CHANGE_CHAIN_STATUS_SUCCESS,
    CHANGE_CHAIN_STATUS_FAILURE} from '../Constants/ActionTypes';

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
            return state.map((s) => {
                return chain(s, action);
            });
        case CHANGE_CHAIN_STATUS_SUCCESS:
            return state.filter((s) => {
                return s.chainId !== action.chain.chainId;
            });
        default:
            return state;
    }
}

export default chains;