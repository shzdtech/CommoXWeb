import {GET_ALL_TRADE_SUCCESS} from '../../Constants/ActionTypes';

const trades = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_TRADE_SUCCESS:
            return action.trades;
        default:
            return state;
    }
}

export default trades;