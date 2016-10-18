import {SEARCH_BY_FILTER_SUCCESS, FETCH_FINANCE_LIST_SUCCESS, FETCH_ACCEPTANCE_LIST_SUCCESS} from '../Constants/ActionTypes';

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
        default:
            return state;
    }
};

const acceptanceList = (state = [], action) => {
    switch (action.type) {
        case FETCH_ACCEPTANCE_LIST_SUCCESS: {
            return action.acceptanceList;
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
        case FETCH_FINANCE_LIST_SUCCESS: {
            return Object.assign({}, state, { financeInfoList: financeInfoList(state.financeInfoList, action) });
        }
        case FETCH_ACCEPTANCE_LIST_SUCCESS: {
            return Object.assign({}, state, { acceptanceList: acceptanceList(state.acceptanceList, action) });
        }
        default:
            return state;
    }
}

export default home;