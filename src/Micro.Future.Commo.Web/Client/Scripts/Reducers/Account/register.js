import enterpriseForm from '../../Models/EnterpriseForm';
import {CHANGE_ENTERPRISE_FORM, REGISTER_ENTERPRISE, REGISTER_ENTERPRISE_SUCCESS} from '../../Constants/ActionTypes';

const register = (state = enterpriseForm, action) => {
    switch (action.type) {
        case CHANGE_ENTERPRISE_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        case REGISTER_ENTERPRISE_SUCCESS: {
            return enterpriseForm;
        }
        default:
            return state;
    }
};

export default register;