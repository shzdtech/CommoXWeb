import enterpriseForm from '../../Models/UpdateEnterpriseForm';
import registerForm from '../../Models/EnterpriseForm';
import {UPDATE_ENTERPRISE_FORM, UPDATE_ENTERPRISE_SUCCESS, GET_ENTERPRISE_SUCCESS} from '../../Constants/ActionTypes';

const updateEnterpriseForm = (state = enterpriseForm, action) => {
    switch (action.type) {
        case UPDATE_ENTERPRISE_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        case GET_ENTERPRISE_SUCCESS: {
            let newState = Object.assign({}, state, );
            for (var key in newState) {
                if(action.enterpriseInfo[key] !== undefined && registerForm[key] !== undefined){
                    newState[key] = registerForm[key];
                    newState[key].value = action.enterpriseInfo[key];
                    newState[key].type = "label";
                }
                else if (action.enterpriseInfo[key] !== undefined && action.enterpriseInfo[key] !== null) {
                    newState[key].value = action.enterpriseInfo[key];
                }
            }
            return newState;
        }
        case UPDATE_ENTERPRISE_SUCCESS:
            return state;
        default:
            return state;
    }
};

export default updateEnterpriseForm;