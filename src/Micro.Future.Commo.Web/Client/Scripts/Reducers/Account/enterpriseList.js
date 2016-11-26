import {GET_ALL_ENTERPRISE_SUCCESS, CHANGE_ENTERPRISE_SELECTION} from '../../Constants/ActionTypes';

const enterpriseList = (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_ENTERPRISE_SUCCESS: {
            var options = action.enterprises.map((e)=>{
                return {
                    label: e.name,
                    key: e.enterpriseId.toString(),
                    value: e.enterpriseId
                }
            });
            var info = {
                options: options,
                label: "请添加需求的企业"
            };
            return info;
        }
        case CHANGE_ENTERPRISE_SELECTION: {
            return Object.assign({}, action.value);
        }
        default:
            return state;
    }
};

export default enterpriseList;