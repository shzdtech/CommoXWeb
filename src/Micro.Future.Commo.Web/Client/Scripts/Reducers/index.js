import { combineReducers } from 'redux';
import filters from './filters';
import filterContentToggled from './filterContentToggled'
import chains from './chains';
import requirements from './requirements'

const reducers = combineReducers({
    filters,
    filterContentToggled,
    chains,
    requirements
});

export default reducers;