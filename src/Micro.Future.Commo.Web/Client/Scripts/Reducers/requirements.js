import {ADD_REQUIREMENT, ADD_REQUIREMENT_SUCCESS, FETCH_REQUIREMENT_LIST_SUCCESS} from '../Constants/ActionTypes';
import FilterProperty from '../Models/FilterProperty';
import {HOST} from '../appSettings';

const requirements = (state = [], action) => {
    switch (action.type) {
        case ADD_REQUIREMENT_SUCCESS: {
            return [
                ...state,
                action.requirement
            ];
        }
        case FETCH_REQUIREMENT_LIST_SUCCESS: {
            return action.requirements;
        }
        default:
            return state;
    }
};

export default requirements;