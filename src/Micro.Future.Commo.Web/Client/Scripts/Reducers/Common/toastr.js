import {SHOW_TOASTR, HIDE_TOASTR} from '../../Constants/ActionTypes';
const options = {
    show: false,
    duation: 5000,
    autoClose: true
};

export default (state = options, action) => {
    switch (action.type) {
        case SHOW_TOASTR:
            return Object.assign({}, options, action.options);
        case HIDE_TOASTR:      
            return Object.assign({}, options, {show: false, message: null, toastrType: null});
        default:
            return options;
    }
}