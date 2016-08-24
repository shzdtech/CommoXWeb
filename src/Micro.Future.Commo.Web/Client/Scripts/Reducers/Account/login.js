import {LOGIN_SUCCESS} from '../../Constants/ActionTypes';

const login = (state = {}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return action.userInfo;
        }
        default:
            return state;
    }
};

export default login;