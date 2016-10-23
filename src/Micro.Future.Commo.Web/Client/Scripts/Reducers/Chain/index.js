import { combineReducers } from 'redux';
import chains from './chains';
import chainListManager from './chainListManager';
import replaceRequirement from './replaceRequirement';
import createChainState from './createChainState';
import selectRequirement from './selectRequirement';
import createChainOptions from './createChainOptions';

const chain = combineReducers({
    chains,
    chainListManager,
    replaceRequirement,
    selectRequirement,
    createChainState,
    createChainOptions
});

export default chain;