import {
    RECEIVE_CHAIN_LIST,
    FETCH_CHAIN_LIST,
    FETCH_CHAIN_LIST_SUCCESS,
    FETCH_CHAIN_LIST_FAILURE,
    SELECT_CHAIN_TYPE,
    CHANGE_CHAIN_STATUS_SUCCESS,
    CHANGE_CHAIN_STATUS_FAILURE,
    UNLOCK_CHAIN_SUCCESS,
    GET_REQUIREMENT_REPLACEMENT_SUCCESS,
    CANCEL_REPLACE_REQUIREMENT,
    COMPLETE_REPLACE_REQUIREMENT,
    REPLACE_REQUIREMENT_SUCCESS
} from '../Constants/ActionTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import {ajaxError} from './CommonActions';
import {showSpinner} from '../Actions';


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

const makeChainRequest = () => {
    const request = $.post(HOST + 'api/chain/Maker');
    return request;
}

export const makeChain = () => {
    return (dispatch) => {
        return makeChainRequest().then(
            res => dispatch(push('/chainManager')),
            error => ajaxError(dispatch, error)
        );
    };
};

const unlockChainRequest = (chain) => {
    const request = $.post(HOST + 'api/chain/' + chain.chainId + '/Unlock');
    return request;
};

const unlockChainSuccess = (chain) => {
    return {
        type: UNLOCK_CHAIN_SUCCESS,
        chain: chain
    };
};

export const unlockChain = (chain) => {
    return (dispatch) => {
        unlockChainRequest(chain).then(
            res => dispatch(unlockChainSuccess(chain)),
            error => ajaxError(dispatch, error)
        );
    }
};

const getRequirementReplacementReq = (chainId, index) => {
    const request = $.get(HOST + 'api/chain/' + chainId + '/Requirment/' + index + '/Replacement');
    return request;
}

const getRequirementReplacementSuccess = (chainId, index, requirementId, requirements) => {
    console.log('chainId:' + chainId + ' index:' + index);
    return {
        type: GET_REQUIREMENT_REPLACEMENT_SUCCESS,
        chainId: chainId,
        index: index,
        requirementId: requirementId,
        requirements: requirements
    }
}

export const getRequirementReplacement = (chainId, index, requirementId) => {
    return (dispatch) => {
        dispatch(showSpinner(true));
        getRequirementReplacementReq(chainId, index).then(
            requirements => {
                dispatch(showSpinner(false));
                dispatch(getRequirementReplacementSuccess(chainId, index, requirementId, requirements));
            },
            error => {
                dispatch(showSpinner(false));
                ajaxError(dispatch, error);
            }
        );
    }
}

export const cancelReplaceRequirement = () => {
    return {
        type: CANCEL_REPLACE_REQUIREMENT
    }
}

export const completeReplaceRequirement = () => {
    return {
        type: COMPLETE_REPLACE_REQUIREMENT
    }
}

const replaceRequirementReq = (chainId, index, requirementId) => {
    const request = $.post(HOST + 'api/chain/' + chainId + '/Index/' + index + '/NewRequirment/' + requirementId);
    return request;
}

const replaceRequirementSuccess = (chainId, index, requirement) => {
    return {
        type: REPLACE_REQUIREMENT_SUCCESS,
        index: index,
        requirement: requirement,
        chainId: chainId
    }
}

export const replaceRequirementAction = (chainId, index, requirement) => {
    return (dispatch) => {
        replaceRequirementReq(chainId, index, requirement.requirementId).then(
            res => {
                dispatch(completeReplaceRequirement())
                dispatch(replaceRequirementSuccess(chainId, index, requirement));
            },
            error => ajaxError(dispatch, error)
        );
    }
}
