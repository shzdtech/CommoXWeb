import acceptance from '../../Models/Acceptance';
import {CHANGE_ACCEPTANCE_FORM,
    SUBMIT_ACCEPTANCE_FORM,
    SUBMIT_ACCEPTANCE_FORM_SUCCESS } from '../../Constants/ActionTypes';

const acceptanceInfo = (state = acceptance, action) => {
    switch (action.type) {
        case CHANGE_ACCEPTANCE_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        default:
            return state;
    }
};

export default acceptanceInfo;