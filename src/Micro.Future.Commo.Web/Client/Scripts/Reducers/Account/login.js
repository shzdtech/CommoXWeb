import {LOGIN_SUCCESS, SIGN_OUT_SUCCESS} from '../../Constants/ActionTypes';
import auth from '../../auth.js'

let userInfo = auth.getUserInfo();

const login = (state = userInfo, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            auth.setUserInfo(action.userInfo);
            return action.userInfo;
        }
        case SIGN_OUT_SUCCESS:{
            return null;
        }
        default:
            return state;
    }
};

export default login;