import { connect } from 'react-redux';
import {selectChainListType,
    fetchChainsByType,
    onReceiveChainList,
    confirmChain,
    manageChain,
    unlockChain,
    getRequirementReplacement,
    cancelReplaceRequirement,
    replaceRequirementAction
} from '../../Actions/ChainActions';
import ChainListManager from '../../Components/Chain/ChainListManager';

const mapStateToProps = (state, ownProps) => {
    return {
        formItem: state.chain.chainListManager,
        chains: state.chain.chains,
        replaceRequirement: state.chain.replaceRequirement
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFormItemSelected: (formItem, item) => {
            dispatch(selectChainListType(item));
            dispatch(fetchChainsByType(item.value));
        },
        onReceiveChainList: (chainList) => dispatch(receiveChainList(chainList)),
        confirmChain: (chainId, requirementId, accept) => dispatch(confirmChain(chainId, requirementId, accept)),
        manageChain: (chain) => dispatch(manageChain(chain)),
        unlockChain: (chain) => dispatch(unlockChain(chain)),
        getRequirementReplacement: (chainId, index, requirementId) => dispatch(getRequirementReplacement(chainId, index, requirementId)),
        cancelReplaceRequirement: ()=>dispatch(cancelReplaceRequirement()),
        replaceRequirementAction: (chainId, index, requirement) => dispatch(replaceRequirementAction(chainId, index, requirement))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainListManager);