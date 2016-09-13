import {
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
    UPDATE_ENTERPRISE_FAILURE,
    GET_UNAUTHED_ENTERPRISE_SUCCESS,
    AUTHENTICATE_ENTERPRISE_SUCCESS,
    GET_VERFICATION_CODE_SUCCESS
} from '../Constants/ActionTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import auth from '../auth';
import {ajaxError, showToastr} from './CommonActions';
import {showSpinner} from '../Actions';

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
        if (enterpriseInfo[key].value === undefined) {
            model[key] = null;
        } else {
            model[key] = enterpriseInfo[key].value;
        }
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
                dispatch(showToastr({
                    message: '企业创建成功, 请使用企业邮箱登陆, 初始密码QAZ@wsx3, 请尽快修改密码',
                    toastType: 'toast-success',
                    show: true,
                    autoClose: false
                }));
                dispatch(resigterEnterpriseSuccess(response));
                dispatch(push('/requirements'));
            },
            error => ajaxError(dispatch, error)
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
            error => ajaxError(dispatch, error)
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
        dispatch(showSpinner(true));
        submitCreateUserRequest(user).then(
            res => {
                dispatch(showSpinner(false));
                dispatch(showToastr({
                    message: '用户创建成功, 初始密码QAZ@wsx3, 请尽快修改密码',
                    toastType: 'toast-success',
                    show: true,
                    autoClose: false
                }));
                dispatch(submitCreateUserSuccess());
                dispatch(push('/'));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error)
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
        type: CHANGE_PASSWORD_SUCCESS
    }
};

const submitChangePasswordFailure = () => {

};

export const submitChangePassword = (password) => {
    return dispatch => {
        submitChangePasswordRequest(password).then(
            res => {
                dispatch(submitChangePasswordSuccess());
                dispatch(push('/'));
            },
            error => {
                ajaxError(dispatch, error)
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
                dispatch(push('/'));
            },
            error => { ajaxError(dispatch, error); }
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
        if (enterpriseInfo[key].type === 'file') {
            if (enterpriseInfo[key].file[0] !== null &&
                enterpriseInfo[key].file[0].size > 0 &&
                enterpriseInfo[key].file[0].type.indexOf('image') > -1) {
                model.append(key, enterpriseInfo[key].file[0]);
            }
        }
        let value = enterpriseInfo[key].value;
        if (enterpriseInfo[key].value !== undefined && enterpriseInfo[key].value !== null) {
            model.append(key, enterpriseInfo[key].value === undefined ? 0 : enterpriseInfo[key].value);
        }
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
                dispatch(push('/'));
            },
            error => ajaxError(dispatch, error)
        );
    };
};

const getUnauthedEnterpriseRequest = () => {
    return $.get(HOST + 'api/Enterprise');
};

const getUnauthedEnterpriseSuccess = (enterprises) => {
    return {
        type: GET_UNAUTHED_ENTERPRISE_SUCCESS,
        enterprises: enterprises
    };
};

export const getUnauthedEnterprise = () => {
    return (dispatch) => {
        return getUnauthedEnterpriseRequest().then(
            enterprises => {
                dispatch(getUnauthedEnterpriseSuccess(enterprises));
            },
            error => ajaxError(dispatch, error)
        );
    };
}

const authenticateEnterpriseRequest = (enterpriseId, state) => {
    return $.post(HOST + 'api/Enterprise/' + enterpriseId + '/State/' + state);
}

const authenticateEnterpriseSuccess = (enterpriseId) => {
    return {
        type: AUTHENTICATE_ENTERPRISE_SUCCESS,
        enterpriseId: enterpriseId
    }
}

export const authenticateEnterprise = (enterpriseId, state) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return authenticateEnterpriseRequest(enterpriseId, state).then(
            res => {
                dispatch(showSpinner(false));
                dispatch(authenticateEnterpriseSuccess(enterpriseId));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
}

const getVerficationCodeRequest = (email) => {
    return $.get(HOST + 'api/Enterprise/Email/VerifyCode?phoneOrEmail=' + email);
};

const getVerficationCodeSuccess = ()=>{
    return {
        type: GET_VERFICATION_CODE_SUCCESS
    };
};

export const getVerficationCode = (email) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        return getVerficationCodeRequest(email).then(
            res => {
                dispatch(showSpinner(false));
                dispatch(showToastr({
                    message: '验证码已发送',
                    toastType: 'toast-success',
                    show: false,
                    autoClose: false
                }));
                dispatch(getVerficationCodeSuccess());
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    };
}
