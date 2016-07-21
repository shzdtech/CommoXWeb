import { combineReducers } from 'redux';
import filters from './filters';
import filterStatus from './filterStatus';

const filterReducers = combineReducers({
    filters
});

export default filterReducers;