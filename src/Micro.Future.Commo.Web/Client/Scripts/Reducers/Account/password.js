import {TYPE_PASSWORD_MODEL} from '../../Constants/ActionTypes';

const password = (state={}, action) => {
    switch(action.type){
        case TYPE_PASSWORD_MODEL:{
            let newState = Object.assign({}, state);
            newState[action.keyName] = action.value;
            return newState;
        }   
        default:
            return state;
    }
}

module.exports = password;