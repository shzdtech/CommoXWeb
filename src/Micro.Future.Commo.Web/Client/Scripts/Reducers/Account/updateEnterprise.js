import enterpriseForm from '../../Models/UpdateEnterpriseForm';
import {UPDATE_ENTERPRISE_FORM} from '../../Constants/ActionTypes';

const updateEnterpriseForm = (state = enterpriseForm, action) => {
    switch (action.type) {
        case UPDATE_ENTERPRISE_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        default:
            return state;
    }
};

export default updateEnterpriseForm;