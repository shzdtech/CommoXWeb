import {LOGIN_SUCCESS} from '../../Constants/ActionTypes';

let userInfo = $.parseJSON(sessionStorage.getItem('userInfo'));

const login = (state = userInfo, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            sessionStorage.setItem('userInfo', JSON.stringify(action.userInfo));
            return action.userInfo;
        }
        default:
            return state;
    }
};

export default login;