import { combineReducers } from 'redux';
import chains from './chains';
import chainListManager from './chainListManager';
import replaceRequirement from './replaceRequirement';
import createChainState from './createChainState';

const chain = combineReducers({
    chains,
    chainListManager,
    replaceRequirement,
    createChainState
});

export default chain;