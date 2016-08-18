import { combineReducers } from 'redux';
import filters from './filters';
import filterContentToggled from './filterContentToggled'
import chains from './chains';
import forms from './forms';
import requirements from './requirements';
import register from './register';
import { routerReducer } from 'react-router-redux';

const reducers = combineReducers({
    filters,
    filterContentToggled,
    chains,
    requirements,
    forms,
    register,
    routing: routerReducer
});

export default reducers;