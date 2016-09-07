import { combineReducers } from 'redux';
import home from './home';
import commonFilterList from '../filterList';
import myFilterList from '../Models/MyFilterList';
import filters from './filters';
import chainListManager from './chainListManager';
import filterContentToggled from './filterContentToggled'
import chains from './chains';
import forms from './forms';
import common from './Common';
import requirements from './requirements';
import account from './Account/account';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
    home,
    filters: filters(commonFilterList),
    myFilters: filters(myFilterList),
    filterContentToggled,
    chains,
    chainListManager,
    requirements,
    forms,
    account,
    common,
    routing: routerReducer
});

export default reducers;