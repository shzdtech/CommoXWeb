import {
    TOGGLE_FILTER_LIST,
    TOGGLE_MULTIPLE_SELECTION,
    TOGGLE_COLLAPSE,
    SELECT_FILTER,
    REMOVE_FILTER,
    TYPE_ITEM,
    CHECK_ITEM,
    ADD_REQUIREMENT,
    ADD_REQUIREMENT_SUCCESS,
    ADD_REQUIREMENT_FAILURE,
    FETCH_REQUIREMENT_LIST,
    FETCH_REQUIREMENT_LIST_SUCCESS,
    FETCH_REQUIREMENT_LIST_FAILURE,

    RECEIVE_CHAIN_LIST,
    FETCH_CHAIN_LIST,
    FETCH_CHAIN_LIST_SUCCESS,
    FETCH_CHAIN_LIST_FAILURE,
    SELECT_CHAIN_TYPE,
    CHANGE_CHAIN_STATUS_SUCCESS,
    CHANGE_CHAIN_STATUS_FAILURE,

    REQUEST_REQUIREMENT,
    RECEIVE_REQUIREMENT,
    CONFIRM_CHAIN_SUCCEDD,
    CONFIRM_CHAIN_FAILURE,
    CHANGE_FORM_TYPE,
    SELECT_FORM_ITEM,
    TYPE_FORM_ITEM,
    RESET_FORM,

    CHANGE_ENTERPRISE_FORM,
    REGISTER_ENTERPRISE,
    REGISTER_ENTERPRISE_SUCCESS,
    REGISTER_ENTERPRISE_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    TYPE_NEW_USER_EMAIL,
    CREATE_NEW_USER_SUCCESS,
    TYPE_PASSWORD_MODEL,
    CHANGE_PASSWORD_SUCCESS,
    SIGN_OUT_SUCCESS,
    UPDATE_ENTERPRISE_FORM,
    UPDATE_ENTERPRISE_SUCCESS,
    UPDATE_ENTERPRISE_FAILURE
} from '../Constants/ActionTypes';
import {TEXT} from '../Constants/FilterTypes';
import {HOST} from '../appSettings';
import FilterProperty from '../Models/FilterProperty';
import { push } from 'react-router-redux';
import auth from '../auth';

//filter actions
export const toggleFilterMutipleSelection = (filter) => {
    return {
        filter: filter,
        type: TOGGLE_MULTIPLE_SELECTION
    };
};

export const toggleFilterCollapse = (filter) => {
    return {
        filter: filter,
        type: TOGGLE_COLLAPSE
    };
};

export const selectFilter = (filter) => {
    return {
        type: SELECT_FILTER,
        filter: filter
    };
};

export const checkItem = (isChecked, filter, item) => {
    return {
        type: CHECK_ITEM,
        isChecked: isChecked,
        filter: filter,
        item: item
    };
};

export const typeItem = (filter, item) => {
    return {
        type: TYPE_ITEM,
        filter: filter,
        item: item
    };
};

export const removeFilter = (filter) => {
    return {
        type: REMOVE_FILTER,
        filter: filter
    };
};

export const toggleFilterList = () => {
    return {
        type: TOGGLE_FILTER_LIST
    };
};

//chain actions
export const receiveChainList = (chainList) => {
    return {
        type: RECEIVE_CHAIN_LIST,
        chainList: chainList
    };
};

export const fetchChainsRequest = (requirementId) => {
    const request = $.get(HOST + 'api/requirement/' + requirementId + '/Chains');

    return request;
};

export const fetchChainsSuccess = (chains) => {
    return {
        type: FETCH_CHAIN_LIST_SUCCESS,
        chains: chains
    };
};

export const fetchChainsFailure = (error) => {
    return {
        type: FETCH_CHAIN_LIST_FAILURE,
        error: error
    };
};

export const fetchChains = (requirementId) => {
    return (dispatch) => {
        return fetchChainsRequest(requirementId).then(
            chains => dispatch(fetchChainsSuccess(chains)),
            error => ajaxError(dispatch, error)
        );
    };
};

export const fetchChainsByTypeRequest = (typeId) => {
    const request = $.get(HOST + 'api/Chain/Status/' + typeId + '/Chains');

    return request;
};

export const fetchChainsByType = (typeId) => {
    return (dispatch) => {
        return fetchChainsByTypeRequest(typeId).then(
            chains => dispatch(fetchChainsSuccess(chains)),
            error => dispatch(fetchChainsFailure(error))
        );
    };
};

export const confirmChainRequest = (chainId, requirementId) => {
    const request = $.post(HOST + 'api/chain/' + chainId + '/Confirmation/' + requirementId);
    return request;
};

export const confirmChainSuccess = (chainId, requirementId, accept) => {
    return {
        type: CONFIRM_CHAIN_SUCCEDD,
        chainId: chainId,
        requirementId: requirementId,
        accept: accept
    };
};

export const confirmChain = (chainId, requirementId, accept) => {
    return (dispatch) => {
        return confirmChainRequest(chainId, requirementId).then(
            success => dispatch(confirmChainSuccess(chainId, requirementId, accept)),
            error => ajaxError(dispatch, error)
        );
    };
};

export const selectChainListType = (item) => {
    return {
        type: SELECT_CHAIN_TYPE,
        item: item
    }
}

export const manageChainRequest = (chain) => {
    const request = $.post(HOST + 'api/chain/' + chain.chainId + '/Status/' + chain.chainStatus);
    return request;
};

export const manageChainSuccess = (chain) => {
    return {
        type: CHANGE_CHAIN_STATUS_SUCCESS,
        chain: chain
    }
};

export const manageChainFailure = (error) => {
    return {
        type: CHANGE_CHAIN_STATUS_FAILURE,
        error: error
    }
};

export const manageChain = (chain) => {
    return (dispatch) => {
        return manageChainRequest(chain).then(
            res => dispatch(manageChainSuccess(chain)),
            error => ajaxError(dispatch, error)
        );
    };
};

//requirement
export const addRequirementRequest = (list, selectedType) => {
    let requirement = {};
    requirement.rules = [];
    requirement.type = selectedType;
    list.forEach((l) => {

        if (l.type === TEXT) {
            if (l.value !== undefined && l.value !== null && l.value !== '') {
                if (l.filterProperty === FilterProperty.Requirement) {
                    requirement[l.key] = l.value;
                } else if (l.filterProperty === FilterProperty.Rule) {
                    requirement.rules.push({
                        ruleType: l.ruleType,
                        key: l.title,
                        value: l.value,
                        operationType: 2
                    });
                }
            }
        } else {
            let values = l.items.filter((item) => { return item.selected; }).map((i) => { return i.value; });
            if (l.filterProperty === FilterProperty.Requirement) {
                requirement[l.key] = values.join(',');
            } else if (l.filterProperty === FilterProperty.Rule) {
                requirement.rules.push({
                    ruleType: l.ruleType,
                    key: l.title,
                    value: values.join(','),
                    operationType: 2
                });
            }
        }
    });

    return $.post(HOST + 'api/Requirement', requirement);
};

export const addRequirementSuccess = (requirement) => {
    return {
        type: ADD_REQUIREMENT_SUCCESS,
        requirement: requirement
    };
};

export const addRequirementFailure = (error) => {
    return {
        type: ADD_REQUIREMENT_FAILURE,
        error: error
    };
};

export const addRequirement = (list, selectedType) => {
    return (dispatch) => {
        return addRequirementRequest(list, selectedType).then(
            requirement => {
                dispatch(addRequirementSuccess(requirement));
                dispatch(resetForm());
                dispatch(push('/requirements'));
            },
            error => ajaxError(dispatch, error)
        );
    };
};

export const receiveRequirement = (requirements) => {
    return {
        type: RECEIVE_REQUIREMENT,
        requirements: requirements
    };
};

export const fetchRequirementsRequest = () => {
    const request = $.get(HOST + 'api/requirement');
    return request;
};

export const fetchRequirementsSuccess = (requirements) => {
    return {
        type: FETCH_REQUIREMENT_LIST_SUCCESS,
        requirements: requirements
    };
};

export const fetchRequirementssFailure = (error) => {
    return {
        type: FETCH_REQUIREMENT_LIST_FAILURE,
        error: error
    };
};

export const fetchRequirements = () => {
    return (dispatch) => {
        return fetchRequirementsRequest().then(
            requirements => dispatch(fetchRequirementsSuccess(requirements)),
            error => ajaxError(dispatch, error)
        );
    };
};


//form
export const changeFormType = (formType) => {
    return {
        type: CHANGE_FORM_TYPE,
        formType: formType
    };
};

export const selectFormItem = (formItem, item) => {
    return {
        type: SELECT_FORM_ITEM,
        formItem: formItem,
        item: item
    };
};

export const typeFormItem = (formItem, value) => {
    return {
        type: TYPE_FORM_ITEM,
        formItem: formItem,
        value: value
    }
};

export const resetForm = () => {
    return {
        type: RESET_FORM
    };
};


//account
export const changeEnterpriseInfo = (keyName, value) => {
    return {
        type: CHANGE_ENTERPRISE_FORM,
        keyName: keyName,
        value: value
    };
};


const registerEnterpriseRequest = (enterpriseInfo) => {
    var model = {};
    for (var key in enterpriseInfo) {
        model[key] = enterpriseInfo[key].value;
    }

    const request = $.post(HOST + 'api/Enterprise', model);
    return request;
};

const resigterEnterpriseSuccess = () => {
    return {
        type: REGISTER_ENTERPRISE_SUCCESS
    };
};

const resigerEnterpriseFailure = (error) => {
    return {
        type: REGISTER_ENTERPRISE_FAILURE,
        error: error
    };
};

export const registerEnterprise = (enterpriseInfo) => {
    return (dispatch) => {
        return registerEnterpriseRequest(enterpriseInfo).then(
            response => {
                dispatch(resigterEnterpriseSuccess(response));
                dispatch(push('/requirements'));
            },
            error => dispatch(resigerEnterpriseFailure(error))
        );
    };
};

export const loginRequest = (email, password) => {
    const request = $.post(HOST + 'api/Account/Login', {
        email: email,
        password: password
    });
    return request;
};

export const loginSuccess = (userInfo) => {
    return {
        type: LOGIN_SUCCESS,
        userInfo: userInfo
    };
};

export const loginFailure = (userInfo) => {
    return {
        type: LOGIN_FAILURE,
        userInfo: userInfo
    };
};

export const loginAction = (email, password) => {
    return dispatch => {
        loginRequest(email, password).then(
            userInfo => {
                dispatch(loginSuccess(userInfo));
                dispatch(push('/'));
            },
            error => {
                dispatch(loginFailure(error));
            }
        );
    };
};

export const typeUserEmail = (email) => {
    return {
        type: TYPE_NEW_USER_EMAIL,
        email: email
    };
};

export const submitCreateUserSuccess = () => {
    return {
        type: CREATE_NEW_USER_SUCCESS
    };
};

const submitCreateUserRequest = (user) => {
    return $.post(HOST + 'api/Account/User', user);
};

export const submitCreateUser = (user) => {
    return dispatch => {
        submitCreateUserRequest(user).then(
            res => {
                dispatch(submitCreateUserSuccess());
            },
            error => {

            }
        );
    };
};

export const changePasswordModel = (keyName, value) => {
    return {
        type: TYPE_PASSWORD_MODEL,
        keyName: keyName,
        value: value
    };
};

const submitChangePasswordRequest = (password) => {
    return $.post(HOST + 'api/Account/Password', { password: password.password, newPassword: password.newPassword });
};

export const submitChangePasswordSuccess = () => {
    return {
        type: 　CHANGE_PASSWORD_SUCCESS
    }
};

const submitChangePasswordFailure = () => {

};

export const submitChangePassword = (password) => {
    return dispatch => {
        submitChangePasswordRequest(password).then(
            res => {
                dispatch(submitChangePasswordSuccess());
                dispatch(push('/requirements'));
            },
            error => {
                //dispatch(loginFailure(error));
            }
        );
    };
};

const signOutRequest = () => {
    return $.post(HOST + 'api/Account/SignOut');
};

const signOutSuccess = () => {
    return {
        type: SIGN_OUT_SUCCESS
    }
}

export const signOut = () => {
    return dispatch => {
        signOutRequest().then(
            res => {
                auth.removeUserInfo();
                dispatch(signOutSuccess());
                dispatch(push('/requirements'));
            },
            error => { }
        )
    };
};

export const updateEnterpriseInfo = (keyName, value) => {
    return {
        type: UPDATE_ENTERPRISE_FORM,
        keyName: keyName,
        value: value
    };
};

const updateEnterpriseRequest = (enterpriseInfo) => {
    var model = new FormData();
    for (var key in enterpriseInfo) {
        if(enterpriseInfo[key].type === 'file'){
            if(enterpriseInfo[key].file[0] !== null &&
            enterpriseInfo[key].file[0].size > 0 &&
            enterpriseInfo[key].file[0].type.indexOf('image') > -1){
                model.append(key, enterpriseInfo[key].file[0]);
            }
        }
        model.append(key, enterpriseInfo[key].value);
    }
    const request = $.ajax({
        type: 'post',
        url: HOST + 'api/Enterprise/' + auth.getUserInfo().enterpriseId,
        contentType: false,
        processData: false,
        data: model,
        timeout: 600000
    });
    //const request = $.post(HOST + 'api/Enterprise/'+auth.getUserInfo().enterpriseId, model);
    return request;
};

const updateEnterpriseSuccess = () => {
    return {
        type: UPDATE_ENTERPRISE_SUCCESS
    };
};

const updateEnterpriseFailure = (error) => {
    return {
        type: UPDATE_ENTERPRISE_FAILURE,
        error: error
    };
};

export const updateEnterprise = (enterpriseInfo) => {
    return (dispatch) => {
        return updateEnterpriseRequest(enterpriseInfo).then(
            response => {
                dispatch(updateEnterpriseSuccess(response));
                dispatch(push('/requirements'));
            },
            error => dispatch(updateEnterpriseFailure(error))
        );
    };
};

//ajax error
const ajaxError = (dispatch, error) => {
    if (error.status === 401) {
        dispatch(push('/login'));
    }
};