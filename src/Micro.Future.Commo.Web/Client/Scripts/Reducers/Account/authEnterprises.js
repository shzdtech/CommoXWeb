import {GET_UNAUTHED_ENTERPRISE_SUCCESS, AUTHENTICATE_ENTERPRISE_SUCCESS} from '../../Constants/ActionTypes';

const authEnterprises = (state = [], action) => {
    switch (action.type) {
        case GET_UNAUTHED_ENTERPRISE_SUCCESS: {
            return action.enterprises;
        }
        case AUTHENTICATE_ENTERPRISE_SUCCESS: {
            return state.filter((e)=>{
                return e.enterpriseId !== action.enterpriseId;
            });
        }
        default:
            return state;
    }
};

export default authEnterprises;