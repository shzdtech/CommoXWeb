import {SEARCH_BY_FILTER_SUCCESS, FETCH_FINANCE_LIST_SUCCESS, FETCH_ACCEPTANCE_LIST_SUCCESS,
    DELETE_ACCEPTANCE_SUCCESS, DELETE_FINANCE_SUCCESS, SUBMIT_FINANCE_FORM_SUCCESS,
    SUBMIT_ACCEPTANCE_FORM_SUCCESS, SELECT_PRODUCT_CODE,
    SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS,
    FETCH_ACCEPTANCE_BANK_LIST_SUCCESS,
    DELETE_ACCEPTANCE_BANK_SUCCESS
} from '../Constants/ActionTypes';

const productCodeDropDown = {
        label: '产品名称',
        type: 'select',
        key: 'productCode',
        length: 'short',
        value: 'CU',
        options: [
            {
                key: '1',
                label: '铜',
                value: 'CU'
            }, {
                key: '2',
                label: '铝',
                value: 'AL'
            }, {
                key: '3',
                label: '锌',
                value: 'ZN'
            }, {
                key: '4',
                label: '铁',
                value: 'I'
            }, {
                key: '5',
                label: '焦煤',
                value: 'JM'
            }
        ]
    }

const requirements = (state = [], action) => {
    switch (action.type) {
        case SEARCH_BY_FILTER_SUCCESS: {
            return action.requirements;
        }
        default:
            return state;
    }
};

const financeInfoList = (state = [], action) => {
    switch (action.type) {
        case FETCH_FINANCE_LIST_SUCCESS: {
            return action.financeInfoList;
        }
        case SUBMIT_FINANCE_FORM_SUCCESS: {
            return [...state, action.financeInfo]
        }
        default:
            return state;
    }
};

const acceptanceList = (state = [], action) => {
    switch (action.type) {
        case FETCH_ACCEPTANCE_LIST_SUCCESS: {
            return action.acceptanceList;
        }
        case SUBMIT_ACCEPTANCE_FORM_SUCCESS: {
            return [...state, action.acceptanceInfo]
        }
        default:
            return state;
    }
};

const acceptanceBankList = (state = [], action) => {
    switch (action.type) {
        case FETCH_ACCEPTANCE_BANK_LIST_SUCCESS: {
            return action.acceptanceBankList;
        }
        case SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS: {
            return [...state, action.acceptanceBankInfo]
        }
        default:
            return state;
    }
};


const home = (state = { requirements: [], 
    financeInfoList: [], 
    acceptanceList: [],
    acceptanceBankList: [],
    productCodeDropDown: productCodeDropDown
 }, action) => {
    switch (action.type) {
        case SEARCH_BY_FILTER_SUCCESS: {
            return Object.assign({}, state, { requirements: requirements(state.requirements, action) });
        }
        case SUBMIT_FINANCE_FORM_SUCCESS:
        case FETCH_FINANCE_LIST_SUCCESS: {
            return Object.assign({}, state, { financeInfoList: financeInfoList(state.financeInfoList, action) });
        }
        case SUBMIT_ACCEPTANCE_FORM_SUCCESS:
        case FETCH_ACCEPTANCE_LIST_SUCCESS: {
            return Object.assign({}, state, { acceptanceList: acceptanceList(state.acceptanceList, action) });
        }
        case DELETE_ACCEPTANCE_SUCCESS: {
            return Object.assign({}, state, {
                acceptanceList: state.acceptanceList.filter((f) => {
                    return f.acceptanceId !== action.acceptanceId
                })
            });
        }
        case DELETE_FINANCE_SUCCESS: {
             return Object.assign({}, state, {
                financeInfoList: state.financeInfoList.filter((f) => {
                    return f.productId !== action.financeId
                })
            });
        }
        case SUBMIT_ACCEPTANCE_BANK_FORM_SUCCESS:
        case FETCH_ACCEPTANCE_BANK_LIST_SUCCESS: {
            return Object.assign({}, state, { acceptanceBankList: acceptanceBankList(state.acceptanceBankList, action) });
        }
        case DELETE_ACCEPTANCE_BANK_SUCCESS: {
            return Object.assign({}, state, {
                acceptanceBankList: state.acceptanceBankList.filter((f) => {
                    return f.bankId !== action.bankId
                })
            });
        }
        case SELECT_PRODUCT_CODE: {
            return Object.assign({}, state, {productCodeDropDown: action.value})
        }
        default:
            return state;
    }
}

export default home;