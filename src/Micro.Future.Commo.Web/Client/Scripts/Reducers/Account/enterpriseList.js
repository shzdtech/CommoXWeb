import {GET_ALL_ENTERPRISE_SUCCESS} from '../../Constants/ActionTypes';

const enterpriseList = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_ENTERPRISE_SUCCESS: {
            return action.enterprises;
        }
        default:
            return state;
    }
};

export default enterpriseList;