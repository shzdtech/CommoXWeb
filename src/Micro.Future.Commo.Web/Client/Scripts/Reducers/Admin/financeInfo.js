import finance from '../../Models/Finance';
import {CHANGE_FINANCE_FORM,
    SUBMIT_FINANCE_FORM,
    SUBMIT_FINANCE_FORM_SUCCESS
 } from '../../Constants/ActionTypes';

const financeInfo = (state = finance, action) => {
    switch (action.type) {
        case CHANGE_FINANCE_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        case SUBMIT_FINANCE_FORM_SUCCESS: {
            return enterpriseForm;
        }
        default:
            return state;
    }
};

export default financeInfo;