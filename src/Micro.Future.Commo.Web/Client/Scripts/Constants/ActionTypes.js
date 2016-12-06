//filter actions
export const TOGGLE_MULTIPLE_SELECTION = 'TOGGLE_MULTIPLE_SELECTION';
export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE';
export const SELECT_FILTER = 'SELECT_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const CHECK_ITEM = 'CHECK_ITEM';
export const TYPE_ITEM = 'TYPE_ITEM';
export const TOGGLE_FILTER_LIST = 'TOGGLE_FILTER_LIST';
export const SEARCH_BY_FILTER_SUCCESS = 'SEARCH_BY_FILTER_SUCCESS';
export const SEARCH_BY_FILTER_FAILURE = 'SEARCH_BY_FILTER_FAILURE';
export const RESET_FILTER = 'RESET_FILTER';

//chain actions
export const RECEIVE_CHAIN_LIST = 'RECEIVE_CHAIN_LIST';
export const FETCH_CHAIN_LIST = 'FETCH_CHAIN_LIST';
export const FETCH_CHAIN_LIST_SUCCESS = 'FETCH_CHAIN_LIST_SUCCESS';
export const FETCH_CHAIN_LIST_FAILURE = 'FETCH_CHAIN_LIST_FAILURE';
export const CONFIRM_CHAIN_SUCCEDD = 'CONFIRM_CHAIN_SUCCEDD';
export const CONFIRM_CHAIN_FAILURE = 'CONFIRM_CHAIN_FAILURE';
export const SELECT_CHAIN_TYPE = 'SELECT_CHAIN_TYPE';
export const CHANGE_CHAIN_STATUS_SUCCESS = 'CHANGE_CHAIN_STATUS_SUCCESS';
export const CHANGE_CHAIN_STATUS_FAILURE = 'CHANGE_CHAIN_STATUS_FAILURE';
export const UNLOCK_CHAIN_SUCCESS = 'UNLOCK_CHAIN_SUCCESS';
export const GET_REQUIREMENT_REPLACEMENT_SUCCESS = 'GET_REQUIREMENT_REPLACEMENT_SUCCESS';
export const CANCEL_REPLACE_REQUIREMENT = 'CANCEL_REPLACE_REQUIREMENT';
export const COMPLETE_REPLACE_REQUIREMENT = 'COMPLETE_REPLACE_REQUIREMENT';
export const REPLACE_REQUIREMENT_SUCCESS = 'REPLACE_REQUIREMENT_SUCCESS';
export const ADD_CREATE_CHAIN_ELEMENT = 'ADD_CREATE_CHAIN_ELEMENT';
export const REMOVE_CREATE_CHAIN_ELEMENT = 'REMOVE_CREATE_CHAIN_ELEMENT';
export const CREATE_CHAIN_WITH_NEW_REQUIREMENT = 'CREATE_CHAIN_WITH_NEW_REQUIREMENT';
export const CREATE_CAHIN_WITH_SELECT_REQUIREMENT_SUCCESS = 'CREATE_CAHIN_WITH_SELECT_REQUIREMENT_SUCCESS';
export const CANCEL_SELECT_REQUIREMENT = 'CANCEL_SELECT_REQUIREMENT';
export const COMPLETE_SELECT_REQUIREMENT = 'COMPLETE_SELECT_REQUIREMENT';
export const RESET_SELECT_REQUIREMENT = 'RESET_SELECT_REQUIREMENT';
export const SELECT_REQUIREMENT_TO_CREATE = 'SELECT_REQUIREMENT_TO_CREATE';
export const TYPE_CREATE_CHAIN_OPTION_ITEM = 'TYPE_CREATE_CHAIN_OPTION_ITEM';
export const SELECT_CREATE_CHAIN_OPTION_ITEM = 'SELECT_CREATE_CHAIN_OPTION_ITEM';
export const RESET_CREATE_CHAIN_OPTION_FORM = 'RESET_CREATE_CHAIN_OPTION_FORM';
export const CREATE_CHAIN_MANUALLY_SUCCESS = 'CREATE_CHAIN_MANUALLY_SUCCESS';
export const RESET_CREATE_CHAIN = 'RESET_CREATE_CHAIN';

//requirement
export const ADD_REQUIREMENT = 'ADD_REQUIREMENT';
export const ADD_REQUIREMENT_SUCCESS = 'ADD_REQUIREMENT_SUCCESS';
export const ADD_REQUIREMENT_FAILURE = 'ADD_REQUIREMENT_FAILURE';
export const FETCH_REQUIREMENT_LIST = 'FETCH_REQUIREMENT_LIST';
export const FETCH_REQUIREMENT_LIST_SUCCESS = 'FETCH_REQUIREMENT_LIST_SUCCESS';
export const FETCH_REQUIREMENT_LIST_FAILURE = 'FETCH_REQUIREMENT_LIST_FAILURE';
export const ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS = 'ADD_REQUIREMENT_FOR_CREATE_CHAIN_SUCCESS';
export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const DELETE_REQUIREMENT_SUCCESS = 'DELETE_REQUIREMENT_SUCCESS';


//form
export const CHANGE_FORM_TYPE = 'CHANGE_FORM_TYPE';
export const SELECT_FORM_ITEM = 'SELECT_FORM_ITEM';
export const TYPE_FORM_ITEM = 'TYPE_FORM_ITEM';
export const RESET_FORM = 'RESET_FORM';

//account
export const CHANGE_ENTERPRISE_FORM = 'CHANGE_ENTERPRISE_FORM';
export const REGISTER_ENTERPRISE = 'REGISTER_ENTERPRISE';
export const REGISTER_ENTERPRISE_SUCCESS = 'REGISTER_ENTERPRISE_SUCCESS';
export const REGISTER_ENTERPRISE_FAILURE = 'REGISTER_ENTERPRISE_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CHANGE_NEW_USER_FORM = 'CHANGE_NEW_USER_FORM';
export const CREATE_NEW_USER_SUCCESS = 'CREATE_NEW_USER_SUCCESS';
export const TYPE_PASSWORD_MODEL = 'TYPE_PASSWORD_MODEL';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_RESET_PASSWORD_FORM = 'CHANGE_RESET_PASSWORD_FORM';
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS';
export const UPDATE_ENTERPRISE_FORM = 'UPDATE_ENTERPRISE_FORM';
export const UPDATE_ENTERPRISE_SUCCESS = 'UPDATE_ENTERPRISE_SUCCESS';
export const UPDATE_ENTERPRISE_FAILURE = 'UPDATE_ENTERPRISE_FAILURE';
export const GET_UNAUTHED_ENTERPRISE_SUCCESS = 'GET_UNAUTHED_ENTERPRISE_SUCCESS';
export const GET_ALL_ENTERPRISE_SUCCESS = 'GET_ALL_ENTERPRISE_SUCCESS';
export const AUTHENTICATE_ENTERPRISE_SUCCESS = 'AUTHENTICATE_ENTERPRISE_SUCCESS';
export const GET_VERFICATION_CODE_SUCCESS = 'GET_VERFICATION_CODE_SUCCESS';
export const GET_ENTERPRISE_SUCCESS = 'GET_ENTERPRISE_SUCCESS';
export const CHANGE_ENTERPRISE_SELECTION = 'CHANGE_ENTERPRISE_SELECTION';

//component
export const SHOW_SPINNER = 'SHOW_SPINNER';
export const SHOW_TOASTR = 'SHOW_TOASTR';
export const HIDE_TOASTR = 'HIDE_TOASTR';
export const NO_NEED_ROUTE = 'NO_NEED_ROUTE';

//meci
export const SELECT_PRODUCT_CODE = 'SELECT_PRODUCT_CODE';

//Admin
export const CHANGE_ACCEPTANCE_FORM = 'CHANGE_ACCEPTANCE_FORM';
export const SUBMIT_ACCEPTANCE_FORM = 'SUBMIT_ACCEPTANCE_FORM';
export const SUBMIT_ACCEPTANCE_FORM_SUCCESS = 'SUBMIT_ACCEPTANCE_FORM_SUCCESS';
export const CHANGE_FINANCE_FORM = 'CHANGE_FINANCE_FORM';
export const SUBMIT_FINANCE_FORM = 'SUBMIT_FINANCE_FORM';
export const SUBMIT_FINANCE_FORM_SUCCESS = 'SUBMIT_FINANCE_FORM_SUCCESS';
export const FETCH_ACCEPTANCE_LIST_SUCCESS = 'FETCH_ACCEPTANCE_LIST_SUCCESS';
export const FETCH_FINANCE_LIST_SUCCESS = 'FETCH_FINANCE_LIST_SUCCESS';
export const DELETE_FINANCE_SUCCESS = 'DELETE_FINANCE_SUCCESS';
export const DELETE_ACCEPTANCE_SUCCESS = 'DELETE_ACCEPTANCE_SUCCESS';


export const CHANGE_ACCEPTANCE_BANK_FORM = 'CHANGE_ACCEPTANCE_BANK_FORM';
export const SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS = 'SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS';
export const FETCH_ACCEPTANCE_BANK_LIST_SUCCESS = 'FETCH_ACCEPTANCE_BANK_LIST_SUCCESS';
export const DELETE_ACCEPTANCE_BANK_SUCCESS = 'DELETE_ACCEPTANCE_BANK_SUCCESS';

//trade
export const FETCH_TRADE_BAY_TYPE_SUCCESS = 'GET_ALL_TRADE_SUCCESS';
export const SELECT_TRADE_STATE = 'SELECT_TRADE_STATE';
export const UPDATE_TRADE_STATE_SUCCESS = 'UPDATE_TRADE_STATE_SUCCESS';
export const SET_SELECT_ENTERPRISE_TRADE = 'SET_SELECT_ENTERPRISE_TRADE'
export const SET_SELECT_ADMIN_TRADE = 'SET_SELECT_ADMIN_TRADE';
export const UPDATE_ORDER_STATE_SUCCESS = 'UPDATE_ORDER_STATE_SUCCESS';