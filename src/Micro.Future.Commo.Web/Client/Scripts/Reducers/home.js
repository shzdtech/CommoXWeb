import {SEARCH_BY_FILTER_SUCCESS} from '../Constants/ActionTypes';

const requirements = (state = [], action) => {
    switch (action.type) {
        case SEARCH_BY_FILTER_SUCCESS: {
            return action.requirements;
        }
        default:
            return state;
    }
};

const home = (state = {requirements:[]}, action) => {
    switch (action.type) {
        case SEARCH_BY_FILTER_SUCCESS: {
            return Object.assign({}, state, {requirements:requirements(state.requirements, action)});
        }
        default:
            return state;
    }
}

export default home;