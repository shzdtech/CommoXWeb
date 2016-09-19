import resetPasswordForm from '../../Models/resetPasswordForm';
import {CHANGE_RESET_PASSWORD_FORM} from '../../Constants/ActionTypes';

const resetPassword = (state = resetPasswordForm, action) => {
    switch (action.type) {
        case CHANGE_RESET_PASSWORD_FORM: {
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        default:
            return state;
    }
};

export default resetPassword;