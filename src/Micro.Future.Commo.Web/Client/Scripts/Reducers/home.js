import {SEARCH_BY_FILTER_SUCCESS, FETCH_FINANCE_LIST_SUCCESS, FETCH_ACCEPTANCE_LIST_SUCCESS,
    DELETE_ACCEPTANCE_SUCCESS, DELETE_FINANCE_SUCCESS, SUBMIT_FINANCE_FORM_SUCCESS,
    SUBMIT_ACCEPTANCE_FORM_SUCCESS} from '../Constants/ActionTypes';

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


const home = (state = { requirements: [], financeInfoList: [], acceptanceList: [] }, action) => {
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
        default:
            return state;
    }
}

export default home;