import { combineReducers } from 'redux';
import chains from './chains';
import chainListManager from './chainListManager';
import replaceRequirement from './replaceRequirement';

const chain = combineReducers({
    chains,
    chainListManager,
    replaceRequirement
});

export default chain;