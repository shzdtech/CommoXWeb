import { combineReducers } from 'redux';
import home from './home';
import commonFilterList from '../filterList';
import myFilterList from '../Models/MyFilterList';
import filters from './filters';
import chain from './Chain';
import filterContentToggled from './filterContentToggled'
import forms from './forms';
import common from './Common';
import requirements from './requirements';
import account from './Account/account';
import admin from './Admin';
import trade from './Trade';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
    home,
    filters: filters(commonFilterList),
    myFilters: filters(myFilterList),
    selectRequirementFilters: filters(commonFilterList),
    filterContentToggled,
    chain,
    requirements,
    forms,
    account,
    common,
    admin,
    trade,
    routing: routerReducer
});

export default reducers;