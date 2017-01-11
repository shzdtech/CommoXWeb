import {
    GET_ENTERPRISE_USER_SUCCESS,
    DELETE_ENTERPRISE_USER_SUCCESS,
    CREATE_NEW_USER_SUCCESS} from '../../Constants/ActionTypes';

const enterpriseUsers = (state = [], action) => {
    switch (action.type) {
        case GET_ENTERPRISE_USER_SUCCESS: {
            return action.users;
        }
        case DELETE_ENTERPRISE_USER_SUCCESS:{
            return state.filter((u)=> {return u.userId !== action.userId});
        }
        case CREATE_NEW_USER_SUCCESS:{
            return [...state, action.newUser];
        }
        default:
            return state;
    }
};

export default enterpriseUsers;