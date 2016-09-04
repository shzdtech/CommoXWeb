import {
    RECEIVE_CHAIN_LIST,
    FETCH_CHAIN_LIST,
    FETCH_CHAIN_LIST_SUCCESS,
    FETCH_CHAIN_LIST_FAILURE,
    SELECT_CHAIN_TYPE,
    CHANGE_CHAIN_STATUS_SUCCESS,
    CHANGE_CHAIN_STATUS_FAILURE,
} from '../Constants/ActionTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import {ajaxError} from './CommonActions';


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
