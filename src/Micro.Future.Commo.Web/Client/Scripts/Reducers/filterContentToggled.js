import {TOGGLE_FILTER_LIST} from '../Constants/ActionTypes';

const filterContentToggled = (state = { isIn: true }, action) => {
    switch (action.type) {
        case TOGGLE_FILTER_LIST:
            return {
                isIn: !state.isIn
            };

        default:
            return state;
    }
};

export default filterContentToggled;