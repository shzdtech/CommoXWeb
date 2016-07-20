import { combineReducers } from 'redux'
import filters from './filters'
import filterStatus from './filterStatus'

const filterReducers = combineReducers({
    filters,
    filterStatus
})

export default filterReducers