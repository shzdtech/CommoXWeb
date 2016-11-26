import { combineReducers } from 'redux';
import trades from './trades';
import tradeManager from './tradeManager';

const trade = combineReducers({
    trades,
    tradeManager
});

export default trade;