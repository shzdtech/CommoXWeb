import { push } from 'react-router-redux';

//ajax error
export const ajaxError = (dispatch, error) => {
    if (error.status === 401) {
        dispatch(push('/login'));
    }
};