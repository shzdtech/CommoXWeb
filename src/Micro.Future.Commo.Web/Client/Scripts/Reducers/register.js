import enterpriseForm from '../Models/EnterpriseForm';
import {CHANGE_ENTERPRISE_FORM} from '../Constants/ActionTypes';

const register = (state = enterpriseForm, action) => {
    switch (action.type) {
        case CHANGE_ENTERPRISE_FORM: {
            return state;
        }
        default:
            return state;
    }
};

export default register;