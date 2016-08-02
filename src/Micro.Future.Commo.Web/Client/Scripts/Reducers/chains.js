import initialChains from '../chainList';
import {RECEIVE_CHAIN_LIST} from '../Constants/ActionTypes';

const chains = (state = initialChains, action) => {
    switch (action.type) {
        case RECEIVE_CHAIN_LIST:
            return action.chainList
        default:
            return state;
    }
}

export default chains;