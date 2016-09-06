import {SHOW_SPINNER} from '../Constants/ActionTypes';
export default (state = false, action) => {
    switch (action.type) {
        case SHOW_SPINNER:
            return action.showSpinner;
        default:
            return state;
    }
}