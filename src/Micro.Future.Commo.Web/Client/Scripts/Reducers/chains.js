import initialChains from '../chainList';
import {RECEIVE_CHAIN_LIST, FETCH_CHAIN_LIST_SUCCESS} from '../Constants/ActionTypes';

const chains = (state=[], action) => {
    switch (action.type) {
        //case RECEIVE_CHAIN_LIST:
         //   return action.chainList
        case FETCH_CHAIN_LIST_SUCCESS:
            return action.chains;
        default:
            return state;
    }
}

export default chains;