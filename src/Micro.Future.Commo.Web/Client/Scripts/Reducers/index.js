import { combineReducers } from 'redux';
import filters from './filters';
import filterContentToggled from './filterContentToggled'
import chains from './chains';

const reducers = combineReducers({
    filters,
    filterContentToggled,
    chains
});

export default reducers;