import createUserForm from '../../Models/CreateUserForm';
import {CHANGE_NEW_USER_FORM, CREATE_NEW_USER_SUCCESS} from '../../Constants/ActionTypes';

const newUser = (state=createUserForm, action) => {
    switch(action.type){
        case CHANGE_NEW_USER_FORM:{
            let newState = Object.assign({}, state, );
            newState[action.keyName] = action.value;
            return newState;
        }
        case CREATE_NEW_USER_SUCCESS:{
            return createUserForm;
        }
        default:
            return state;
    }
}

module.exports = newUser;