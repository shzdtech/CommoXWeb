import { combineReducers } from 'redux';
import showSpinner from './showSpinner';
import toastr from './toastr';

const reducers = combineReducers({
    showSpinner,
    toastr
});

export default reducers;