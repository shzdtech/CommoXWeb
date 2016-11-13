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
    REPLACE_REQUIREMENT_SUCCESS,
    ADD_CREATE_CHAIN_ELEMENT,
    REMOVE_CREATE_CHAIN_ELEMENT,
    CREATE_CHAIN_WITH_NEW_REQUIREMENT,
    CREATE_CAHIN_WITH_SELECT_REQUIREMENT_SUCCESS,
    RESET_SELECT_REQUIREMENT,
    SELECT_REQUIREMENT_TO_CREATE,
    SELECT_CREATE_CHAIN_OPTION_ITEM,
    TYPE_CREATE_CHAIN_OPTION_ITEM,
    RESET_CREATE_CHAIN_OPTION_FORM,
    CREATE_CHAIN_MANUALLY_SUCCESS,
    RESET_CREATE_CHAIN
} from '../Constants/ActionTypes';
import {TEXT} from '../Constants/FilterTypes';
import {HOST} from '../appSettings';
import { push } from 'react-router-redux';
import {ajaxError, showToastr} from './CommonActions';
import {showSpinner, resetFilter} from '../Actions';


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
        dispatch(showSpinner(true));
        return fetchChainsByTypeRequest(typeId).then(
            chains => {
                dispatch(showSpinner(false));
                dispatch(fetchChainsSuccess(chains))
            },
            error => {
                dispatch(showSpinner(false));
                dispatch(fetchChainsFailure(error))
            }
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
                if (requirements.length > 0) {
                    dispatch(getRequirementReplacementSuccess(chainId, index, requirementId, requirements));
                } else {
                    dispatch(showToastr({
                        message: '未找到可替代的需求，请稍后重试',
                        toastType: 'toast-info',
                        show: true,
                        autoClose: true
                    }))
                }
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


export const createChainWithNewRequirement = () => {
    return {
        type: CREATE_CHAIN_WITH_NEW_REQUIREMENT
    };
};

export const fetchSelectRequirementsRequest = (searchCriteria) => {
    searchCriteria = Object.assign({}, searchCriteria, { pageNo: 0, pageSize: 10000 });
    const request = $.get(HOST + 'api/requirement/SearchResult', searchCriteria);
    return request;
};

export const fetchSelectRequirementsSuccess = (requirements) => {
    return {
        type: CREATE_CAHIN_WITH_SELECT_REQUIREMENT_SUCCESS,
        requirements: requirements
    };
};

export const createChainWithSelect = (searchCriteria) => {
    return (dispatch) => {
        return fetchSelectRequirementsRequest(searchCriteria).then(
            requirements => {
                if (requirements && requirements.length > 0) {
                    dispatch(fetchSelectRequirementsSuccess(requirements.filter((r) => { return r.state === 0; })));
                } else {
                    dispatch(showToastr({
                        message: "没有需求可供选择",
                        toastType: 'toast-warning',
                        show: true
                    }));
                    dispatch(resetFilter());
                }

            },
            error => ajaxError(dispatch, error)
        );
    };
};

export const createChainWithRandomOne = () => {
    return {
        type: ADD_CREATE_CHAIN_ELEMENT,
        node: {
            type: 2
        }
    };
};

export const createChainWithRandomMore = () => {
    return {
        type: ADD_CREATE_CHAIN_ELEMENT,
        node: {
            type: 3
        }
    };
};

export const removeChainNodeFromTempChain = (index) => {
    return {
        type: REMOVE_CREATE_CHAIN_ELEMENT,
        index: index
    }
}


export const cancelSelectRequirement = () => {
    return {
        type: RESET_SELECT_REQUIREMENT
    }
}

export const selectRequirementAction = (chain, index, requirement) => {

    return (dispatch, getState) => {
        const state = getState();
        const createChainState = state.chain.createChainState;
        if (requirement.type === 1 && createChainState.length > 0 && createChainState[0].requirement && createChainState[0].requirement.type == 1) {
            return dispatch(showToastr({
                message: "一条匹配链中只可以存在一个采购客户",
                toastType: 'toast-error',
                show: true
            }));
        } else if (requirement.type === 2 && createChainState.length > 0 &&
            createChainState[createChainState.length - 1].requirement
            && createChainState[createChainState.length - 1].requirement.type == 2) {
            return dispatch(showToastr({
                message: "一条匹配链中只可以存在一个销售客户",
                toastType: 'toast-error',
                show: true
            }));
        }

        return dispatch({
            type: SELECT_REQUIREMENT_TO_CREATE,
            requirement: requirement
        })
    }
}


export const selectCreateChainOption = (formItem, item) => {
    return {
        type: SELECT_CREATE_CHAIN_OPTION_ITEM,
        formItem: formItem,
        item: item
    };
};

export const typeCreateChainOption = (formItem, value) => {
    return {
        type: TYPE_CREATE_CHAIN_OPTION_ITEM,
        formItem: formItem,
        value: value
    }
};

export const resetCreateChainOption = () => {
    return {
        type: RESET_CREATE_CHAIN_OPTION_FORM
    };
};

const submitCreateChainRequest = (model) => {
    const request = $.post(HOST + 'api/chain/Manual', model);
    return request;
}

const submitCreateChainSuccess = (chain) => {
    return {
        type: CREATE_CHAIN_MANUALLY_SUCCESS
    }
}


export const submitCreateChain = (createChainState, createChainOptions) => {


    var options = {};
    createChainOptions.map((l) => {
        if (l.type === TEXT) {
            if (l.value !== undefined && l.value !== null && l.value !== '') {
                options[l.key] = l.value;
            }
        } else {
            let values = l.items.filter((item) => { return item.selected; }).map((i) => { return i.value; });
            options[l.key] = values[0];
        }
    });

    let list = [];
    createChainState.map((s) => {
        if (s.type === 1) {
            list.push(s.requirement.requirementId);
        } else if (s.type === 2) {
            list.push(-1);
        } else if (s.type === 3) {
            list.push(0);
        }
    });

    if (createChainState.length > 0 && !options.forceCreate) {
        if ((createChainState[0].type === 1 && createChainState[0].requirement.type !== 1) || createChainState[0].type === 3) {
            list.unshift(-1);
        }

        if ((createChainState[createChainState.length - 1].type === 1 &&
            createChainState[createChainState.length - 1].requirement.type !== 2) || createChainState[createChainState.length - 1].type === 3) {
            list.push(-1);
        }
    }

    options.requirements = list;

    return (dispatch) => {
        return submitCreateChainRequest(options).then(
            chain => {
                dispatch(submitCreateChainSuccess(chain));
                dispatch(push('/chainManager'));
                dispatch(selectChainListType({
                    id: 2,
                    name: '已锁定',
                    value: 1
                }));
                dispatch(resetCreateChain());
                dispatch(resetCreateChainOption())
            },
            error => ajaxError(dispatch, error)
        );
    }
}

export const resetCreateChain = () => {
    return {
        type: RESET_CREATE_CHAIN
    };
};