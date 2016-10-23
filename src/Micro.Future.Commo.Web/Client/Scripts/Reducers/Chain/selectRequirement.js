import {CREATE_CAHIN_WITH_SELECT_REQUIREMENT_SUCCESS, 
    CANCEL_SELECT_REQUIREMENT, 
    COMPLETE_SELECT_REQUIREMENT,
    RESET_SELECT_REQUIREMENT
} from '../../Constants/ActionTypes';

const selectRequirement = (state = {}, action) => {
    switch (action.type) {
        case CREATE_CAHIN_WITH_SELECT_REQUIREMENT_SUCCESS: {
            return Object.assign({}, state, {
                index: action.index,
                requirements: action.requirements
            });
        }
        case RESET_SELECT_REQUIREMENT:{
            return {};
        }
        default:
            return state;
    }
}

export default selectRequirement;