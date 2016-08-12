import { combineReducers } from 'redux';
import filters from './filters';
import filterContentToggled from './filterContentToggled'
import chains from './chains';
import requirements from './requirements'
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
    filters: filters,
    filterContentToggled: filterContentToggled,
    chains: chains,
    requirements: requirements,
    routing: routerReducer
});

export default reducers;