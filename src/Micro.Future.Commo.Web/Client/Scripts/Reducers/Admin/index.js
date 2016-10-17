import { combineReducers } from 'redux';
import acceptanceInfo from './acceptanceInfo';
import financeInfo from './financeInfo';

const admin = combineReducers({
    acceptanceInfo,
    financeInfo
});

export default admin;