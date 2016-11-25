import {FETCH_TRADE_BAY_TYPE_SUCCESS, UPDATE_TRADE_STATE_SUCCESS} from '../../Constants/ActionTypes';

const trades = (state = [], action) => {
    switch (action.type) {
        case FETCH_TRADE_BAY_TYPE_SUCCESS:
            return action.trades;
        case UPDATE_TRADE_STATE_SUCCESS: {
            return state.filter((t) => { return t.tradeId !== action.tradeId });
        }
        default:
            return state;
    }
}

export default trades;