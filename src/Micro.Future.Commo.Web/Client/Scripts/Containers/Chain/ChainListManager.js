import { connect } from 'react-redux';
import {selectChainListType, fetchChainsByType, onReceiveChainList, confirmChain, manageChain} from '../../Actions/ChainActions';
import ChainListManager from '../../Components/Chain/ChainListManager';

const mapStateToProps = (state, ownProps) => {
    return {
        formItem: state.chainListManager,
        chains: state.chains
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
        manageChain:(chain)=> dispatch(
            manageChain(chain)
        )
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainListManager);