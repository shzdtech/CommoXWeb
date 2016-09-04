import { combineReducers } from 'redux';
import home from './home';
import filters from './filters';
import chainListManager from './chainListManager';
import filterContentToggled from './filterContentToggled'
import chains from './chains';
import forms from './forms';
import requirements from './requirements';
import account from './Account/account';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
    home,
    filters,
    filterContentToggled,
    chains,
    chainListManager,
    requirements,
    forms,
    account,
    routing: routerReducer
});

export default reducers;