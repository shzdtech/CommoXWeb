import { push } from 'react-router-redux';
import {SHOW_TOASTR, HIDE_TOASTR} from '../Constants/ActionTypes';

//ajax error
export const ajaxError = (dispatch, error) => {
    if (error.status === 401) {
        dispatch(push('/login'));
    } else {
        dispatch(showToastr({
            message: error.responseJSON.message,
            toastType: 'toast-error',
            show: true
        }));
    }
};

//component
export const showToastr = (options) => {
    return {
        type: SHOW_TOASTR,
        options: options
    };
};

export const hideToastr = () => {
    return {
        type: HIDE_TOASTR
    };
};