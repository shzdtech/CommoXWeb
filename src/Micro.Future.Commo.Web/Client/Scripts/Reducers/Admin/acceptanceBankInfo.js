import acceptanceBank from '../../Models/AcceptanceBank';
import {CHANGE_ACCEPTANCE_BANK_FORM,
    SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS } from '../../Constants/ActionTypes';

const acceptanceBankInfo = (state = acceptanceBank, action) => {
    switch (action.type) {
        case CHANGE_ACCEPTANCE_BANK_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        default:
            return state;
    }
};

export default acceptanceBankInfo;