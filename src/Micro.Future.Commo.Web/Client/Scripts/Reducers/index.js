import { combineReducers } from 'redux';
import filters from './filters';
import filterStatus from './filterStatus';
import filterContentToggled from './filterContentToggled'

const filterReducers = combineReducers({
    filters,
    filterContentToggled
});

export default filterReducers;