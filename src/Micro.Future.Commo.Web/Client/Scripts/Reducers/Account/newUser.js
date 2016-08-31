import {TYPE_NEW_USER_EMAIL} from '../../Constants/ActionTypes';

const newUser = (state={}, action) => {
    switch(action.type){
        case TYPE_NEW_USER_EMAIL:{
            return Object.assign({}, state, {email: action.email});
        }
        default:
            return state;
    }
}

module.exports = newUser;