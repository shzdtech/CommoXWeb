import { combineReducers } from 'redux';
import filters from './filters';
import filterContentToggled from './filterContentToggled'
import chains from './chains';
import forms from './forms';
import requirements from './requirements'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
    filters,
    filterContentToggled,
    chains,
    requirements,
    forms,
    routing: routerReducer
});

export default reducers;