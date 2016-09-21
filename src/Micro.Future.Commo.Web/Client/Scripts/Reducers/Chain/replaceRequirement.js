import {GET_REQUIREMENT_REPLACEMENT_SUCCESS, CANCEL_REPLACE_REQUIREMENT, COMPLETE_REPLACE_REQUIREMENT} from '../../Constants/ActionTypes';

const replaceRequirement = (state = {}, action) => {
    switch (action.type) {
        case GET_REQUIREMENT_REPLACEMENT_SUCCESS: {
            return Object.assign({}, state, {
                chainId: action.chainId,
                index: action.index,
                requirements: action.requirements
            });
        }
        case CANCEL_REPLACE_REQUIREMENT:
        case COMPLETE_REPLACE_REQUIREMENT: {
            return {};
        }
        default:
            return state;
    }
}

export default replaceRequirement;