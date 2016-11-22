import { combineReducers } from 'redux';
import acceptanceInfo from './acceptanceInfo';
import acceptanceBankInfo from './acceptanceBankInfo';
import financeInfo from './financeInfo';

const admin = combineReducers({
    acceptanceInfo,
    acceptanceBankInfo,
    financeInfo
});

export default admin;